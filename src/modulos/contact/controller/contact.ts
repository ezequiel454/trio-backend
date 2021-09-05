import { Person } from '../../../shared/infra/http/dto/common'
import { SavedContactToDto } from '../dtos/response'
import firebaseConnection from '../../../shared/infra/database/firebase-connection'

export const createContact = async (
	request: Person[]
): Promise<SavedContactToDto> => {
	const batch = firebaseConnection.batch()
	for (const person of request) {
		const document = firebaseConnection.doc(`contacts/${person.email}`)
		batch.set(
			document,
			{ first_name: person.first_name, last_name: person.last_name },
			{ merge: true }
		)
	}

	await batch.commit()

	return {
		contacts: request.length,
	}
}
