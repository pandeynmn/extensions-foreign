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

const FR_DOMAIN = 'https://fr.ninemanga.com'

export const NineMangaFRInfo: SourceInfo = {
    version: getExportVersion('0.0.0'),
    name: 'NineMangaFR',
    description: 'Extension that pulls manga from fr.ninemanga.com',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandyenmn',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    language: LanguageCode.FRENCH,
    websiteBaseURL: FR_DOMAIN,
    sourceTags: [
        {
            text: 'New',
            type: TagType.GREEN
        },
        {
            text: 'French',
            type: TagType.GREY
        }
    ]
}

export class NineMangaFR extends NineManga {
    baseUrl: string = FR_DOMAIN
    languageCode: LanguageCode = LanguageCode.ITALIAN

    genreTag = 'Genre(s)'
    authorTag = 'Auteur(s)'
    statusTag = 'Statut'

    override parseStatus(str: string): MangaStatus {
        let status = MangaStatus.UNKNOWN
        switch (str.toLowerCase()) {
            case 'en cours':
                status = MangaStatus.ONGOING
                break
            case 'complété':
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
        } else if (timeAgo.includes('heures') || timeAgo.includes('heure')) {
            time = new Date(Date.now() - trimmed * 3600000)
        } else {
            time = new Date(timeAgo)
        }
        return time
    }
}