import { Router } from 'express'
import { getTranslations } from '../controllers/i18n.controller'

export const i18nRouter = Router()
i18nRouter.get('/:lang', getTranslations)