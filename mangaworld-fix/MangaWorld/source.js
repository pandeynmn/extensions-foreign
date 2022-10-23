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
exports.MangaWorld = exports.MangaWorldInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const parser_1 = require("./parser");
const helper_1 = require("./helper");
const MW_DOMAIN = 'https://www.mangaworld.so';
exports.MangaWorldInfo = {
    version: '2.0.2',
    name: 'MangaWorld',
    description: 'Extension that pulls manga from MangaWorld.',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandeynmm',
    icon: 'icon.png',
    contentRating: paperback_extensions_common_1.ContentRating.EVERYONE,
    language: paperback_extensions_common_1.LanguageCode.ITALIAN,
    websiteBaseURL: MW_DOMAIN,
    sourceTags: [
        {
            text: 'New',
            type: paperback_extensions_common_1.TagType.GREEN,
        },
        {
            text: 'ITALIAN',
            type: paperback_extensions_common_1.TagType.GREY,
        },
    ],
};
class MangaWorld extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.baseUrl = MW_DOMAIN;
        this.RETRIES = 5;
        this.requestManager = createRequestManager({
            requestsPerSecond: 3,
        });
        this.parser = new parser_1.Parser();
    }
    getMangaShareUrl(mangaId) {
        return `${this.baseUrl}/manga/${mangaId}`;
    }
    async getMangaDetails(mangaId) {
        const request = createRequestObject({
            url: `${this.baseUrl}/manga/${mangaId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, this.RETRIES);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseMangaDetails($, mangaId);
    }
    async getChapters(mangaId) {
        const request = createRequestObject({
            url: `${this.baseUrl}/manga/${mangaId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, this.RETRIES);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseChapters($, mangaId, this);
    }
    async getChapterDetails(mangaId, chapterId) {
        const request = createRequestObject({
            url: `${this.baseUrl}/manga/${mangaId}/read/${chapterId}/?style=list`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, this.RETRIES);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseChapterDetails($, mangaId, chapterId);
    }
    async getTags() {
        const request = createRequestObject({
            url: this.baseUrl,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, this.RETRIES);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseTags($, this.baseUrl);
    }
    async getSearchResults(query, metadata) {
        let page = metadata?.page ?? 1;
        if (page == -1)
            return createPagedResults({ results: [], metadata: { page: -1 } });
        const request = this.constructSearchRequest(page, query);
        const data = await this.requestManager.schedule(request, this.RETRIES);
        const $ = this.cheerio.load(data.data);
        const manga = this.parser.parseSearchResults($);
        page++;
        if (manga.length < 16)
            page = -1;
        return createPagedResults({
            results: manga,
            metadata: { page: page },
        });
    }
    async getHomePageSections(sectionCallback) {
        const request = createRequestObject({
            url: `${this.baseUrl}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, this.RETRIES);
        const $ = this.cheerio.load(response.data);
        this.parser.parseHomeSections($, sectionCallback);
    }
    async getViewMoreItems(_, metadata) {
        const page = metadata?.page ?? 1;
        const request = createRequestObject({
            url: `${this.baseUrl}/?page=${page}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, this.RETRIES);
        const $ = this.cheerio.load(response.data);
        const manga = this.parser.parseViewMore($);
        return createPagedResults({
            results: manga,
            metadata: { page: page + 1 },
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
    constructSearchRequest(page, query) {
        const request = createRequestObject({
            url: new helper_1.URLBuilder(this.baseUrl)
                .addPathComponent('archive')
                .addQueryParameter('keyword', encodeURIComponent(query?.title ?? ''))
                .addQueryParameter('genre', query?.includedTags?.map((x) => x.id))
                .addQueryParameter('sort', 'most_read')
                .addQueryParameter('page', page.toString())
                .buildUrl({ addTrailingSlash: true, includeUndefinedParameters: false }),
            method: 'GET',
        });
        return request;
    }
}
exports.MangaWorld = MangaWorld;

},{"./helper":49,"./parser":50,"paperback-extensions-common":4}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLBuilder = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
class URLBuilder {
    constructor(baseUrl) {
        this.parameters = {};
        this.pathComponents = [];
        this.baseUrl = baseUrl.replace(/(^\/)?(?=.*)(\/$)?/gim, '');
    }
    addPathComponent(component) {
        this.pathComponents.push(component.replace(/(^\/)?(?=.*)(\/$)?/gim, ''));
        return this;
    }
    addQueryParameter(key, value) {
        this.parameters[key] = value;
        return this;
    }
    buildUrl({ addTrailingSlash, includeUndefinedParameters } = { addTrailingSlash: false, includeUndefinedParameters: false }) {
        let finalUrl = this.baseUrl + '/';
        finalUrl += this.pathComponents.join('/');
        finalUrl += addTrailingSlash ? '/' : '';
        finalUrl += Object.values(this.parameters).length > 0 ? '?' : '';
        finalUrl += Object.entries(this.parameters).map(entry => {
            if (entry[1] == null && !includeUndefinedParameters) {
                return undefined;
            }
            if (Array.isArray(entry[1])) {
                return entry[1].map(value => value || includeUndefinedParameters ? `${entry[0]}=${value}` : undefined)
                    .filter(x => x !== undefined)
                    .join('&');
            }
            if (typeof entry[1] === 'object') {
                return Object.keys(entry[1]).map(key => `${entry[0]}[${key}]=${entry[1][key]}`)
                    .join('&');
            }
            return `${entry[0]}=${entry[1]}`;
        }).filter(x => x !== undefined).join('&');
        return finalUrl;
    }
}
exports.URLBuilder = URLBuilder;

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
class Parser {
    parseMangaDetails($, mangaId) {
        const title = $('.name.bigger').text().trim() ?? '';
        const image = $('.thumb.mb-3.text-center img').attr('src') ?? '';
        const desc = $('#noidungm').text().trim() ?? '';
        let hentai = false;
        let author = '';
        let artist = '';
        const id_arr = [];
        const label_arr = [];
        let i = 0;
        for (const obj of $('.meta-data.row.px-1 .col-12').toArray()) {
            switch (i) {
                case 1:
                    $(obj)
                        .find('a')
                        .each((_, e) => {
                        label_arr.push($(e).text()) &
                            id_arr.push($(e).attr('href')?.replace('https://www.mangaworld.in/archive?genre=', '') ?? '');
                    });
                    break;
                case 2:
                    author = $(obj).text().trim().replace('Autore: ', '');
                    break;
                case 3:
                    artist = $(obj).text().trim().replace('Artista: ', '');
                    break;
            }
            i++;
        }
        const status = paperback_extensions_common_1.MangaStatus.ONGOING;
        const arrayTags = [];
        for (const j in label_arr) {
            const id = id_arr[j] ?? '';
            const label = label_arr[j] ?? '';
            if (['ADULTI', 'SMUT', 'MATURO', 'HENTAI'].includes(id.toUpperCase()))
                hentai = true;
            if (!id || !label)
                continue;
            arrayTags.push({ id: id, label: label });
        }
        const tagSections = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map((x) => createTag(x)) })];
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
        });
    }
    parseChapters($, mangaId, source) {
        const chapters = [];
        const arrChapters = $('.chapter').toArray().reverse();
        for (const item of arrChapters) {
            const id = $('a', item).attr('href')?.replace(`${source.baseUrl}/manga/${mangaId}/read/`, '') ?? '';
            const name = $('a', item).attr('title') ?? '';
            const chapNum = Number($('.d-inline-block', item).text().split(' ')[1]) ?? -1;
            // const time = source.convertTime($('.col3 > a', $(item)).text().split(' ')[0]) ?? ''
            chapters.push(createChapter({
                id,
                mangaId,
                name,
                chapNum,
                time: new Date(Date.now()),
                langCode: paperback_extensions_common_1.LanguageCode.ITALIAN,
            }));
        }
        return chapters;
    }
    parseChapterDetails($, mangaId, id) {
        const pages = [];
        for (const item of $('.col-12.text-center.position-relative img').toArray()) {
            const imageUrl = $(item).attr('src');
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
    parseTags($, baseUrl) {
        const genres = [];
        let first_label = '';
        let i = 0;
        for (const item of $('.dropdown-menu.dropdown-multicol .dropdown-item').toArray()) {
            const id = $(item).attr('href')?.replace(`${baseUrl}/archive?genre=`, '') ?? '';
            const label = $(item).text().trim();
            if (i == 0)
                first_label = label;
            if (label == first_label && i > 0)
                break;
            genres.push(createTag({ label: label, id: id }));
            i++;
        }
        return [createTagSection({ id: '0', label: 'Generi', tags: genres })];
    }
    parseSearchResults($) {
        const results = [];
        for (const item of $('.comics-grid .entry').toArray()) {
            const id = (($('a', item).attr('href') ?? '').match(/[0-9]+\/[a-zA-Z0-9\-]+/i) ?? ['null'])[0] ?? '';
            const title = $('a', item).attr('title') ?? '';
            const image = $('a img', item).attr('src') ?? '';
            results.push(createMangaTile({
                id,
                image,
                title: createIconText({ text: title }),
            }));
        }
        return results;
    }
    parseHomeSections($, sectionCallback) {
        const section1 = createHomeSection({ id: '1', title: 'Ultimi capitoli aggiunti', type: paperback_extensions_common_1.HomeSectionType.singleRowNormal, view_more: true });
        const section2 = createHomeSection({ id: '2', title: 'Manga del mese', type: paperback_extensions_common_1.HomeSectionType.singleRowNormal, });
        const section3 = createHomeSection({ id: '3', title: 'Capitoli di tendenza', type: paperback_extensions_common_1.HomeSectionType.singleRowNormal, });
        const latestManga = [];
        const hotTitles = [];
        const trending = [];
        const arrLatest = $('.col-sm-12.col-md-8.col-xl-9 .comics-grid .entry').toArray();
        const arrHotTitle = $('.col-12 .top-wrapper .entry').toArray();
        const arrTrending = $('.entry.vertical').toArray();
        for (const obj of arrLatest) {
            const id = (($('a', obj).attr('href') ?? '').match(/[0-9]+\/[a-zA-Z0-9\-]+/i) ?? ['null'])[0] ?? '';
            const title = $('a', obj).attr('title') ?? '';
            const image = $('a img', obj).attr('src') ?? '';
            const sub = $('.d-flex.flex-wrap.flex-row a', obj).first().attr('title') ?? '';
            latestManga.push(createMangaTile({
                id,
                image,
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: sub }),
            }));
        }
        section1.items = latestManga;
        sectionCallback(section1);
        let i = 0;
        for (const obj of arrHotTitle) {
            const id = (($('a', obj).attr('href') ?? '').match(/[0-9]+\/[a-zA-Z0-9\-]+/i) ?? ['null'])[0] ?? '';
            const image = $('.img-fluid', obj).attr('src') ?? '';
            const title = $('.name', obj).text().trim();
            if (i == 10)
                break;
            i++;
            hotTitles.push(createMangaTile({
                id,
                image,
                title: createIconText({ text: title }),
            }));
        }
        section2.items = hotTitles;
        sectionCallback(section2);
        for (const obj of arrTrending) {
            const id = (($('a', obj).attr('href') ?? '').match(/[0-9]+\/[a-zA-Z0-9\-]+/i) ?? ['null'])[0] ?? '';
            const image = $('a img', obj).attr('src') ?? '';
            const title = $('.manga-title', obj).text().trim();
            trending.push(createMangaTile({
                id,
                image,
                title: createIconText({ text: title }),
            }));
        }
        section3.items = trending;
        sectionCallback(section3);
    }
    parseViewMore($) {
        const more = [];
        const arrLatest = $('.col-sm-12.col-md-8.col-xl-9 .comics-grid .entry').toArray();
        for (const obj of arrLatest) {
            const id = (($('a', obj).attr('href') ?? '').match(/[0-9]+\/[a-zA-Z0-9\-]+/i) ?? ['null'])[0] ?? '';
            const title = $('a', obj).attr('title') ?? '';
            const image = $('a img', obj).attr('src') ?? '';
            const sub = $('.d-flex.flex-wrap.flex-row a', obj).first().attr('title') ?? '';
            more.push(createMangaTile({
                id,
                image,
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: sub }),
            }));
        }
        return more;
    }
}
exports.Parser = Parser;

},{"paperback-extensions-common":4}]},{},[48])(48)
});
