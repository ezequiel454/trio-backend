import { createContact } from 'modulos/contact/controller/contact'
import { getListAudience } from 'shared/infra/provider/mailchimp/controller/get-list-audience'
import { getListId } from 'shared/infra/provider/mailchimp/controller/get-list-id'
import { Request, Response } from 'express'

export const syncContact = async (req: Request, res: Response) => {
	console.log('?')
	const id = await getListId()
	const personList = await getListAudience(id)

	console.log('aqui', personList)

	const savedFirebase = await createContact(personList)

	return res.status(200).json({
		data: {
			contacts: savedFirebase,
		},
	})
}