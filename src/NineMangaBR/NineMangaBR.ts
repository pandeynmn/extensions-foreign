import { ContentRating,
    LanguageCode,
    MangaStatus,
    SourceInfo,
    TagType } from 'paperback-extensions-common'
import { getExportVersion,
    NineManga } from '../NineManga'

const BR_DOMAIN = 'https://br.ninemanga.com'

export const NineMangaBRInfo: SourceInfo = {
    version: getExportVersion('0.0.0'),
    name: 'NineMangaBR',
    description: 'Extension that pulls manga from br.ninemanga.com',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandyenmn',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    language: LanguageCode.BRAZILIAN,
    websiteBaseURL: BR_DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: TagType.GREEN,
        },
        {
            text: 'Brasil',
            type: TagType.GREY,
        },
    ],
}

export class NineMangaBR extends NineManga {
    baseUrl: string = BR_DOMAIN
    languageCode: LanguageCode = LanguageCode.DUTCH
    genreTag = 'Gênero'
    authorTag = 'Autor'
    statusTag = 'Status'

    override parseStatus(str: string): MangaStatus {
        let status = MangaStatus.UNKNOWN
        switch (str.toLowerCase()) {
            case 'em tradução':
                status = MangaStatus.ONGOING
                break
            case 'completo':
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
