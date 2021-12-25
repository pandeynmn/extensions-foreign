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

const ES_DOMAIN = 'https://es.ninemanga.com'

export const NineMangaESInfo: SourceInfo = {
    version: getExportVersion('0.0.0'),
    name: 'NineMangaES',
    description: 'Extension that pulls manga from es.ninemanga.com',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandyenmn',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: ES_DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: TagType.GREEN
        },
        {
            text: 'Spanish',
            type: TagType.GREY
        }
    ]
}

export class NineMangaES extends NineManga {
    baseUrl: string = ES_DOMAIN
    languageCode: LanguageCode = LanguageCode.SPANISH
    override alternativeChapterUrl = true

    genreTag = 'Género(s)'
    authorTag = 'Autor(s)'
    statusTag = 'Estado'

    override parseStatus(str: string): MangaStatus {
        let status = MangaStatus.UNKNOWN
        switch (str.toLowerCase()) {
            case 'en curso':
                status = MangaStatus.ONGOING
                break
            case 'completado':
                status = MangaStatus.COMPLETED
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
        } else if (timeAgo.includes('horas') || timeAgo.includes('hora')) {
            time = new Date(Date.now() - trimmed * 3600000)
        } else {
            time = new Date(timeAgo)
        }
        return time
    }
}
