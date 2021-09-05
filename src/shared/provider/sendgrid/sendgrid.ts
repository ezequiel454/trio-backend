import { Person } from '../../../shared/infra/http/dto/common'
import { axiosConfig } from '../../util/axios'

export const axiosConnectionSendgrid = () =>
	axiosConfig({
		url: 'https://api.sendgrid.com/v3/marketing/',
		headers: {
			Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
		},
	})
