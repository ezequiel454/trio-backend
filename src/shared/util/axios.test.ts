import { axiosConfig } from './axios'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

test('Call axiosConfig with url', async () => {
	axiosConfig({
		url: '',
	})
	expect(mockedAxios.create).toHaveBeenCalled()
})

test('Call axiosConfig without url', async () => {
	axiosConfig({})
	expect(mockedAxios.create).toHaveBeenCalled()
})
