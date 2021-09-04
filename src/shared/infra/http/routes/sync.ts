import { Router } from 'express'
import { syncContact } from '../controller/sync'

const router = Router()

router.get('/', syncContact)

export default router
