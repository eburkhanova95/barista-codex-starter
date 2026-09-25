import * as repo from '../repositories/i18n.repository'

const SUPPORTED = ['en', 'it', 'bg']

export async function getTranslations(lang: string): Promise<Record<string, string>> {
    if (!SUPPORTED.includes(lang)) throw new Error('NOT_FOUND')
    return repo.readLocale(lang)
}