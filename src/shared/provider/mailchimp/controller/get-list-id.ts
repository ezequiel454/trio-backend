import { ListsResponseDto } from '../../../infra/http/dto/mailchimp'
import {
	newExternalServiceError,
	newMailchipEmptyAudianceList,
} from '../../../infra/http/error/construtors'
import { ExternalService } from '../../../infra/http/error/external-services'
import mailchimp from '../mailchimp'

export const getListId = async (): Promise<string> => {
	const { lists }: ListsResponseDto = await mailchimp
		.request({
			method: 'get',
			path: '/lists',
			query: {
				fields: 'lists.id',
			},
		})
		.catch((reason) => {
			throw newExternalServiceError(ExternalService.MAILCHIMP, reason.title)
		})

	if (lists.length === 0) {
		throw newMailchipEmptyAudianceList()
	}

	return lists[0].id
}
