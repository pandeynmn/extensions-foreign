import {
    ContentRating,
    LanguageCode,
    SourceInfo,
    TagType
} from 'paperback-extensions-common'
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
    language: LanguageCode.ENGLISH,
    sourceTags: [
        {
            text: 'Notifications',
            type: TagType.GREEN
        },
        {
            text: 'English',
            type: TagType.GREY
        }
    ]
}


export class NineMangaEN extends NineManga {
    baseUrl: string = EN_DOMAIN
    languageCode: LanguageCode = LanguageCode.ENGLISH
    genreTag = 'Genre(s)'
    authorTag = 'Author(s)'
    statusTag = 'Status'
}