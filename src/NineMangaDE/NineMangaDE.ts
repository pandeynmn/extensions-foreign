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

const DE_DOMAIN = 'https://de.ninemanga.com'
export const NineMangaDEInfo: SourceInfo = {
    version: getExportVersion('0.0.1'),
    name: 'NineMangaDE',
    description: 'Extension that pulls manga from de.ninemanga.com',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandyenmn',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    language: 'de',
    websiteBaseURL: DE_DOMAIN,
    sourceTags: [
        {
            text: 'German',
            type: BadgeColor.GREY
        }
    ],
    intents: SourceIntents.MANGA_CHAPTERS | SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.CLOUDFLARE_BYPASS_REQUIRED,
}
export class NineMangaDE extends NineManga {
    baseUrl: string = DE_DOMAIN
    languageCode = 'de'
    genreTag = 'Genre (s)'
    authorTag = 'Autor (en)'
    statusTag = 'Status'
    override parseStatus(str: string): string {
        let status = 'Unknown'
        switch (str.toLowerCase()) {
            case 'laufende':
                status = 'Ongoing'
                break
            case 'abgeschlossen':
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
        else if (timeAgo.includes('Stunden') || timeAgo.includes('hour')) {
            time = new Date(Date.now() - trimmed * 3600000)
        }
        else {
            time = new Date(timeAgo)
        }
        return time
    }
}
