import { Person } from '../../../shared/infra/http/dto/common'
import { SavedContactToDto } from '../../../shared/infra/http/dto/common'
import { db } from '../../../shared/infra/database/firebase-connection'

export const createContact = async (
	personList: Person[]
): Promise<SavedContactToDto> => {
	const batch = db.batch()
	for (const person of personList) {
		const document = db.doc(`contacts/${person.email}`)
		batch.set(
			document,
			{ first_name: person.first_name, last_name: person.last_name },
			{ merge: true }
		)
	}

	await batch.commit()

	return {
		contacts: personList.length,
	}
}
