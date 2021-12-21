import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    LanguageCode,
    Manga,
    MangaTile,
    PagedResults,
    RequestManager,
    SearchRequest,
    Source,
    SourceInfo,
    TagSection,
    TagType,
} from 'paperback-extensions-common'

import { Parser } from './parser'

const MT_DOMAIN = 'https://manga-tube.me/'
export const MangaTubeInfo: SourceInfo = {
    version: '2.0.0',
    name: 'MangaTube',
    description: 'Extension that pulls manga from MangaTube.',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandeynmm',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    language: LanguageCode.GERMAN,
    websiteBaseURL: MT_DOMAIN,
    sourceTags: [
        {
            text: 'New',
            type: TagType.GREEN,
        },
        {
            text: 'GERMAN',
            type: TagType.GREY,
        },
    ],
}

export class MangaTube extends Source {
    requestManager = createRequestManager({
        requestsPerSecond: 3,
    })

    parser = new Parser()

    override getMangaShareUrl(mangaId: string): string {
        return `${MT_DOMAIN}/series/${mangaId}`
    }

    async getMangaDetails(mangaId: string): Promise<Manga> {
        const request = createRequestObject({
            url: `${MT_DOMAIN}/series/${mangaId}`,
            method: 'GET',
        })

        const response = await this.requestManager.schedule(request, 3)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseMangaDetails($, mangaId)
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        const request = createRequestObject({
            url: `${MT_DOMAIN}/series/${mangaId}`,
            method: 'GET',
        })

        const response = await this.requestManager.schedule(request, 3)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseChapters($, mangaId)
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const request = createRequestObject({
            url: `${MT_DOMAIN}/series/${chapterId}`,
            method: 'GET',
        })
        const response = await this.requestManager.schedule(request, 3)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseChapterDetails(response.data, mangaId, chapterId)
    }

    override async getTags(): Promise<TagSection[]> {
        const request = createRequestObject({
            url: MT_DOMAIN,
            method: 'GET',
        })

        const response = await this.requestManager.schedule(request, 3)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseTags($)
    }

    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        let page = metadata?.page ?? 1
        if (page == -1) return createPagedResults({ results: [], metadata: { page: -1 } })

        const request = createRequestObject({
            url: `${MT_DOMAIN}/ajax`,
            method: 'POST',
            headers: this.constructHeaders({
                'content-type': 'application/x-www-form-urlencoded',
            }),
            data: {
                action: 'search_query',
                'parameter[query]': query.title,
            },
        })
        const response = await this.requestManager.schedule(request, 2)
        const $ = this.cheerio.load(response.data)

        const manga = this.parser.parseSearchResults(response.data)

        page++
        if (manga.length < 16) page = -1

        return createPagedResults({
            results: manga,
            metadata: { page: page },
        })
    }

    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const request = createRequestObject({
            url: `${MT_DOMAIN}`,
            method: 'GET',
        })
        const response = await this.requestManager.schedule(request, 2)
        const $ = this.cheerio.load(response.data)

        this.parser.parseHomeSections($, sectionCallback)
    }

    override async getViewMoreItems(id: string, metadata: any): Promise<PagedResults> {
        const page = metadata?.page ?? 1
        const request  = this.createRequestObject(id, page)
        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)

        let manga: MangaTile[] = []
        switch (id) {
            case '1':
                manga = this.parser.parseViewMoreLatest($)
                if (page > 1) manga.shift()
                break
            case '2':
                manga = this.parser.parseViewMorePopular(response.data)
                break
        }
        return createPagedResults({
            results: manga,
            metadata: { page: page + 1 },
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

    createRequestObject(id: string, page: string): any {
        let request = createRequestObject({
            url: `${MT_DOMAIN}/?page=${page}`,
            method: 'GET',
        })
        if (id == '1') return request

        request = createRequestObject({
            url: `${MT_DOMAIN}/ajax`,
            method: 'POST',
            headers: this.constructHeaders({
                'content-type': 'application/x-www-form-urlencoded',
            }),
            data: {
                action: 'load_series_list_entries',
                'parameter[page]': page,
                'parameter[sortby]': 'popularity',
                'parameter[order]': 'asc',
            },
        })
        return request
    }

    userAgentRandomizer = `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/78.0${Math.floor(Math.random() * 100000)}`
    constructHeaders(headers?: any, refererPath?: string): any {
        headers = headers ?? {}
        if (this.userAgentRandomizer !== '') {
            headers['user-agent'] = this.userAgentRandomizer
        }
        headers['referer'] = `${MT_DOMAIN}${refererPath ?? ''}`
        return headers
    }
}
