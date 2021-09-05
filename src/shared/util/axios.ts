import axios from 'axios'
import { AxiosConfig } from '../infra/http/dto/common'

export const axiosConfig = (configs: AxiosConfig) =>
	axios.create({
		baseURL: configs.url ?? process.env.AXIOS_BASE_URL,
		headers: configs.headers,
	})

  // https://trio-backend-dev-zeke.herokuapp.com/v1/sync