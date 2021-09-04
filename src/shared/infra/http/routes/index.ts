import sync from './sync'
import { Router } from 'express'

const routes = Router()
const version = '/v1'

routes.use(`${version}/sync`, sync)

export default routes
