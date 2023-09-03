import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    PagedResults,
    SearchRequest,
    Request,
    Response,
    SourceInfo,
    SourceIntents,
    SourceManga,
    SourceStateManager,
    BadgeColor,
    SearchResultsProviding,
    MangaProviding,
    ChapterProviding,
    HomePageSectionsProviding,
    HomeSectionType,
    TagSection,
    Tag,
    PartialSourceManga,
} from '@paperback/types'

const MW_DOMAIN = 'https://www.mangaworld.in'

export class Parser {
    parseMangaDetails($: any, mangaId: string): SourceManga {
        const title = $('.img-responsive').attr('alt') ?? ''
        const image = $('.img-responsive').attr('data-original') ?? ''
        const desc = $('.series-footer p').text().trim()
        let hentai = false
        let author = ''
        let artist = ''
        let rating = 0
        let statStr = ''
        const id_arr: Array<string> = []
        const label_arr: Array<string> = []
        $('.list-unstyled.genre-list').find('li').each((_, e) => {
            label_arr.push($(e).text().trim() ?? '') &&
            id_arr.push($('a', e).attr('href')?.replace('//manga-tube.me/series/search?genre=', '') ?? '')
        })
        let i = 0
        let shift = 0
        const items = $('.list-unstyled.series-details li').toArray()
        for (const obj of items) {
            switch (i) {
                case shift:
                    rating = Number($(obj).text().trim().replace(',', '.').slice(0, 10).trim())
                    break
                case shift + 1:
                    author = $(obj).text().trim().replace('Autor:', '').trim()
                    if (author.toLowerCase().includes('alternative')) {
                        shift++
                        author = $(items[i + 1])
                            .text()
                            .replace('Autor:', '')
                            .trim()
                    }
                    break
                case shift + 2:
                    artist = $(obj).text().replace('Artist:', '').trim()
                    break
                case shift + 7:
                    statStr = $(obj).text().trim()
                    break
            }
            i++
        }
        let status = 'Unknown'
        if (statStr.toLocaleLowerCase().includes('laufend')) {
            status = 'Ongoing'
        } else if (statStr.toLocaleLowerCase().includes('abgeschlossen')) {
            status = 'Completed'
        }
        const arrayTags: Tag[] = []
        for (const j in label_arr) {
            const id = id_arr[j] ?? ''
            const label = label_arr[j] ?? ''
            if (['HENTAI'].includes(id.toUpperCase())) hentai = true
            if (!id || !label) continue
            arrayTags.push({ id: id, label: label })
        }
        const tagSections: TagSection[] = [App.createTagSection({ id: '0', label: 'genres', tags: arrayTags.map((x) => App.createTag(x)) })]
        return App.createSourceManga({
            id: mangaId,
            mangaInfo: App.createMangaInfo({
                titles: [title],
                image,
                status,
                artist,
                rating: rating ?? 0,
                author,
                tags: tagSections,
                desc,
                hentai,
            }),
        })
    }

    parseChapters($: any, mangaId: string): Chapter[] {
        const chapters: Chapter[] = []
        const arrChapters = $('#chapter .chapter-list li').toArray().reverse()
        let i = 1
        for (const obj of arrChapters) {
            const id = $('a:nth-child(2)', obj).attr('href')?.replace('//manga-tube.me/series/', '') ?? ''
            const name = $('.chapter-name', obj).text().trim() ?? ''

            console.log(`name : ${name}`)
            chapters.push(
                App.createChapter({
                    id,
                    name,
                    chapNum: i,
                    time: new Date(Date.now()),
                    langCode: 'it',
                })
            )
            i++
        }
        return chapters
    }

    parseChapterDetails(data: any, mangaId: string, id: string): ChapterDetails {
        const pages: string[] = []
        if (data === null) throw new Error(data)
        const start = data.match('pages: ').index + 7
        const end = data.match('total_pages:').index - 5
        const imgStart = data.match('img_path: ').index + 11
        const imagePath = data.slice(imgStart, start - 13)
        const json = JSON.parse(data.slice(start, end))
        for (const obj of json) {
            const imageUrl = imagePath + obj.file_name
            if (!imageUrl) continue
            pages.push(imageUrl.trim())
        }
        return App.createChapterDetails({
            id,
            mangaId,
            pages,
        })
    }

