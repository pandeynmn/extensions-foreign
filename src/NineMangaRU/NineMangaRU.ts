import { ContentRating,
    LanguageCode,
    MangaStatus,
    SourceInfo,
    TagType } from 'paperback-extensions-common'
import { getExportVersion,
    NineManga } from '../NineManga'

const RU_DOMAIN = 'https://ru.ninemanga.com'

export const NineMangaRUInfo: SourceInfo = {
    version: getExportVersion('0.0.1'),
    name: 'NineMangaRU',
    description: 'Extension that pulls manga from ru.ninemanga.com',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandyenmn',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    language: LanguageCode.RUSSIAN,
    websiteBaseURL: RU_DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: TagType.GREEN,
        },
        {
            text: 'Russian',
            type: TagType.GREY,
        },
    ],
}

export class NineMangaRU extends NineManga {
    baseUrl: string = RU_DOMAIN
    languageCode: LanguageCode = LanguageCode.RUSSIAN

    genreTag = 'Жанры'
    authorTag = 'Автор'
    statusTag = 'статус'
    }

    override parseStatus(str: string): MangaStatus {
        let status = MangaStatus.UNKNOWN

        switch (str.toLowerCase()) {
           //just incase if there is a manga that is ongoing it will give
            case 'Продолжается':
                status = MangaStatus.ONGOING
                break
           // most series on ninemangaru will say it's completed buy they are not
            case 'постоянный':
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
        } else if (timeAgo.includes('ore') || timeAgo.includes('hour')) {
            time = new Date(Date.now() - trimmed * 3600000)
        } else {
            time = new Date(timeAgo)
        }
        return time
    }
}
