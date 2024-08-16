import { Router } from 'express'

import { wrapRequestHandler } from '~/utils/handler'
import { mailController } from '~/controllers/mail.controller'

const mailRouter = Router()

mailRouter.post('/test', wrapRequestHandler(mailController.test))

export default mailRouter
