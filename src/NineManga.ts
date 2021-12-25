/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */


import {
    Chapter,
    ChapterDetails,
    HomeSection,
    LanguageCode,
    Manga,
    MangaStatus,
    MangaTile,
    MangaUpdates,
    PagedResults,
    RequestHeaders,
    SearchRequest,
    Source,
    TagSection,
} from 'paperback-extensions-common'
import { URLBuilder } from './helper'

import { Parser } from './NineMangaParser'

const BASE_VERSION = '2.0.0'
export const getExportVersion = (EXTENSION_VERSION: string): string => {
    return BASE_VERSION.split('.')
        .map((x, index) => Number(x) + Number(EXTENSION_VERSION.split('.')[index]))
        .join('.')
}

export abstract class NineManga extends Source {
    userAgentRandomizer = `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/78.0${Math.floor(Math.random() * 100000)}`

    requestManager = createRequestManager({
        requestsPerSecond: 3,
    })

    abstract baseUrl: string

    /*
     * The language code which this source supports.
     */
    abstract languageCode: LanguageCode

    abstract genreTag: string

    abstract authorTag: string

    abstract statusTag: string

    alternativeChapterUrl = false

    parser = new Parser()

    override getMangaShareUrl(mangaId: string): string {
        return `${this.baseUrl}/manga/${mangaId}?waring=1`
    }

    override async supportsTagExclusion(): Promise<boolean> {
        return true
    }

    async getMangaDetails(mangaId: string): Promise<Manga> {
        const request = this.createRequest(`${this.baseUrl}/manga/${mangaId}?waring=1`)
        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseMangaDetails($, mangaId, this)
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        const request = this.createRequest(`${this.baseUrl}/manga/${mangaId}?waring=1`)
        const response = await this.requestManager.schedule(request, 3)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseChapters($, mangaId, this)
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const request = this.createRequest(`${chapterId}-10-1`)
        const response = await this.requestManager.schedule(request, 3)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseChapterDetails($, mangaId, chapterId, this)
    }

    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        let page = metadata?.page ?? 1
        if (page == -1) return createPagedResults({ results: [], metadata: { page: -1 } })

        const request = this.constructSearchRequest(page, query)
        const data = await this.requestManager.schedule(request, 2)
        const $ = this.cheerio.load(data.data)
        const manga = this.parser.parseSearchResults($, this)

        page++
        if (manga.length < 30) page = -1

        return createPagedResults({
            results: manga,
            metadata: { page: page },
        })
    }

    override async getTags(): Promise<TagSection[]> {
        const request = this.createRequest(`${this.baseUrl}/search`)
        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)
        return this.parser.parseTags($)
    }

    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        let request = this.createRequest(`${this.baseUrl}`)
        let response = await this.requestManager.schedule(request, 2)
        const $ = this.cheerio.load(response.data)

        request = this.createRequest(`${this.baseUrl}/list/New-Update/`)
        response = await this.requestManager.schedule(request, 2)
        const $$ = this.cheerio.load(response.data)

        await this.parser.parseHomeSections($, $$, sectionCallback, this)
    }

    override async filterUpdatedManga(mangaUpdatesFoundCallback: (updates: MangaUpdates) => void, time: Date, ids: string[]): Promise<void> {
        const request = this.createRequest(this.baseUrl)

        const data = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(data.data)

        const updatedManga = this.parser.filterUpdatedManga($, time, ids, this)
        if (updatedManga.length > 0) {
            mangaUpdatesFoundCallback(createMangaUpdates({
                ids: updatedManga
            }))
        }
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

    createRequest(url: string, method = 'GET', param = '') : any {
        return createRequestObject({
            url,
            method,
            param,
            headers: this.constructHeaders({
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) Gecko/20100101 Firefox/75',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8,gl;q=0.7',
            }),
        })
    }

    constructSearchRequest(page: number, query: SearchRequest): any {
        return createRequestObject({
            url: new URLBuilder(this.baseUrl)
                .addPathComponent('search')
                .addQueryParameter('name_sel', 'contain')
                .addQueryParameter('wd', encodeURIComponent(query?.title ?? ''))
                .addQueryParameter('completed_series', 'either')
                .addQueryParameter(
                    'category_id',
                    query?.includedTags?.map((x: any) => x.id)
                )
                .addQueryParameter(
                    'out_category_id',
                    query?.excludedTags?.map((x: any) => x.id)
                )
                .addQueryParameter('type', 'high')
                .addQueryParameter('page', page.toString())
                .buildUrl({ addTrailingSlash: true, includeUndefinedParameters: false }),
            method: 'GET',
        })
    }
    
    constructHeaders(headers?: any, refererPath?: string): any {
        headers = headers ?? {}
        if (this.userAgentRandomizer !== '') {
            headers['user-agent'] = this.userAgentRandomizer
        }
        headers['referer'] = `${this.baseUrl}${refererPath ?? ''}`
        return headers
    }

    parseStatus(str: string): MangaStatus {
        let status = MangaStatus.UNKNOWN

        switch (str.toLowerCase()) {
            case 'ongoing':
                status = MangaStatus.ONGOING
                break
            case 'completed':
                status = MangaStatus.COMPLETED
                break
        }
        return status
    }
}