    parseTags($: any): TagSection[] {
        const genres: Tag[] = []
        let first_label = ''
        let i = 0
        for (const item of $('.dropdown-menu.dropdown-multicol .dropdown-item').toArray()) {
            const id = $(item).attr('href')?.replace(`${MW_DOMAIN}/archive?genre=`, '') ?? ''
            const label = $(item).text().trim()
            if (i == 0) first_label = label
            if (label == first_label && i > 0) break
            genres.push(App.createTag({ label: label, id: id }))
            i++
        }
        return [App.createTagSection({ id: '0', label: 'Genre', tags: genres })]
    }

    parseSearchResults(data: any): PartialSourceManga[] {
        const jsonData = JSON.parse(data)
        const results: PartialSourceManga[] = []
        for (const item of jsonData['suggestions']) {
            const id = item['manga_slug'] ?? ''
            const title = item['value'] ?? ''
            const image = item['covers'][0]['img_name'] ?? ''
            results.push(
                App.createPartialSourceManga({
                    image,
                    title: title,
                    mangaId: id,
                    subtitle: undefined,
                })
            )
        }
        return results
    }

    parseHomeSections($: any, sectionCallback: (section: HomeSection) => void): void {
        const section1 = App.createHomeSection({
            id: '1',
            title: 'Serien Updates',
            containsMoreItems: true,
            type: HomeSectionType.singleRowNormal,
        })
        const section2 = App.createHomeSection({
            id: '2',
            title: 'Beliebte Serien',
            containsMoreItems: true,
            type: HomeSectionType.singleRowNormal,
        })
        const latestManga: PartialSourceManga[] = []
        const popularManga: PartialSourceManga[] = []
        const arrLatest = $('.panel-body .row .series-update-wraper').toArray()
        const arrPopular = $('#series-highlight-popular a').toArray()
        for (const obj of arrLatest) {
            const id = $('a', obj).attr('href')?.replace('//manga-tube.me/series/', '').slice(0, -1) ?? ''
            const title = $('.series-name', obj).text().trim() ?? ''
            const image = $('a img', obj).attr('data-original')?.replace('min', 'max') ?? ''
            const subtitle = $('.list-unstyled', obj).text().trim().split('\n')[0] ?? ''
            latestManga.push(
                App.createPartialSourceManga({
                    image,
                    title: title,
                    mangaId: id,
                    subtitle: subtitle,
                })
            )
        }
        section1.items = latestManga
        sectionCallback(section1)
        for (const obj of arrPopular) {
            const id = $(obj).attr('href')?.replace('//manga-tube.me/series/', '') ?? ''
            const title = $(obj).text().trim() ?? ''
            const image = $('img', obj).attr('src') ?? ''
            popularManga.push(
                App.createPartialSourceManga({
                    image,
                    title: title,
                    mangaId: id,
                    subtitle: undefined,
                })
            )
        }
        section2.items = popularManga
        sectionCallback(section2)
    }
    parseViewMoreLatest($: any): PartialSourceManga[] {
        const more: PartialSourceManga[] = []
        const arrLatest = $('.panel-body .row .series-update-wraper').toArray()
        for (const obj of arrLatest) {
            const id = $('a', obj).attr('href')?.replace('//manga-tube.me/series/', '').slice(0, -1) ?? ''
            const title = $('.series-name', obj).text().trim() ?? ''
            const image = $('a img', obj).attr('data-original')?.replace('min', 'max') ?? ''
            const subtitle = $('.list-unstyled', obj).text().trim().split('\n')[0] ?? ''
            more.push(
                App.createPartialSourceManga({
                    image,
                    title: title,
                    mangaId: id,
                    subtitle: subtitle,
                })
            )
        }
        return more
    }
    parseViewMorePopular(data: any): PartialSourceManga[] {
        const more: PartialSourceManga[] = []
        const jsonData = JSON.parse(data)
        for (const item of jsonData['success']) {
            const id = item['manga_slug'] ?? ''
            const title = item['manga_title'] ?? ''
            const image = item['covers'][0]['img_name'] ?? ''
            more.push(
                App.createPartialSourceManga({
                    image,
                    title: title,
                    mangaId: id,
                    subtitle: undefined,
                })
            )
        }
        return more
    }
}
