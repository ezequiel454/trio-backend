import { Router } from 'express'
import handler from 'express-async-handler'
import { handlerProviderRequest } from '../controller/sync'

const router = Router()

router.get('/sendgrid', handler(handlerProviderRequest))
router.get('/firebase', handler(handlerProviderRequest))

export default router
