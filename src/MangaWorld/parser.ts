import {
    Chapter,
    ChapterDetails,
    HomeSection,
    HomeSectionType,
    SourceManga,
    PartialSourceManga,
    Tag,
    TagSection,
} from '@paperback/types'

export class Parser {
    parseMangaDetails($: any, mangaId: string): SourceManga {
        const title = $('.name.bigger').text().trim() ?? ''
        const image = $('.thumb.mb-3.text-center img').attr('src') ?? ''
        const desc = $('#noidungm').text().trim() ?? ''
        let hentai = false
        let author = ''
        let artist = ''
        const id_arr: Array<string> = []
        const label_arr: Array<string> = []
        let i = 0
        for (const obj of $('.meta-data.row.px-1 .col-12').toArray()) {
            switch (i) {
                case 1:
                    $(obj)
                        .find('a')
                        .each((_, e) => {
                            label_arr.push($(e).text()) &
                                id_arr.push($(e).attr('href')?.replace('https://www.mangaworld.in/archive?genre=', '') ?? '')
                        })
                    break
                case 2:
                    author = $(obj).text().trim().replace('Autore: ', '')
                    break
                case 3:
                    artist = $(obj).text().trim().replace('Artista: ', '')
                    break
            }
            i++
        }

        const status = 'Ongoing'
        const arrayTags: Tag[] = []

        for (const j in label_arr) {
            const id = id_arr[j] ?? ''
            const label = label_arr[j] ?? ''
            if (['ADULTI', 'SMUT', 'MATURO', 'HENTAI'].includes(id.toUpperCase())) hentai = true
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
                rating: 0,
                author,
                tags: tagSections,
                desc,
                hentai,
            }),
        })
    }

    parseChapters($: any, mangaId: string, source: any): Chapter[] {
        const chapters: Chapter[] = []
        const arrChapters = $('.chapter').toArray().reverse()
        for (const item of arrChapters) {
            const id = $('a', item).attr('href')?.replace(`${source.baseUrl}/manga/${mangaId}/read/`, '') ?? ''

            const name = $('a', item).attr('title') ?? ''
            const chapNum = Number($('.d-inline-block', item).text().split(' ')[1]) ?? -1

            chapters.push(
                App.createChapter({
                    id,
                    name,
                    chapNum,
                    time: new Date(Date.now()),
                    langCode: 'it',
                })
            )
        }
        return chapters
    }

    parseChapterDetails($: any, mangaId: string, id: string): ChapterDetails {
        const pages: string[] = []
        for (const item of $('.col-12.text-center.position-relative img').toArray()) {
            const imageUrl = $(item).attr('src')
            if (!imageUrl) continue
            pages.push(imageUrl.trim())
        }
        return App.createChapterDetails({
            id,
            mangaId,
            pages,
        })
    }

    parseTags($: any, baseUrl: any): TagSection[] {
        const genres: Tag[] = []
        let first_label = ''
        let i = 0
        for (const item of $('.dropdown-menu.dropdown-multicol .dropdown-item').toArray()) {
            const id = $(item).attr('href')?.replace(`${baseUrl}/archive?genre=`, '') ?? ''

            const label = $(item).text().trim()
            if (i == 0) first_label = label
            if (label == first_label && i > 0) break

            genres.push(App.createTag({ label: label, id: id }))
            i++
        }
        return [App.createTagSection({ id: '0', label: 'Generi', tags: genres })]
    }

    parseSearchResults($: any): PartialSourceManga[] {
        const results: PartialSourceManga[] = []
        for (const item of $('.comics-grid .entry').toArray()) {
            const id = (($('a', item).attr('href') ?? '').match(/[0-9]+\/[a-zA-Z0-9\-]+/i) ?? ['null'])[0] ?? ''

            const title = $('a', item).attr('title') ?? ''
            const image = $('a img', item).attr('src') ?? ''
            
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
            title: 'Ultimi capitoli aggiunti',
            containsMoreItems: true,
            type: HomeSectionType.singleRowNormal,
        })
        const section2 = App.createHomeSection({
            id: '2',
            title: 'Manga del mese',
            containsMoreItems: false,
            type: HomeSectionType.singleRowNormal,
        })
        const section3 = App.createHomeSection({
            id: '3',
            title: 'Capitoli di tendenza',
            containsMoreItems: false,
            type: HomeSectionType.singleRowNormal,
        })

        const latestManga: PartialSourceManga[] = []
        const hotTitles: PartialSourceManga[] = []
        const trending: PartialSourceManga[] = []

        const arrLatest = $('.col-sm-12.col-md-8.col-xl-9 .comics-grid .entry').toArray()
        const arrHotTitle = $('.col-12 .top-wrapper .entry').toArray()
        const arrTrending = $('.entry.vertical').toArray()

        for (const obj of arrLatest) {
            const id = (($('a', obj).attr('href') ?? '').match(/[0-9]+\/[a-zA-Z0-9\-]+/i) ?? ['null'])[0] ?? ''
            const title = $('a', obj).attr('title') ?? ''
            const image = $('a img', obj).attr('src') ?? ''
            const sub = $('.d-flex.flex-wrap.flex-row a', obj).first().attr('title') ?? ''
            latestManga.push(
                App.createPartialSourceManga({
                    image,
                    title: title,
                    mangaId: id,
                    subtitle: sub,
                })
            )
        }
        section1.items = latestManga
        sectionCallback(section1)

        let i = 0
        for (const obj of arrHotTitle) {
            const id = (($('a', obj).attr('href') ?? '').match(/[0-9]+\/[a-zA-Z0-9\-]+/i) ?? ['null'])[0] ?? ''
            const image = $('.img-fluid', obj).attr('src') ?? ''
            const title = $('.name', obj).text().trim()
            if (i == 10) break
            i++
            hotTitles.push(
                App.createPartialSourceManga({
                    image,
                    title: title,
                    mangaId: id,
                    subtitle: undefined,
                })
            )
        }

        section2.items = hotTitles
        sectionCallback(section2)
        for (const obj of arrTrending) {
            const id = (($('a', obj).attr('href') ?? '').match(/[0-9]+\/[a-zA-Z0-9\-]+/i) ?? ['null'])[0] ?? ''
            const image = $('a img', obj).attr('src') ?? ''
            const title = $('.manga-title', obj).text().trim()
            trending.push(
                App.createPartialSourceManga({
                    image,
                    title: title,
                    mangaId: id,
                    subtitle: undefined,
                })
            )
        }
        section3.items = trending
        sectionCallback(section3)
    }

    parseViewMore($: any): PartialSourceManga[] {
        const more: PartialSourceManga[] = []
        const arrLatest = $('.col-sm-12.col-md-8.col-xl-9 .comics-grid .entry').toArray()
        for (const obj of arrLatest) {
            const id = (($('a', obj).attr('href') ?? '').match(/[0-9]+\/[a-zA-Z0-9\-]+/i) ?? ['null'])[0] ?? ''

            const title = $('a', obj).attr('title') ?? ''
            const image = $('a img', obj).attr('src') ?? ''
            const sub = $('.d-flex.flex-wrap.flex-row a', obj).first().attr('title') ?? ''

            more.push(
                App.createPartialSourceManga({
                    image,
                    title: title,
                    mangaId: id,
                    subtitle: sub,
                })
            )
        }
        return more
    }
}
