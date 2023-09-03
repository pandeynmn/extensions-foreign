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


const BR_DOMAIN = 'https://br.ninemanga.com'
export const NineMangaBRInfo: SourceInfo = {
    version: getExportVersion('0.0.0'),
    name: 'NineMangaBR',
    description: 'Extension that pulls manga from br.ninemanga.com',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandyenmn',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    language: 'pt-br',
    websiteBaseURL: BR_DOMAIN,
    sourceTags: [
        {
            text: 'Brasil',
            type: BadgeColor.GREY
        },
    ],
    intents: SourceIntents.MANGA_CHAPTERS | SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.CLOUDFLARE_BYPASS_REQUIRED,
}
export class NineMangaBR extends NineManga {
    baseUrl: string = BR_DOMAIN
    languageCode = 'pt-br'
    genreTag = 'G\u00EAnero'
    authorTag = 'Autor'
    statusTag = 'Status'
    override parseStatus(str: string): string {
        let status = 'Unknown'
        switch (str.toLowerCase()) {
            case 'em tradu\u00E7\u00E3o':
                status = 'Ongoing'
                break
            case 'completo':
                status = 'Completed'
                break
        }
        return status
    }
    protected override convertTime(timeAgo: string): Date {
        let time: Date
        let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0])
        trimmed = trimmed == 0 && timeAgo.includes('a') ? 1 : trimmed
        if (timeAgo.includes('mins') || timeAgo.includes(' minutos') || timeAgo.includes(' minuto')) {
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
