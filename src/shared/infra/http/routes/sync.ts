import { Router } from 'express'
import handler from 'express-async-handler'
import { syncContact } from '../controller/sync'

const router = Router()

router.get('/', handler(syncContact))

export default router
