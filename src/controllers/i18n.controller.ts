import { Request, Response } from 'express'
import * as service from '../services/i18n.service'

export async function getTranslations(req: Request<{ lang: string }>, res: Response) {
    try {
        res.json(await service.getTranslations(req.params.lang))
    } catch (e) {
        if (e instanceof Error && e.message === 'NOT_FOUND') {
            res.status(404).json({ message: 'Language not supported' })
            return
        }
        throw e
    }
}