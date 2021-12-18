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

const RA_DOMAIN = 'https://rawdevart.com'

export class Parser {
    parseMangaDetails($: CheerioStatic, mangaId: string): Manga {
        const title = $('.img-fluid.not-lazy').attr('title') ?? ''
        const img = $('.img-fluid.not-lazy').attr('src') ?? ''
        const desc = $('.description.pb-2.mb-2 > p').text().trim() ?? ''
        const rating = $('#rating__val > span').text().trim()
        let author = ''
        let artist = ''
        let status_str = ''
        const info = $('tbody > tr').toArray()

        let i = 0
        for (const obj of info) {
            switch (i) {
                case 3:
                    author = $('td', $(obj)).text().trim() ?? ''
                    break;
                case 4:
                    artist = $('td', $(obj)).text().trim() ?? ''
                    break;
                case 5:
                    status_str = $('td', $(obj)).text().trim()
                    break;
            }
            i++
        }

        let status = MangaStatus.ONGOING
        switch (status_str) {
            case 'Ongoing':
                status = MangaStatus.ONGOING
                break;
            case 'Finished':
                status = MangaStatus.COMPLETED
                break;
        }

        return createManga({
            id: mangaId,
            titles: [title],
            image: `${RA_DOMAIN}${img}` ?? '',
            rating: Number(rating) ?? 0,
            status,
            artist,
            author,
            desc,
            //hentai
            hentai: false,
        })
    }

    parseChapters($: CheerioStatic, mangaId: string, source: any): Chapter[] {
        const chapters: Chapter[] = []
        const arrChapters = $('.list-group-item.list-group-item-action.rounded-0').toArray().reverse()
        let i = 0
        for (const obj of arrChapters) {
            const id = $('a', $(obj)).attr('href')?.replace(`/comic/${mangaId}/`, '').replace('/', '') ?? ''
            const name = $('a', $(obj)).attr('title') ?? ''
            const chapNum = Number(name.split(' ')[1]) ?? i

            const time = source.convertTime($('.float-right.font-14 > span', $(obj)).first().text())
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
            i++
        }
        return chapters
    }

    parseChapterDetails($: CheerioStatic, mangaId: string, id: string): ChapterDetails {
        const pages: string[] = []

        for (const obj of $('.img-fluid.not-lazy').toArray()) {
            const imageUrl = $(obj).attr('data-src')
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
        let i = 0
        for (const obj of $('.col-6.col-md-4.col-lg-3.col-xl-2').toArray()) {
            const label = $('.custom-control-label', $(obj)).text()
            const id = $('.custom-control-input.type3', $(obj)).attr('value') ?? '29'
            if (id == '29') i = 1
            if (i == 0) continue
            genres.push(createTag({ label: label, id: id }))
        }
        return [createTagSection({ id: '0', label: 'genres', tags: genres })]
    }

    parseSearchResults($: CheerioSelector, source: any): MangaTile[] {
        const results: MangaTile[] = []
        for (const obj of $('.col-6.col-md-4.col-lg-3.px-1.mb-2.lister-layout').toArray()) {
            const id = $('.overlay > a', $(obj)).attr('href')?.replace('/comic/', '').replace('/', '') ?? ''
            const info = $('.text-truncate.d-block', $(obj)).text().trim().split('\n')
            const img = $('.img-fluid', $(obj)).attr('src') ?? ''
            results.push(
                createMangaTile({
                    id,
                    image: `${RA_DOMAIN}${img}` ?? '',
                    title: createIconText({ text: info[0] ?? '' }),
                    subtitleText: createIconText({ text: info[1] ?? '' }),
                })
            )
        }
        return results
    }

    parseViewMore($: CheerioStatic): MangaTile[] {
        const more: MangaTile[] = []
        const arrLatest = $('.col-6.col-md-4.col-lg-3.px-1.mb-2.lister-layout').toArray()
        for (const obj of arrLatest) {
            const id = $('.overlay > a', $(obj)).attr('href')?.replace('/comic/', '').replace('/', '') ?? ''
            const info = $('.text-truncate.d-block', $(obj)).text().trim().split('\n')
            const img = $('.img-fluid', $(obj)).attr('src') ?? ''
            more.push(
                createMangaTile({
                    id,
                    image: `${RA_DOMAIN}${img}` ?? '',
                    title: createIconText({ text: info[0] ?? '' }),
                    subtitleText: createIconText({ text: info[1] ?? '' }),
                })
            )
        }
        return more
    }

    parseHomeSections($: CheerioStatic, sectionCallback: (section: HomeSection) => void): void {
        const section1 = createHomeSection({ id: '1', title: 'Latest', type: HomeSectionType.singleRowNormal, view_more:true })
        const section2 = createHomeSection({ id: '2', title: 'Top Rated', type: HomeSectionType.singleRowNormal })
        const section3 = createHomeSection({ id: '3', title: 'Top Today', type: HomeSectionType.singleRowNormal })

        const sections = [section1, section2, section3]

        const latest: MangaTile[] = []
        const topRated: MangaTile[] = []
        const topToday: MangaTile[] = []

        const arrLatest = $('.col-6.col-md-4.col-lg-3.px-1.mb-2.lister-layout').toArray()
        const arrTop = $('div#rTop > .list-group > li').toArray()
        const arrToday = $('#manga-owl-slider > .owl-stage-outer > .owl-stage > .owl-item').toArray()

        for (const obj of arrLatest) {
            const id = $('.overlay > a', $(obj)).attr('href')?.replace('/comic/', '').replace('/', '') ?? ''
            const info = $('.text-truncate.d-block', $(obj)).text().trim().split('\n')
            const img = $('.img-fluid', $(obj)).attr('src') ?? ''
            latest.push(
                createMangaTile({
                    id,
                    image: `${RA_DOMAIN}${img}` ?? '',
                    title: createIconText({ text: info[0] ?? '' }),
                    subtitleText: createIconText({ text: info[1] ?? '' }),
                })
            )
        }

        for (const obj of arrTop) {
            const id = $('.d-block', $(obj)).attr('href')?.replace('/comic/', '').replace('/', '') ?? ''
            const title = $('.d-block > img', $(obj)).attr('title') ?? ''
            const subTitle = $('.d-flex > a', $(obj)).text().trim() ?? ''
            const img = $('.d-block > img', $(obj)).attr('data-src')?.replace('.80x80_q70.jpg', '') ?? ''
            topRated.push(
                createMangaTile({
                    id,
                    image: `${RA_DOMAIN}${img}` ?? '',
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subTitle }),
                })
            )
        }

        for (const obj of arrToday) {
            const id = $('.overlay > a', $(obj)).attr('href')?.replace('/comic/', '').replace('/', '') ?? ''
            const info = $('.title', $(obj)).text().trim().split('\n')
            const img = $('.img-fluid', $(obj)).attr('src')
            topToday.push(
                createMangaTile({
                    id,
                    image: `${RA_DOMAIN}${img}` ?? '',
                    title: createIconText({ text: info[0] ?? '' }),
                    subtitleText: createIconText({ text: info[1] ?? '' }),
                })
            )
        }

        sections[0].items = latest
        sections[1].items = topRated
        sections[2].items = topToday

        for (const section of sections) sectionCallback(section)
    }
}
