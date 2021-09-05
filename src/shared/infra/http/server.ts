import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { Config, names } from 'unique-names-generator'
import router from './routes'

const config: Config = {
	dictionaries: [names],
}

class Server {
	constructor() {
		this.express = express()

		this.middlewares()
		this.routes()
		//this.exception()
	}

	public express

	private middlewares() {
		this.express.use(cors())
		this.express.use(helmet())
		this.express.use(express.json()) // { limit: '10MB' }
		this.express.use(compression({ level: 9 }))
	}

	private routes(): void {
		this.express.use(router)
		// const router = express.Router()
		// router.get('/', async (req, res) => {
		// 	// const obj = Array(2)
		// 	// 	.fill('')
		// 	// 	.map((elem) => {
		// 	// 		return {
		// 	// 			first_name: uniqueNamesGenerator(config),
		// 	// 			last_name: uniqueNamesGenerator(config),
		// 	// 			email: uniqueNamesGenerator(config) + '@gmail.com',
		// 	// 		}
		// 	// 	})

		// 	// obj.push({
		// 	// 	first_name: uniqueNamesGenerator(config),
		// 	// 	last_name: uniqueNamesGenerator(config),
		// 	// 	email: 'ezequiel454@gmail.com',
		// 	// })

		// 	//console.log('objs ', obj)
		// 	try {
		// 		const id = await getListId()
		// 		const list = await getListAudience(id)

		// 		const response = await createContact(list)
		// 		console.log(response)
		// 	} catch (e) {
		// 		res.json(e)
		// 	}

		// 	//console.log('response ', response)

		// 	res.json({ message: 'response' })
		// })
		// this.express.use('/', router)
	}
}
export default new Server().express
