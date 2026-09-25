import { promises as fs } from 'fs'
import path from 'path'
import { type Bean } from '../types/beans'
import { randomUUID } from 'crypto'

const DATA_DIR = path.join(process.cwd(), 'data', 'beans')

// ====== GET ======

async function readBean(fullPath: string): Promise<Bean> {   // не экспортируется = private
    return JSON.parse(await fs.readFile(fullPath, 'utf-8')) as Bean
}

export async function findAll(): Promise<Bean[]> {
    const files = await fs.readdir(DATA_DIR)
    return Promise.all(files.filter(f => f.endsWith('.json')).map(f => readBean(path.join(DATA_DIR, f))))
}

export async function findById(id: string): Promise<Bean | null> {
    return (await findAll()).find(b => b.id === id) ?? null
}


// ====== DELETE ======

async function findFileById(id: string): Promise<string | null> {   // не экспортируется = private
    const files = await fs.readdir(DATA_DIR)
    for (const f of files) {
        if (!f.endsWith('.json')) continue
        const fullPath = path.join(DATA_DIR, f)
        const bean = await readBean(fullPath)
        if (bean.id === id) return fullPath
    }
    return null
}
 
export async function remove(id: string): Promise<boolean> {
    const fullPath = await findFileById(id)
    if (!fullPath) return false
    await fs.unlink(fullPath)
    return true
}


// ====== POST (CREATE) ======

function toFileName(bean: Bean): string {   // не экспортируется = private
    const slug = `${bean.country}-${bean.title}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')   // всё, кроме букв и цифр, превращаем в дефис
        .replace(/^-+|-+$/g, '')       // убираем дефисы по краям
    return `${slug || 'bean'}-${bean.id}.json`
}

export async function create(data: Omit<Bean, 'id' | 'recipes'>): Promise<Bean> {
    const bean: Bean = { ...data, id: randomUUID(), recipes: [] }
    const fullPath = path.join(DATA_DIR, toFileName(bean))
    await fs.writeFile(fullPath, JSON.stringify(bean, null, 2), 'utf-8')
    return bean
}

// ====== PUT (UPDATE) ======
export async function update(id: string, data: Omit<Bean, 'id' | 'recipes'>): Promise<Bean | null> {
    const fullPath = await findFileById(id)
    if (!fullPath) return null

    const existing = await readBean(fullPath)
    const bean: Bean = { ...data, id: existing.id, recipes: existing.recipes }
    await fs.writeFile(fullPath, JSON.stringify(bean, null, 2), 'utf-8')
    return bean
}