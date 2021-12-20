import {
    Chapter,
    ChapterDetails,
    HomeSection,
    HomeSectionType,
    LanguageCode,
    Manga,
    MangaStatus,
    MangaTile,
    Tag,
    TagSection,
} from 'paperback-extensions-common'

const MW_DOMAIN = 'https://www.mangaworld.in'

export class Parser {
    parseMangaDetails($: CheerioStatic, mangaId: string): Manga {
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

        const status = MangaStatus.ONGOING

        const arrayTags: Tag[] = []
        for (const j in label_arr) {
            const id = id_arr[j] ?? ''
            const label = label_arr[j] ?? ''
            if (['ADULTI', 'SMUT', 'MATURO', 'HENTAI'].includes(id.toUpperCase())) hentai = true
            if (!id || !label) continue
            arrayTags.push({ id: id, label: label })
        }
        const tagSections: TagSection[] = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map((x) => createTag(x)) })]

        return createManga({
            id: mangaId,
            titles: [title],
            image,
            status,
            artist,
            rating: 0,
            author,
            tags: tagSections,
            desc,
            hentai,
        })
    }

    parseChapters($: CheerioStatic, mangaId: string): Chapter[] {
        const chapters: Chapter[] = []
        const arrChapters = $('.chapter').toArray().reverse()

        for (const item of arrChapters) {
            const id = $('a', item).attr('href')?.replace(`${MW_DOMAIN}/manga/${mangaId}/read/`, '') ?? ''
            const name = $('a', item).attr('title') ?? ''
            const chapNum = Number($('.d-inline-block', item).text().split(' ')[1]) ?? -1
            // const time = source.convertTime($('.col3 > a', $(item)).text().split(' ')[0]) ?? ''

            chapters.push(
                createChapter({
                    id,
                    mangaId,
                    name,
                    chapNum,
                    time: new Date(Date.now()),
                    langCode: LanguageCode.ITALIAN,
                })
            )
        }
        return chapters
    }

    parseChapterDetails($: CheerioStatic, mangaId: string, id: string): ChapterDetails {
        const pages: string[] = []
        
        for (const item of $('.col-12.text-center.position-relative img').toArray()) {
            const imageUrl = $(item).attr('src')
            if (!imageUrl) continue
            pages.push(imageUrl.trim())
        }

        return createChapterDetails({
            id,
            mangaId,
            pages,
            longStrip: true,
        })
    }

    parseTags($: CheerioSelector): TagSection[] {
        const genres: Tag[] = []

        let first_label = ''
        let i = 0
        for (const item of $('.dropdown-menu.dropdown-multicol .dropdown-item').toArray()) {
            const id = $(item).attr('href')?.replace(`${MW_DOMAIN}/archive?genre=`, '') ?? ''
            const label = $(item).text().trim()
            if (i == 0) first_label = label
            if (label == first_label && i > 0) break
            genres.push(createTag({ label: label, id: id }))
            i++
        }

        return [createTagSection({ id: '0', label: 'Generi', tags: genres })]
    }

    parseSearchResults($: CheerioSelector): MangaTile[] {
        const results: MangaTile[] = []
        for (const item of $('.comics-grid .entry').toArray()) {
            const id = $('a', item).attr('href')?.replace(`${MW_DOMAIN}/manga/`, '') ?? ''
            const title = $('a', item).attr('title') ?? ''
            const image = $('a img', item).attr('src') ?? ''

            results.push(
                createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                })
            )
        }
        return results
    }

    parseHomeSections($: CheerioStatic, sectionCallback: (section: HomeSection) => void): void {
        const section1 = createHomeSection({ id: '1', title: 'Ultimi capitoli aggiunti', type: HomeSectionType.singleRowNormal, view_more: true })
        const section2 = createHomeSection({ id: '2', title: 'Manga del mese',           type: HomeSectionType.singleRowNormal, })
        const section3 = createHomeSection({ id: '3', title: 'Capitoli di tendenza',     type: HomeSectionType.singleRowNormal,})

        const latestManga: MangaTile[] = []
        const hotTitles  : MangaTile[] = []
        const trending   : MangaTile[] = []


        const arrLatest   = $('.col-sm-12.col-md-8.col-xl-9 .comics-grid .entry').toArray()
        const arrHotTitle = $('.col-12 .top-wrapper .entry').toArray()
        const arrTrending = $('.entry.vertical').toArray()

        for (const obj of arrLatest) {
            const id    = $('a', obj).attr('href')?.replace(`${MW_DOMAIN}/manga/`, '') .slice(0, -1)?? ''
            const title = $('a', obj).attr('title') ?? ''
            const image = $('a img', obj).attr('src') ?? ''
            const sub   = $('.d-flex.flex-wrap.flex-row a', obj).first().attr('title') ?? ''
            latestManga.push(
                createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: sub }),
                })
            )
        }
        section1.items = latestManga
        sectionCallback(section1)

        let i = 0
        for (const obj of arrHotTitle) {
            const id    = $('a', obj).attr('href')?.replace('https://www.mangaworld.in/manga/', '') ?? ''
            const image = $('.img-fluid', obj).attr('src') ?? ''
            const title = $('.name', obj).text().trim()
            if (i == 10) break
            i++
            hotTitles.push(
                createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                })
            )
        }
        section2.items = hotTitles
        sectionCallback(section2)

        for (const item of arrTrending) {
            const id    = $('a', item).attr('href')?.replace('https://www.mangaworld.in/manga/', '').slice(0, -1) ?? ''
            const image = $('a img', item).attr('src') ?? ''
            const title = $('.manga-title', item).text().trim()
            trending.push(
                createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                })
            )
        }
        section3.items = trending
        sectionCallback(section3)
    }

    parseViewMore($: CheerioStatic): MangaTile[] {
        const more: MangaTile[] = []
        const arrLatest   = $('.col-sm-12.col-md-8.col-xl-9 .comics-grid .entry').toArray()
        for (const obj of arrLatest) {
            const id    = $('a', obj).attr('href')?.replace(`${MW_DOMAIN}/manga/`, '').slice(0, -1) ?? ''
            const title = $('a', obj).attr('title') ?? ''
            const image = $('a img', obj).attr('src') ?? ''
            const sub   = $('.d-flex.flex-wrap.flex-row a', obj).first().attr('title') ?? ''
            more.push(
                createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: sub }),
                })
            )
        }
        return more
    }
}
