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
		this.exception()
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
	}

	exception() {
		this.express.use(async (err, req, res, next) => {
			// save logs maybe
			return res.status(500).send(err)
		})
	}
}
export default new Server().express
