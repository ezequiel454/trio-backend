import { axiosConnectionSendgrid } from '../sendgrid'
import { createList } from './create-list'
import { ExternalService } from '../../../infra/http/error/external-services'
import { newExternalServiceError } from '../../../infra/http/error/construtors'
import {
	BasicListResponse,
	BasicResultResponse,
	ListSendgridDto,
} from '../../../infra/http/dto/sendgrid'

const sendgridCallList = async (): Promise<BasicResultResponse> => {
	try {
		const { data }: BasicListResponse = await axiosConnectionSendgrid().get(
			'lists'
		)

		return data
	} catch ({ response }) {
		throw newExternalServiceError(ExternalService.SENDGRID, response)
	}
}

export const getSendgridListId = async (): Promise<string> => {
	const lists = await sendgridCallList()

	const foundTrioList = lists.result.filter(lookingForListTrio)

	if (foundTrioList.length > 0) {
		return foundTrioList[0].id
	}

	return createList('trio')
}

const lookingForListTrio = (list: ListSendgridDto) => list.name === 'trio'
