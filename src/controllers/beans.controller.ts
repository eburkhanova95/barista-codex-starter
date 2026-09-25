import { Request, Response } from 'express'
import * as service from '../services/beans.service'

// ===== GET =====

export async function getAllBeans(req: Request, res: Response) {
    const beans = await service.getAll()
    res.json(beans)
}

export async function getBeanById(req: Request<{ id: string }>, res: Response) {
    try {
        res.json(await service.getById(req.params.id))
    } catch {
        res.status(404).json({ message: 'Bean not found' })
    }
}


// ===== DELETE =====

export async function deleteBean(req: Request<{ id: string }>, res: Response) {
    try {
        await service.remove(req.params.id)
        res.status(204).end()
    } catch (e) {
        if (e instanceof Error && e.message === 'NOT_FOUND') {
            res.status(404).json({ message: 'Bean not found' })
            return
        }
        throw e
    }
}

// ====== POST (CREATE) ======

export async function createBean(req: Request, res: Response) {
    try {
        const bean = await service.create(req.body)
        res.status(201).json(bean)
    } catch (e) {
        if (e instanceof Error && e.message === 'INVALID_INPUT') {
            res.status(400).json({ message: 'Title and country are required' })
            return
        }
        throw e
    }
}

// ====== PUT (UPDATE) ======

export async function updateBean(req: Request<{ id: string }>, res: Response) {
    try {
        const bean = await service.update(req.params.id, req.body)
        res.json(bean)
    } catch (e) {
        if (e instanceof Error && e.message === 'INVALID_INPUT') {
            res.status(400).json({ message: 'Title and country are required' })
            return
        }
        if (e instanceof Error && e.message === 'NOT_FOUND') {
            res.status(404).json({ message: 'Bean not found' })
            return
        }
        throw e
    }
}