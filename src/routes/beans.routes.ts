import { Router } from 'express'
import * as controller from '../controllers/beans.controller'

export const beansRouter = Router()

beansRouter.get('/', controller.getAllBeans)
beansRouter.get('/:id', controller.getBeanById)
beansRouter.delete('/:id', controller.deleteBean)
beansRouter.post('/', controller.createBean)
beansRouter.put('/:id', controller.updateBean)