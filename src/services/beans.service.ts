import { type Bean } from '../types/beans'
import * as repo from '../repositories/beans.repository'

// ===== GET =====

export const getAll = () => repo.findAll()

export async function getById(id: string): Promise<Bean> {
    const bean = await repo.findById(id)
    if (!bean) throw new Error('NOT_FOUND')
    return bean
}


// ===== DELETE =====

export async function remove(id: string): Promise<void> {
    const deleted = await repo.remove(id)
    if (!deleted) throw new Error('NOT_FOUND')
}

// ====== POST (CREATE) ======

export type NewBean = Omit<Bean, 'id' | 'recipes'>

function normalize(data: unknown): NewBean {   // не экспортируется = private
    const d = data as Partial<NewBean>
    if (!d?.title?.trim() || !d?.country?.trim()) throw new Error('INVALID_INPUT')

    return {
        title: d.title.trim(),
        country: d.country.trim(),
        description: d.description ?? '',
        roasterComment: d.roasterComment ?? '',
        imageUrl: d.imageUrl ?? '',
        details: {
            process: d.details?.process ?? 'Unknown',
            region: d.details?.region ?? 'Unknown',
            variety: d.details?.variety ?? [],
            scaScore: d.details?.scaScore ?? 0
        },
        flavorProfile: {
            notes: d.flavorProfile?.notes ?? [],
            acidity: d.flavorProfile?.acidity ?? 0,
            sweetness: d.flavorProfile?.sweetness ?? 0,
            bitterness: d.flavorProfile?.bitterness ?? 0
        }
    }
}
export async function create(data: unknown): Promise<Bean> {
    return repo.create(normalize(data))
}

// ====== PUT (UPDATE) ======

export async function update(id: string, data: unknown): Promise<Bean> {
    const bean = await repo.update(id, normalize(data))
    if (!bean) throw new Error('NOT_FOUND')
    return bean
}