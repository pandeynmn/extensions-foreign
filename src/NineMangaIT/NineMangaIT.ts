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

const IT_DOMAIN = 'https://it.ninemanga.com'

export const NineMangaITInfo: SourceInfo = {
    version: getExportVersion('0.0.0'),
    name: 'NineMangaIT',
    description: 'Extension that pulls manga from it.ninemanga.com',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandyenmn',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    language: 'it',
    websiteBaseURL: IT_DOMAIN,
    sourceTags: [
        {
            text: 'Italian',
            type: BadgeColor.GREY
        },
    ],
    intents: SourceIntents.MANGA_CHAPTERS | SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.CLOUDFLARE_BYPASS_REQUIRED,
}

export class NineMangaIT extends NineManga {
    baseUrl: string = IT_DOMAIN
    languageCode = 'it'
    genreTag = 'Genere(s)'
    authorTag = 'Author(s)'
    statusTag = 'Stato'
    override parseStatus(str: string): string {
        let status = 'Unknown'
        switch (str.toLowerCase()) {
            case 'in corso':
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
        if (timeAgo.includes('mins') || timeAgo.includes('minutes') || timeAgo.includes('minute')) {
            time = new Date(Date.now() - trimmed * 60000)
        }
        else if (timeAgo.includes('ore') || timeAgo.includes('hour')) {
            time = new Date(Date.now() - trimmed * 3600000)
        }
        else {
            time = new Date(timeAgo)
        }
        return time
    }
}
