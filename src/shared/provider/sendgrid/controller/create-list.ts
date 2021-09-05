import { newExternalServiceError } from '../../../../shared/infra/http/error/construtors'
import { BasicResponse } from '../../../../shared/infra/http/dto/sendgrid'
import { axiosConnectionSendgrid } from '../sendgrid'
import { ExternalService } from '../../../../shared/infra/http/error/external-services'

export const createList = async (listName: string): Promise<string> => {
	try {
		const { data }: BasicResponse = await axiosConnectionSendgrid().post(
			'lists',
			{
				name: listName,
			}
		)
		return data.id
	} catch ({ response }) {
		throw newExternalServiceError(
			ExternalService.SENDGRID,
			response.status === 400 ? 'List name already exist' : response
		)
	}
}
