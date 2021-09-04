import Mailchimp from 'mailchimp-api-v3'

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY

export default new Mailchimp(MAILCHIMP_API_KEY)
