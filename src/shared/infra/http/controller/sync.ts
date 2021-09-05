import { createContact } from '../../../../modulos/contact/controller/contact'
import { getListAudience } from '../../provider/mailchimp/controller/get-list-audience'
import { getListId } from '../../provider/mailchimp/controller/get-list-id'
import { Request, Response } from 'express'

export const syncContact = async (req: Request, res: Response) => {
	console.log('get mail')
	const id = await getListId()
	console.log(id)
	const personList = await getListAudience(id)
	console.log('get mail 2', personList)
	const savedFirebase = await createContact(personList)
	console.log('fb', savedFirebase)

	return res.status(200).json({
		data: {
			contacts: savedFirebase,
		},
	})
}
