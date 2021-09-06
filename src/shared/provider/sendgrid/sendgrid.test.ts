import axios from 'axios'
import { axiosConnectionSendgrid } from './sendgrid'

const mockedAxios = axios as jest.Mocked<typeof axios>

jest.mock('axios')

test('axiosConnectionSendgrid', async () => {
	axiosConnectionSendgrid()
	expect(mockedAxios.create).toHaveBeenCalled()
})
