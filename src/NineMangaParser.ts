/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Chapter,
    ChapterDetails,
    HomeSection,
    HomeSectionType,
    LanguageCode,
    Manga,
    MangaTile,
    Tag,
    TagSection,
} from 'paperback-extensions-common'

export class Parser {
    parseMangaDetails($: CheerioStatic, mangaId: string, source: any): Manga {
        const title = $('.bookface img').attr('alt') ?? ''
        const image = $('.bookface img').attr('src') ?? 'https://paperback.moe/icons/logo-alt.svg'
        let desc = $('.bookintro p').text().trim().replace('Summary:', '') ?? ''
        if (desc == '') desc = `No Decscription provided by the source(${source.baseUrl})`
        let author = ''
        let status_str = ''
        let hentai = false

        const arrayTags: Tag[] = []
        const info = $('.message li').toArray()
        for (const obj of info) {
            const item = $('b', obj).text().trim().replace(':', '')
            switch (item) {
                case source.genreTag:
                    for (const e of $('a', obj).toArray()) {
                        const id = $(e).attr('href')?.replace('/category/', '').replace('.html', '') ?? ''
                        const label = $(e).text().trim() ?? ''
                        if (['ADULT', 'SMUT', 'MATURE'].includes(id.toUpperCase())) hentai = true
                        if (!id || !label) continue
                        arrayTags.push({ id: id, label: label })
                    }
                    break
                case source.authorTag:
                    author = $('a', obj).text().trim()
                    break
                case source.statusTag:
                    status_str = $('a', obj).first().text().trim()
                    break
            }
        }
        const tagSections: TagSection[] = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map((x) => createTag(x)) })]
        const status = source.parseStatus(status_str)

        return createManga({
            id: mangaId,
            titles: [title],
            image,
            rating: 0,
            status,
            author,
            tags: tagSections,
            desc,
            hentai,
        })
    }

    parseChapters($: CheerioStatic, mangaId: string, source: any): Chapter[] {
        const chapters: Chapter[] = []
        let prevChapNum = 1
        const arrChapters = $('.sub_vol_ul li').toArray().reverse()
        for (const obj of arrChapters) {
            const id = $('a', obj).attr('href')?.replace('.html', '').replace(/\/$/, '') ?? ''
            const name = $('a', obj).attr('title') ?? ''
            const chapNum = prevChapNum++
            const time = source.convertTime($('span', obj).text().trim())
            chapters.push(
                createChapter({
                    id,
                    mangaId,
                    name,
                    chapNum,
                    time,
                    langCode: LanguageCode.JAPANESE,
                })
            )
        }
        return chapters
    }

    async parseChapterDetails($: CheerioStatic, mangaId: string, id: string, source: any): Promise<ChapterDetails> {
        const pages: string[] = []

        const pageArr = $('select#page option').toArray()
        let end = ''
        let i = 0
        for (const obj of pageArr) {
            const page = $(obj).attr('value') ?? ''
            if (i == 0) end = page
            if (i > 0 && page == end) break
            const imagesArray = await this.getImage(`${source.baseUrl}${page}`, source)
            for (const image of imagesArray) pages.push(image)
            i++
        }
        return createChapterDetails({
            id,
            mangaId,
            pages,
            longStrip: true,
        })
    }

    parseSearchResults($: CheerioSelector, source: any): MangaTile[] {
        const results: MangaTile[] = []
        for (const obj of $('.direlist .bookinfo').toArray()) {
            const id = $('.bookname', obj).attr('href')?.replace(`${source.baseUrl}/manga/`, '').replace('.html', '') ?? ''
            const title = $('.bookname', obj).text().trim() ?? ''
            const subTitle = $('.chaptername', obj).text().trim().replace(title, '').trim() ?? ''
            const image = $('dt img', obj).attr('src') ?? ''
            results.push(
                createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subTitle }),
                })
            )
        }
        return results
    }

    parseTags($: CheerioSelector): TagSection[] {
        const genres: Tag[] = []
        for (const obj of $('div.typelist li.cate_list').toArray()) {
            const id = $(obj).attr('cate_id')
            const label = $(obj).text().trim() ?? ''
            if (!id || !label) continue
            genres.push(createTag({ label, id }))
        }
        return [createTagSection({ id: '0', label: 'genres', tags: genres })]
    }

    async parseHomeSections($: CheerioStatic, $$: CheerioStatic, sectionCallback: (section: HomeSection) => void, source: any): Promise<void> {
        const section1 = createHomeSection({ id: '1', title: 'Latest Manga', type: HomeSectionType.singleRowNormal,})
        const section2 = createHomeSection({ id: '2', title: 'Popular',      type: HomeSectionType.singleRowNormal,})
        const section3 = createHomeSection({ id: '3', title: 'Hot Manga',    type: HomeSectionType.singleRowNormal,})
        const section4 = createHomeSection({ id: '4', title: 'New Manga',    type: HomeSectionType.singleRowNormal,})

        const popular : MangaTile[] = []
        const hot     : MangaTile[] = []
        const latest  : MangaTile[] = []
        const newManga: MangaTile[] = []

        const arrLatest  = $$('.direlist .bookinfo').toArray()
        const arrPopular = $('.pop_update li').toArray()

        const arrHot = $('.rightbox ul:nth-child(3) li dl').toArray()
        const arrNew = $('.rightbox ul:nth-child(6) li dl').toArray()

        for (const obj of arrLatest) {
            const id = $$('.bookname', obj).attr('href')?.replace(`${source.baseUrl}/manga/`, '').replace('.html', '') ?? ''
            const title = $$('.bookname', obj).text().trim() ?? ''
            const subTitle = $$('.chaptername', obj).text().trim().toUpperCase().replace(title.toUpperCase(), '').trim() ?? ''
            const image = $$('dt img', obj).attr('src') ?? ''
            latest.push(
                createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subTitle }),
                })
            )
        }
        section1.items = latest
        sectionCallback(section1)

        for (const obj of arrPopular) {
            const id = $('a', obj).attr('href')?.replace(`${source.baseUrl}/manga/`, '').replace('.html', '') ?? ''
            const title = $('a', obj).attr('title') ?? ''
            const image = $('img', obj).attr('src') ?? ''
            popular.push(
                createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                })
            )
        }
        section2.items = popular
        sectionCallback(section2)

        for (const obj of arrHot) {
            const id = $('a', obj).attr('href')?.replace(`${source.baseUrl}/manga/`, '').replace('.html', '') ?? ''
            const title = $('img', obj).attr('alt') ?? ''
            const image = $('img', obj).attr('src') ?? ''
            hot.push(
                createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                })
            )
        }
        section3.items = hot
        sectionCallback(section3)

        for (const obj of arrNew) {
            const id = $('a', obj).attr('href')?.replace(`${source.baseUrl}/manga/`, '').replace('.html', '') ?? ''
            const title = $('img', obj).attr('alt') ?? ''
            const image = $('img', obj).attr('src') ?? ''
            newManga.push(
                createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                })
            )
        }
        section4.items = newManga
        sectionCallback(section4)
    }

    filterUpdatedManga($: CheerioSelector, time: Date, ids: string[], source: any): string[] {
        let passedReferenceTimePrior = false
        let passedReferenceTimeCurrent = false
        const updatedManga: string[] = []
        for (const obj of $('.homeupdate li').toArray()) {
            const id = $('a', obj).attr('href')?.replace(`${source.baseUrl}/manga/`, '').replace('.html', '') ?? ''

            let mangaTime: Date
            const timeSelector = $('dd', obj).text().trim() ?? ''
            // eslint-disable-next-line prefer-const
            mangaTime = source.convertTime(timeSelector ?? '')

            // Check if the date is valid, if it isn't we should skip it
            if (!mangaTime.getTime()) continue

            passedReferenceTimeCurrent = mangaTime <= time
            if (!passedReferenceTimeCurrent || !passedReferenceTimePrior) {
                if (ids.includes(id)) {
                    updatedManga.push(id)
                }
            } else break

            if (typeof id === 'undefined') {
                throw new Error(`Failed to parse homepage sections for ${source.baseUrl}/${source.homePage}/`)
            }
            passedReferenceTimePrior = passedReferenceTimeCurrent
        }
        return updatedManga
    }

    async getImage(url: string, source: any): Promise<string[]> {
        const request = source.createRequest(url)
        const response = await source.requestManager.schedule(request, 3)
        const $ = source.cheerio.load(response.data)
        const arrImages: string[] = []
        const img = $('div.pic_box img.manga_pic').toArray()

        for (const obj of img) {
            const i = $(obj).attr('src') ?? ''
            arrImages.push(i)
        }
        return arrImages
    }
}
