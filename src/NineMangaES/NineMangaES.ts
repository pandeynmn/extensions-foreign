import {
    ContentRating,
    SourceInfo,
    BadgeColor,
    SourceIntents,
} from '@paperback/types'

import { 
    getExportVersion, 
    NineManga 
} from '../NineManga'

const ES_DOMAIN = 'https://es.ninemanga.com'
export const NineMangaESInfo: SourceInfo = {
    version: getExportVersion('0.0.0'),
    name: 'NineMangaES',
    description: 'Extension that pulls manga from ru.ninemanga.com',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandyenmn',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    language: 'es',
    websiteBaseURL: ES_DOMAIN,
    sourceTags: [
        {
            text: 'Spanish',
            type: BadgeColor.GREY
        },
    ],
    intents: SourceIntents.MANGA_CHAPTERS | SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.CLOUDFLARE_BYPASS_REQUIRED,
}
export class NineMangaES extends NineManga {
    baseUrl: string = ES_DOMAIN
    languageCode = 'es'
    genreTag = 'G\u00E9nero(s)'
    authorTag = 'Autor(s)'
    statusTag = 'Estado'
    override parseStatus(str: string): string {
        let status = 'Unknown'
        switch (str.toLowerCase()) {
            case 'en corso':
                status = 'Ongoing'
                break
            case 'completato':
                status = 'Completed'
                break
        }
        return status
    }
    protected override convertTime(timeAgo: string): Date {
        let time: Date
        let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0])
        trimmed = trimmed == 0 && timeAgo.includes('a') ? 1 : trimmed
        if (timeAgo.includes('minutos') || timeAgo.includes('minuto')) {
            time = new Date(Date.now() - trimmed * 60000)
        }
        else if (timeAgo.includes('horas') || timeAgo.includes('hora')) {
            time = new Date(Date.now() - trimmed * 3600000)
        }
        else {
            time = new Date(timeAgo)
        }
        return time
    }
}
