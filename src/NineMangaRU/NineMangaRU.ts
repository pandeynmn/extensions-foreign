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

const RU_DOMAIN = 'https://ru.ninemanga.com'
export const NineMangaRUInfo: SourceInfo = {
    version: getExportVersion('0.0.1'),
    name: 'NineMangaRU',
    description: 'Extension that pulls manga from ru.ninemanga.com',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandyenmn',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    language: 'ru',
    websiteBaseURL: RU_DOMAIN,
    sourceTags: [
        {
            text: 'Russian',
            type: BadgeColor.GREY,
        },
    ],
    intents: SourceIntents.MANGA_CHAPTERS | SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.CLOUDFLARE_BYPASS_REQUIRED,
}
export class NineMangaRU extends NineManga {
    baseUrl: string = RU_DOMAIN

    languageCode = 'ru'
    genreTag = '\u0416\u0430\u043D\u0440\u044B'
    authorTag = '\u0410\u0432\u0442\u043E\u0440'
    statusTag = '\u0441\u0442\u0430\u0442\u0443\u0441'
    override parseStatus(str: string): string {
        let status = 'Unknown'
        switch (str.toLowerCase()) {
            //just incase if there is a manga that is ongoing it will give
            case '\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u0442\u0441\u044F':
                status = 'Ongoing'
                break
            // most series on ninemangaru will say it's completed but they are not
            case '\u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0439':
                status = 'Completed'
                break
        }
        return status
    }

    protected override convertTime(timeAgo: string): Date {
        let time: Date
        let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0])
        trimmed = trimmed == 0 && timeAgo.includes('a') ? 1 : trimmed
        if (timeAgo.includes('\u043C\u0438\u043D\u0443\u0442') || timeAgo.includes('\u043C\u0438\u043D\u0443\u0442\u0430')) {
            time = new Date(Date.now() - trimmed * 60000)
        } else if (timeAgo.includes('\u0447\u0430\u0441\u0430')) {
            time = new Date(Date.now() - trimmed * 3600000)
        } else {
            time = new Date(timeAgo)
        }
        return time
    }
}
