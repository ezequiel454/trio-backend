import { newExternalServiceError } from '../../../infra/http/error/construtors'
import { axiosConnectionSendgrid } from '../sendgrid'
import { ExternalService } from '../../../infra/http/error/external-services'
import { Person } from '../../../infra/http/dto/common'

export const createSendgridContacts = async (
	personList: Person[],
	listId: string
): Promise<void> => {
	try {
		return await axiosConnectionSendgrid().put('contacts', {
			contacts: personList,
			list_ids: [listId],
		})
	} catch ({ response }) {
		throw newExternalServiceError(ExternalService.SENDGRID, response)
	}
}
