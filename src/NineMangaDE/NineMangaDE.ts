import {
    ContentRating,
    LanguageCode,
    MangaStatus,
    SourceInfo,
    TagType
} from 'paperback-extensions-common'
import {
    getExportVersion,
    NineManga
} from '../NineManga'



const DE_DOMAIN = 'https://de.ninemanga.com'

export const NineMangaDEInfo: SourceInfo = {
    version: getExportVersion('0.0.0'),
    name: 'NineMangaDE',
    description: 'Extension that pulls manga from de.ninemanga.com',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandyenmn',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    language: LanguageCode.DUTCH,
    websiteBaseURL: DE_DOMAIN,
    sourceTags: [
        {
            text: 'New',
            type: TagType.GREEN
        },
        {
            text: 'Dutch',
            type: TagType.GREY
        }
    ]
}


export class NineMangaDE extends NineManga {
    baseUrl: string = DE_DOMAIN
    languageCode: LanguageCode = LanguageCode.DUTCH
    genreTag = 'Genre (s)'
    authorTag = 'Autor (en)'
    statusTag = 'Status'

    override parseStatus(str: string): MangaStatus {
        let status = MangaStatus.UNKNOWN
        switch (str.toLowerCase()) {
            case 'laufende':
                status = MangaStatus.ONGOING
                break
            case 'abgeschlossen':
                status = MangaStatus.COMPLETED
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
        } else if (timeAgo.includes('Stunden') || timeAgo.includes('hour')) {
            time = new Date(Date.now() - trimmed * 3600000)
        } else {
            time = new Date(timeAgo)
        }
        return time
    }
    
}