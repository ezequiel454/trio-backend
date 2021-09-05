import { createContact } from '../../../../modules/contact/controller/contact'
import { getListAudience } from '../../../provider/mailchimp/controller/get-list-audience'
import { getListId } from '../../../provider/mailchimp/controller/get-list-id'
import { Request, Response } from 'express'
import { getSendgridListId } from '../../../provider/sendgrid/controller/get-sendgrid-list-id'
import { createSendgridContacts } from '../../../provider//sendgrid/controller/create-sendgrid-contacts'

export const syncContact = async (req: Request, res: Response) => {
	const mailchimpId = await getListId()
	const personList = await getListAudience(mailchimpId)

	// const { contacts } = await createContact(personList)

	const sendgridId = await getSendgridListId()
	await createSendgridContacts(personList, sendgridId)

	return res.status(200).json({
		data: {
			contacts: personList.length,
		},
	})
}
