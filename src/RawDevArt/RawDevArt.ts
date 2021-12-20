import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    Manga,
    MangaTile,
    PagedResults,
    SearchRequest,
    Source,
    SourceInfo,
    TagSection,
    TagType,
} from 'paperback-extensions-common'
import { Parser } from './parser'

const RA_DOMAIN = 'https://rawdevart.com'

export const RawDevArtInfo: SourceInfo = {
    version: '2.0.1',
    name: 'RawDevArt',
    description: 'JAPANESE: Extension that pulls manga from RawDev art.',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandeynmm',
    icon: 'icon.jpeg',
    contentRating: ContentRating.MATURE,
    websiteBaseURL: RA_DOMAIN,
    sourceTags: [
        {
            text: 'New',
            type: TagType.GREEN,
        },
        {
            text: 'Experimental',
            type: TagType.RED,
        },
    ],
}

export class RawDevArt extends Source {
    requestManager = createRequestManager({
        requestsPerSecond: 3,
    });

    parser = new Parser();

    override getMangaShareUrl(mangaId: string): string {
        return `${RA_DOMAIN}/comic/${mangaId}`
    }

    async getMangaDetails(mangaId: string): Promise<Manga> {
        const request = createRequestObject({
            url: `${RA_DOMAIN}/comic/${mangaId}`,
            method: 'GET',
        })

        const response = await this.requestManager.schedule(request, 3)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseMangaDetails($, mangaId)
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        const request = createRequestObject({
            url: `${RA_DOMAIN}/comic/${mangaId}`,
            method: 'GET',
        })

        const response = await this.requestManager.schedule(request, 3)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseChapters($, mangaId, this)
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const request = createRequestObject({
            url: `${RA_DOMAIN}/comic/${mangaId}/${chapterId}`,
            method: 'GET',
        })

        const response = await this.requestManager.schedule(request, 3)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseChapterDetails($, mangaId, chapterId)
    }

    override async getTags(): Promise<TagSection[]> {
        const request = createRequestObject({
            url: `${RA_DOMAIN}/search`,
            method: 'GET',
        })

        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseTags($)
    }

    override async supportsTagExclusion(): Promise<boolean> {
        return true
    }

    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        let page = metadata?.page ?? 1
        if (page == -1) return createPagedResults({ results: [], metadata: { page: -1 } })

        const param = `/?page=${page}${this.addTags(query)}&title=${query.title}`
        const request = createRequestObject({
            url: `${RA_DOMAIN}/search`,
            method: 'GET',
            param,
        })

        const data = await this.requestManager.schedule(request, 2)
        const $ = this.cheerio.load(data.data)
        const manga = this.parser.parseSearchResults($)

        page++
        if (manga.length < 12) page = -1

        return createPagedResults({
            results: manga,
            metadata: { page: page },
        })
    }

    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const request = createRequestObject({
            url: `${RA_DOMAIN}`,
            method: 'GET',
        })
        const response = await this.requestManager.schedule(request, 2)
        const $ = this.cheerio.load(response.data)

        this.parser.parseHomeSections($, sectionCallback)
    }

    override async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        if (homepageSectionId != '1') return createPagedResults({ results: [], metadata: { page: -1 } })
        // We only have one homepage section ID, so we don't need to worry about handling that any
        let page = metadata?.page ?? 1 // Default to page 0
        if (page == -1) return createPagedResults({ results: [], metadata: { page: -1 } })

        const request = createRequestObject({
            url: `${RA_DOMAIN}/?page=${page}`,
            method: 'GET',
        })

        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)
        const manga: MangaTile[] = this.parser.parseViewMore($)

        page++
        if (manga.length < 40) page = -1

        return createPagedResults({
            results: manga,
            metadata: { page: page },
        })
    }

    /**
     * Parses a time string from a Madara source into a Date object.
     * Copied from Madara.ts made by gamefuzzy
     */
    protected convertTime(timeAgo: string): Date {
        let time: Date
        let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0])
        trimmed = trimmed == 0 && timeAgo.includes('a') ? 1 : trimmed
        if (timeAgo.includes('mins') || timeAgo.includes('minutes') || timeAgo.includes('minute')) {
            time = new Date(Date.now() - trimmed * 60000)
        } else if (timeAgo.includes('hours') || timeAgo.includes('hour')) {
            time = new Date(Date.now() - trimmed * 3600000)
        } else if (timeAgo.includes('days') || timeAgo.includes('day')) {
            time = new Date(Date.now() - trimmed * 86400000)
        } else if (timeAgo.includes('year') || timeAgo.includes('years')) {
            time = new Date(Date.now() - trimmed * 31556952000)
        } else {
            time = new Date(timeAgo)
        }

        return time
    }

    addTags(query: SearchRequest): string {
        let tag_str = ''
        if (query.includedTags?.length != null) {
            tag_str = '&genre_inc='
            for (const tag of query.includedTags) {
                tag_str += `${tag.id},`
            }
        }

        if (query.excludedTags?.length != null) {
            tag_str += '&genre_exc='
            for (const tag of query.excludedTags) {
                tag_str += `${tag.id},`
            }
        }
        return tag_str.replace(/,\s*$/, '')
    }
}
