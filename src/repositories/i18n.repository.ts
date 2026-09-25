import { promises as fs } from 'fs'
import path from 'path'
import { XMLParser } from 'fast-xml-parser'

const LOCALES_DIR = path.join(process.cwd(), 'locales')

const parser = new XMLParser({ ignoreAttributes: false })

export async function readLocale(lang: string): Promise<Record<string, string>> {
    const xml = await fs.readFile(path.join(LOCALES_DIR, `${lang}.xlf`), 'utf-8')
    const units = parser.parse(xml).xliff.file.unit

    const result: Record<string, string> = {}
    for (const u of units) {
        result[u['@_id']] = u.segment.target
    }
    return result
}