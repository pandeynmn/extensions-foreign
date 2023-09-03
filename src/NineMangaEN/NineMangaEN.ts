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

const EN_DOMAIN = 'https://ninemanga.com'
export const NineMangaENInfo: SourceInfo = {
    version: getExportVersion('0.0.0'),
    name: 'NineMangaEN',
    description: 'Extension that pulls manga from ninemanga.com',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandyenmn',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: EN_DOMAIN,
    language: 'en',
    sourceTags: [
        {
            text: 'English',
            type: BadgeColor.GREY
        }
    ],
    intents: SourceIntents.MANGA_CHAPTERS | SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.CLOUDFLARE_BYPASS_REQUIRED,
}

export class NineMangaEN extends NineManga {
    baseUrl: string = EN_DOMAIN
    languageCode = 'en'
    genreTag = 'Genre(s)'
    authorTag = 'Author(s)'
    statusTag = 'Status'
}
