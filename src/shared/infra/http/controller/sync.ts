import { createContact } from '../../../../modules/contact/controller/contact'
import { getListAudience } from '../../../provider/mailchimp/controller/get-list-audience'
import { getListId } from '../../../provider/mailchimp/controller/get-list-id'
import { Request, Response } from 'express'
import { getSendgridListId } from '../../../provider/sendgrid/controller/get-sendgrid-list-id'
import { createSendgridContacts } from '../../../provider//sendgrid/controller/create-sendgrid-contacts'
import { Person } from '../dto/common'

const getMailchimpContact = async (): Promise<Person[]> => {
	const mailchimpId = await getListId()
	const personList = await getListAudience(mailchimpId)

	return personList
}

const syncContactSendgrid = async (personList: Person[]) => {
	const sendgridId = await getSendgridListId()
	await createSendgridContacts(personList, sendgridId)
}

const syncContactFirebase = async (personList: Person[]) => {
	await createContact(personList)
}

const callerProvider = async (
	req: Request,
	res: Response,
	functionProvider: any
) => {
	const personList = await getMailchimpContact()

	await functionProvider(personList)

	return res.status(200).json({
		data: {
			contacts: personList.length,
		},
	})
}

export const handlerProviderRequest = async (req: Request, res: Response) => {
	const url = req.url.replace('/', '')
	await callerProvider(
		req,
		res,
		url === 'firebase' ? syncContactFirebase : syncContactSendgrid
	)
}
