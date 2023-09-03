(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    async getTags() {
        // @ts-ignore
        return this.getSearchTags?.();
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    let time;
    let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],3:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":1,"./Tracker":2}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);

},{"./base":3,"./models":47}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],6:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],7:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],8:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],9:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],10:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],11:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],12:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],13:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],14:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],15:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],16:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],17:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],18:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],19:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],20:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],21:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],22:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],23:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":8,"./Form":9,"./FormRow":10,"./Header":11,"./InputField":12,"./Label":13,"./Link":14,"./MultilineLabel":15,"./NavigationButton":16,"./OAuthButton":17,"./Section":18,"./Select":19,"./Stepper":20,"./Switch":21,"./WebViewButton":22}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],27:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],28:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],29:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],30:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],31:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],32:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],33:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],34:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],35:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],36:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],37:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],41:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],44:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],45:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],46:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);
__exportStar(require("./SearchFilter"), exports);

},{"./Chapter":5,"./ChapterDetails":6,"./Constants":7,"./DynamicUI":23,"./HomeSection":24,"./Languages":25,"./Manga":26,"./MangaTile":27,"./MangaUpdate":28,"./PagedResults":29,"./RawData":30,"./RequestHeaders":31,"./RequestInterceptor":32,"./RequestManager":33,"./RequestObject":34,"./ResponseObject":35,"./SearchField":36,"./SearchFilter":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawDevArt = exports.RawDevArtInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const parser_1 = require("./parser");
const RA_DOMAIN = 'https://rawdevart.com';
exports.RawDevArtInfo = {
    version: '2.0.1',
    name: 'RawDevArt',
    description: 'Extension that pulls manga from RawDev art.',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandeynmm',
    icon: 'icon.jpeg',
    contentRating: paperback_extensions_common_1.ContentRating.MATURE,
    websiteBaseURL: RA_DOMAIN,
    sourceTags: [
        {
            text: 'New',
            type: paperback_extensions_common_1.TagType.GREEN,
        },
        {
            text: 'JAPANESE',
            type: paperback_extensions_common_1.TagType.GREY,
        },
    ],
};
class RawDevArt extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.requestManager = createRequestManager({
            requestsPerSecond: 3,
        });
        this.parser = new parser_1.Parser();
    }
    getMangaShareUrl(mangaId) {
        return `${RA_DOMAIN}/comic/${mangaId}`;
    }
    async getMangaDetails(mangaId) {
        const request = createRequestObject({
            url: `${RA_DOMAIN}/comic/${mangaId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 3);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseMangaDetails($, mangaId);
    }
    async getChapters(mangaId) {
        const request = createRequestObject({
            url: `${RA_DOMAIN}/comic/${mangaId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 3);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseChapters($, mangaId, this);
    }
    async getChapterDetails(mangaId, chapterId) {
        const request = createRequestObject({
            url: `${RA_DOMAIN}/comic/${mangaId}/${chapterId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 3);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseChapterDetails($, mangaId, chapterId);
    }
    async getTags() {
        const request = createRequestObject({
            url: `${RA_DOMAIN}/search`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseTags($);
    }
    async supportsTagExclusion() {
        return true;
    }
    async getSearchResults(query, metadata) {
        let page = metadata?.page ?? 1;
        if (page == -1)
            return createPagedResults({ results: [], metadata: { page: -1 } });
        const param = `/?page=${page}${this.addTags(query)}&title=${query.title}`;
        const request = createRequestObject({
            url: `${RA_DOMAIN}/search`,
            method: 'GET',
            param,
        });
        const data = await this.requestManager.schedule(request, 2);
        const $ = this.cheerio.load(data.data);
        const manga = this.parser.parseSearchResults($);
        page++;
        if (manga.length < 12)
            page = -1;
        return createPagedResults({
            results: manga,
            metadata: { page: page },
        });
    }
    async getHomePageSections(sectionCallback) {
        const request = createRequestObject({
            url: `${RA_DOMAIN}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 2);
        const $ = this.cheerio.load(response.data);
        this.parser.parseHomeSections($, sectionCallback);
    }
    async getViewMoreItems(homepageSectionId, metadata) {
        if (homepageSectionId != '1')
            return createPagedResults({ results: [], metadata: { page: -1 } });
        // We only have one homepage section ID, so we don't need to worry about handling that any
        let page = metadata?.page ?? 1; // Default to page 0
        if (page == -1)
            return createPagedResults({ results: [], metadata: { page: -1 } });
        const request = createRequestObject({
            url: `${RA_DOMAIN}/?page=${page}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);
        const manga = this.parser.parseViewMore($);
        page++;
        if (manga.length < 40)
            page = -1;
        return createPagedResults({
            results: manga,
            metadata: { page: page },
        });
    }
    /**
     * Parses a time string from a Madara source into a Date object.
     * Copied from Madara.ts made by gamefuzzy
     */
    convertTime(timeAgo) {
        let time;
        let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0]);
        trimmed = trimmed == 0 && timeAgo.includes('a') ? 1 : trimmed;
        if (timeAgo.includes('mins') || timeAgo.includes('minutes') || timeAgo.includes('minute')) {
            time = new Date(Date.now() - trimmed * 60000);
        }
        else if (timeAgo.includes('hours') || timeAgo.includes('hour')) {
            time = new Date(Date.now() - trimmed * 3600000);
        }
        else if (timeAgo.includes('days') || timeAgo.includes('day')) {
            time = new Date(Date.now() - trimmed * 86400000);
        }
        else if (timeAgo.includes('year') || timeAgo.includes('years')) {
            time = new Date(Date.now() - trimmed * 31556952000);
        }
        else {
            time = new Date(timeAgo);
        }
        return time;
    }
    addTags(query) {
        let tag_str = '';
        if (query.includedTags?.length != null) {
            tag_str = '&genre_inc=';
            for (const tag of query.includedTags) {
                tag_str += `${tag.id},`;
            }
        }
        if (query.excludedTags?.length != null) {
            tag_str += '&genre_exc=';
            for (const tag of query.excludedTags) {
                tag_str += `${tag.id},`;
            }
        }
        return tag_str.replace(/,\s*$/, '');
    }
}
exports.RawDevArt = RawDevArt;

},{"./parser":49,"paperback-extensions-common":4}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const RA_DOMAIN = 'https://rawdevart.com';
class Parser {
    parseMangaDetails($, mangaId) {
        const title = $('.img-fluid.not-lazy').attr('title') ?? '';
        const img = $('.img-fluid.not-lazy').attr('src') ?? '';
        const desc = $('.description.pb-2.mb-2 > p').text().trim() ?? '';
        const rating = $('#rating__val > span').text().trim();
        let author = '';
        let artist = '';
        let status_str = '';
        let hentai = false;
        const info = $('tbody > tr').toArray();
        let i = 0;
        for (const obj of info) {
            switch (i) {
                case 3:
                    author = $('td', $(obj)).text().trim() ?? '';
                    break;
                case 4:
                    artist = $('td', $(obj)).text().trim() ?? '';
                    break;
                case 5:
                    status_str = $('td', $(obj)).text().trim();
                    break;
            }
            i++;
        }
        let status = paperback_extensions_common_1.MangaStatus.ONGOING;
        switch (status_str) {
            case 'Ongoing':
                status = paperback_extensions_common_1.MangaStatus.ONGOING;
                break;
            case 'Finished':
                status = paperback_extensions_common_1.MangaStatus.COMPLETED;
                break;
        }
        const arrayTags = [];
        for (const obj of $('.genres.mb-1 > a').toArray()) {
            const id = $(obj).attr('href')?.replace('/genre/', '').replace('/', '') ?? '';
            const label = $(obj).text().trim();
            if (['ADULT', 'SMUT', 'MATURE'].includes(id.toUpperCase()))
                hentai = true;
            if (!id || !label)
                continue;
            arrayTags.push({ id: id, label: label });
        }
        const tagSections = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map((x) => createTag(x)) })];
        return createManga({
            id: mangaId,
            titles: [title],
            image: `${RA_DOMAIN}${img}` ?? '',
            rating: Number(rating) ?? 0,
            status,
            artist,
            author,
            tags: tagSections,
            desc,
            hentai,
        });
    }
    parseChapters($, mangaId, source) {
        const chapters = [];
        const arrChapters = $('.list-group-item.list-group-item-action.rounded-0').toArray().reverse();
        let i = 0;
        for (const obj of arrChapters) {
            const id = $('a', $(obj)).attr('href')?.replace(`/comic/${mangaId}/`, '').replace('/', '') ?? '';
            const name = $('a', $(obj)).attr('title') ?? '';
            const chapNum = Number(name.split(' ')[1]) ?? i;
            const time = source.convertTime($('.float-right.font-14 > span', $(obj)).first().text());
            chapters.push(createChapter({
                id,
                mangaId,
                name,
                chapNum,
                time,
                langCode: paperback_extensions_common_1.LanguageCode.JAPANESE,
            }));
            i++;
        }
        return chapters;
    }
    parseChapterDetails($, mangaId, id) {
        const pages = [];
        for (const obj of $('.img-fluid.not-lazy').toArray()) {
            const imageUrl = $(obj).attr('data-src');
            if (!imageUrl)
                continue;
            pages.push(imageUrl.trim());
        }
        return createChapterDetails({
            id,
            mangaId,
            pages,
            longStrip: true,
        });
    }
    parseTags($) {
        const genres = [];
        let i = 0;
        for (const obj of $('.col-6.col-md-4.col-lg-3.col-xl-2').toArray()) {
            const label = $('.custom-control-label', $(obj)).text();
            const id = $('.custom-control-input.type3', $(obj)).attr('value') ?? '29';
            if (id == '29')
                i = 1;
            if (i == 0)
                continue;
            genres.push(createTag({ label: label, id: id }));
        }
        return [createTagSection({ id: '0', label: 'genres', tags: genres })];
    }
    parseSearchResults($) {
        const results = [];
        for (const obj of $('.col-6.col-md-4.col-lg-3.px-1.mb-2.lister-layout').toArray()) {
            const id = $('.overlay > a', $(obj)).attr('href')?.replace('/comic/', '').replace('/', '') ?? '';
            const info = $('.text-truncate.d-block', $(obj)).text().trim().split('\n');
            const img = $('.img-fluid', $(obj)).attr('src') ?? '';
            results.push(createMangaTile({
                id,
                image: `${RA_DOMAIN}${img}` ?? '',
                title: createIconText({ text: info[0] ?? '' }),
                subtitleText: createIconText({ text: info[1] ?? '' }),
            }));
        }
        return results;
    }
    parseViewMore($) {
        const more = [];
        const arrLatest = $('.col-6.col-md-4.col-lg-3.px-1.mb-2.lister-layout').toArray();
        for (const obj of arrLatest) {
            const id = $('.overlay > a', $(obj)).attr('href')?.replace('/comic/', '').replace('/', '') ?? '';
            const info = $('.text-truncate.d-block', $(obj)).text().trim().split('\n');
            const img = $('.img-fluid', $(obj)).attr('src') ?? '';
            more.push(createMangaTile({
                id,
                image: `${RA_DOMAIN}${img}` ?? '',
                title: createIconText({ text: info[0] ?? '' }),
                subtitleText: createIconText({ text: info[1] ?? '' }),
            }));
        }
        return more;
    }
    parseHomeSections($, sectionCallback) {
        const section1 = createHomeSection({ id: '1', title: 'Latest', type: paperback_extensions_common_1.HomeSectionType.singleRowNormal, view_more: true });
        const section2 = createHomeSection({ id: '2', title: 'Top Rated', type: paperback_extensions_common_1.HomeSectionType.singleRowNormal });
        const section3 = createHomeSection({ id: '3', title: 'Top Today', type: paperback_extensions_common_1.HomeSectionType.singleRowNormal });
        const latest = [];
        const topRated = [];
        const topToday = [];
        const arrLatest = $('.col-6.col-md-4.col-lg-3.px-1.mb-2.lister-layout').toArray();
        const arrTop = $('div#rTop > .list-group > li').toArray();
        const arrToday = $('#manga-owl-slider > .owl-stage-outer > .owl-stage > .owl-item').toArray();
        for (const obj of arrLatest) {
            const id = $('.overlay > a', $(obj)).attr('href')?.replace('/comic/', '').replace('/', '') ?? '';
            const info = $('.text-truncate.d-block', $(obj)).text().trim().split('\n');
            const img = $('.img-fluid', $(obj)).attr('src') ?? '';
            latest.push(createMangaTile({
                id,
                image: `${RA_DOMAIN}${img}` ?? '',
                title: createIconText({ text: info[0] ?? '' }),
                subtitleText: createIconText({ text: info[1] ?? '' }),
            }));
        }
        section1.items = latest;
        sectionCallback(section1);
        for (const obj of arrTop) {
            const id = $('.d-block', $(obj)).attr('href')?.replace('/comic/', '').replace('/', '') ?? '';
            const title = $('.d-block > img', $(obj)).attr('title') ?? '';
            const subTitle = $('.d-flex > a', $(obj)).text().trim() ?? '';
            const img = $('.d-block > img', $(obj)).attr('data-src')?.replace('.80x80_q70.jpg', '') ?? '';
            topRated.push(createMangaTile({
                id,
                image: `${RA_DOMAIN}${img}` ?? '',
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: subTitle }),
            }));
        }
        section2.items = topRated;
        sectionCallback(section2);
        for (const obj of arrToday) {
            const id = $('.overlay > a', $(obj)).attr('href')?.replace('/comic/', '').replace('/', '') ?? '';
            const info = $('.title', $(obj)).text().trim().split('\n');
            const img = $('.img-fluid', $(obj)).attr('src');
            topToday.push(createMangaTile({
                id,
                image: `${RA_DOMAIN}${img}` ?? '',
                title: createIconText({ text: info[0] ?? '' }),
                subtitleText: createIconText({ text: info[1] ?? '' }),
            }));
        }
        section3.items = topToday;
        sectionCallback(section3);
    }
}
exports.Parser = Parser;

},{"paperback-extensions-common":4}]},{},[48])(48)
});
