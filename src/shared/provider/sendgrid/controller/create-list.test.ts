import { createList } from './create-list'
import axios from 'axios'
import { newExternalServiceError } from '../../../../shared/infra/http/error/construtors'
import { ExternalService } from '../../../../shared/infra/http/error/external-services'
import { deepEqual } from 'ts-mockito'

const mockedAxios = axios as jest.Mocked<typeof axios>

jest.mock('axios')

describe('Mock Resolve', () => {
	beforeEach(() => {
		mockedAxios.create.mockImplementation((config) => axios)
		mockedAxios.post.mockResolvedValueOnce({
			data: {
				name: 'list-name',
				id: '1',
				contact_count: '1',
			},
		})
		jest.clearAllMocks()
	})

	test('create list in sendgrid with id 1', async () => {
		const result = await createList('list-name')
		expect(result).toBe('1')
	})
})

describe('Mock Reject', () => {
	beforeEach(() => {
		mockedAxios.create.mockImplementation((config) => axios)
		mockedAxios.post.mockRejectedValue({
			response: {
				status: 400,
			},
		})
	})

	test('create list in sendgrid result in error status 400', async () => {
		try {
			await createList('list-name')
		} catch (e) {
			expect(e).toStrictEqual(
				newExternalServiceError(ExternalService.SENDGRID, 'List name already exist')
			)
		}
	})

	test('create list in sendgrid result in error status not 400', async () => {
		jest.spyOn(axios, 'post').mockRejectedValueOnce({
			response: {
				status: 500,
			},
		})
		const response = {
			status: 500,
		}

		await createList('list-name').catch((e) => {
			expect(deepEqual(e)).toStrictEqual(
				deepEqual(newExternalServiceError(ExternalService.SENDGRID, response))
			)
		})
	})
})
