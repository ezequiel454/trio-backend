import { Person } from 'shared/infra/http/dto/common'
import {
	AudienceListResponseDto,
	Members,
} from 'shared/infra/http/dto/mailchimp'
import {
	newExternalServiceError,
	newMailchipEmptyAudianceList,
} from 'shared/infra/http/error/construtors'
import { ExternalService } from 'shared/infra/http/error/external-services'
import mailchimp from '../mailchimp'

export const getListAudience = async (id: string): Promise<Person[]> => {
	const lists: AudienceListResponseDto = await mailchimp
		.request({
			method: 'get',
			path: `/lists/${id}/members`,
			query: {
				count: 1000,
				offset: 0,
				fields: 'members.full_name,members.email_address,total_items',
			},
		})
		.catch((reason) => {
			throw newExternalServiceError(ExternalService.MAILCHIMP, reason.title)
		})

	const { members } = lists

	if (members.length === 0) {
		throw newMailchipEmptyAudianceList()
	}

	return membersToPerson(members)
}

const membersToPerson = (members: Members[]): Person[] => {
	const personList: Person[] = []

	for (const member of members) {
		const splitName = member.full_name.split(' ')

		personList.push({
			email: member.email_address,
			first_name: splitName[0],
			last_name: splitName[1] ?? '',
		})
	}

	return personList
}
