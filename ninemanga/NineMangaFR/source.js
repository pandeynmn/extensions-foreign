(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    getTags() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return (_a = this.getSearchTags) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    var _a;
    let time;
    let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
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

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":2,"./Tracker":3}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./APIWrapper"), exports);

},{"./APIWrapper":1,"./base":4,"./models":47}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],8:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],9:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],10:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],11:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],14:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],15:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],16:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],17:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],21:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],24:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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

},{"./Button":9,"./Form":10,"./FormRow":11,"./Header":12,"./InputField":13,"./Label":14,"./Link":15,"./MultilineLabel":16,"./NavigationButton":17,"./OAuthButton":18,"./Section":19,"./Select":20,"./Stepper":21,"./Switch":22,"./WebViewButton":23}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],29:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],30:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],31:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],32:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],33:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],34:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],35:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],36:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],37:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],38:[function(require,module,exports){
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
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],41:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],42:[function(require,module,exports){
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
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],44:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],45:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],46:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./HomeSection"), exports);
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
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);

},{"./Chapter":6,"./ChapterDetails":7,"./Constants":8,"./DynamicUI":24,"./HomeSection":25,"./Languages":26,"./Manga":27,"./MangaTile":28,"./MangaUpdate":29,"./PagedResults":30,"./RawData":31,"./RequestHeaders":32,"./RequestInterceptor":33,"./RequestManager":34,"./RequestObject":35,"./ResponseObject":36,"./SearchField":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NineManga = exports.getExportVersion = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const helper_1 = require("./helper");
const NineMangaParser_1 = require("./NineMangaParser");
const BASE_VERSION = '2.0.1';
const getExportVersion = (EXTENSION_VERSION) => {
    return BASE_VERSION.split('.')
        .map((x, index) => Number(x) + Number(EXTENSION_VERSION.split('.')[index]))
        .join('.');
};
exports.getExportVersion = getExportVersion;
class NineManga extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.userAgentRandomizer = `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/78.0${Math.floor(Math.random() * 100000)}`;
        this.requestManager = createRequestManager({
            requestsPerSecond: 3,
        });
        this.alternativeChapterUrl = false;
        this.parser = new NineMangaParser_1.Parser();
    }
    getMangaShareUrl(mangaId) {
        return `${this.baseUrl}/manga/${mangaId}?waring=1`;
    }
    supportsTagExclusion() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = this.createRequest(`${this.baseUrl}/manga/${mangaId}?waring=1`);
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return this.parser.parseMangaDetails($, mangaId, this);
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = this.createRequest(`${this.baseUrl}/manga/${mangaId}?waring=1`);
            const response = yield this.requestManager.schedule(request, 3);
            const $ = this.cheerio.load(response.data);
            return this.parser.parseChapters($, mangaId, this);
        });
    }
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${chapterId}-10-1`,
                method: 'GET',
                headers: this.constructHeaders({}),
            });
            const response = yield this.requestManager.schedule(request, 3);
            const $ = this.cheerio.load(response.data);
            // throw new Error(`${chapterId}-10-1 ${$.html().toString().substring(0, 500)}`)
            return this.parser.parseChapterDetails($, mangaId, chapterId, this);
        });
    }
    getSearchResults(query, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 1;
            if (page == -1)
                return createPagedResults({ results: [], metadata: { page: -1 } });
            const request = this.constructSearchRequest(page, query);
            const data = yield this.requestManager.schedule(request, 2);
            const $ = this.cheerio.load(data.data);
            const manga = this.parser.parseSearchResults($, this);
            page++;
            if (manga.length < 30)
                page = -1;
            return createPagedResults({
                results: manga,
                metadata: { page: page },
            });
        });
    }
    getTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = this.createRequest(`${this.baseUrl}/search`);
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return this.parser.parseTags($);
        });
    }
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = this.createRequest(`${this.baseUrl}`);
            let response = yield this.requestManager.schedule(request, 2);
            const $ = this.cheerio.load(response.data);
            request = this.createRequest(`${this.baseUrl}/list/New-Update/`);
            response = yield this.requestManager.schedule(request, 2);
            const $$ = this.cheerio.load(response.data);
            yield this.parser.parseHomeSections($, $$, sectionCallback, this);
        });
    }
    filterUpdatedManga(mangaUpdatesFoundCallback, time, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = this.createRequest(this.baseUrl);
            const data = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(data.data);
            const updatedManga = this.parser.filterUpdatedManga($, time, ids, this);
            if (updatedManga.length > 0) {
                mangaUpdatesFoundCallback(createMangaUpdates({
                    ids: updatedManga,
                }));
            }
        });
    }
    /**
     * Parses a time string from a Madara source into a Date object.
     * Copied from Madara.ts made by gamefuzzy
     */
    convertTime(timeAgo) {
        var _a;
        let time;
        let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
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
    createRequest(url) {
        return createRequestObject({
            url,
            method: 'GET',
            headers: this.constructHeaders({}),
        });
    }
    constructSearchRequest(page, query) {
        var _a, _b, _c;
        return createRequestObject({
            url: new helper_1.URLBuilder(this.baseUrl)
                .addPathComponent('search')
                .addQueryParameter('name_sel', 'contain')
                .addQueryParameter('wd', encodeURIComponent((_a = query === null || query === void 0 ? void 0 : query.title) !== null && _a !== void 0 ? _a : ''))
                .addQueryParameter('completed_series', 'either')
                .addQueryParameter('category_id', (_b = query === null || query === void 0 ? void 0 : query.includedTags) === null || _b === void 0 ? void 0 : _b.map((x) => x.id))
                .addQueryParameter('out_category_id', (_c = query === null || query === void 0 ? void 0 : query.excludedTags) === null || _c === void 0 ? void 0 : _c.map((x) => x.id))
                .addQueryParameter('type', 'high')
                .addQueryParameter('page', page.toString())
                .buildUrl({ addTrailingSlash: true, includeUndefinedParameters: false }),
            method: 'GET',
        });
    }
    constructHeaders(headers, refererPath) {
        headers = headers !== null && headers !== void 0 ? headers : {};
        if (this.userAgentRandomizer !== '') {
            headers['user-agent'] = this.userAgentRandomizer;
        }
        headers['accept-language'] = 'es-ES,es;q=0.9,en;q=0.8,gl;q=0.7';
        return headers;
    }
    parseStatus(str) {
        let status = paperback_extensions_common_1.MangaStatus.UNKNOWN;
        switch (str.toLowerCase()) {
            case 'ongoing':
                status = paperback_extensions_common_1.MangaStatus.ONGOING;
                break;
            case 'completed':
                status = paperback_extensions_common_1.MangaStatus.COMPLETED;
                break;
        }
        return status;
    }
}
exports.NineManga = NineManga;

},{"./NineMangaParser":50,"./helper":51,"paperback-extensions-common":5}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NineMangaFR = exports.NineMangaFRInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const NineManga_1 = require("../NineManga");
const FR_DOMAIN = 'https://fr.ninemanga.com';
exports.NineMangaFRInfo = {
    version: NineManga_1.getExportVersion('0.0.0'),
    name: 'NineMangaFR',
    description: 'Extension that pulls manga from fr.ninemanga.com',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandyenmn',
    icon: 'icon.png',
    contentRating: paperback_extensions_common_1.ContentRating.EVERYONE,
    language: paperback_extensions_common_1.LanguageCode.FRENCH,
    websiteBaseURL: FR_DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: paperback_extensions_common_1.TagType.GREEN
        },
        {
            text: 'French',
            type: paperback_extensions_common_1.TagType.GREY
        }
    ]
};
class NineMangaFR extends NineManga_1.NineManga {
    constructor() {
        super(...arguments);
        this.baseUrl = FR_DOMAIN;
        this.languageCode = paperback_extensions_common_1.LanguageCode.ITALIAN;
        this.genreTag = 'Genre(s)';
        this.authorTag = 'Auteur(s)';
        this.statusTag = 'Statut';
    }
    parseStatus(str) {
        let status = paperback_extensions_common_1.MangaStatus.UNKNOWN;
        switch (str.toLowerCase()) {
            case 'en cours':
                status = paperback_extensions_common_1.MangaStatus.ONGOING;
                break;
            case 'complété':
                status = paperback_extensions_common_1.MangaStatus.COMPLETED;
                break;
        }
        return status;
    }
    convertTime(timeAgo) {
        var _a;
        let time;
        let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
        trimmed = trimmed == 0 && timeAgo.includes('a') ? 1 : trimmed;
        if (timeAgo.includes('mins') || timeAgo.includes('minutes') || timeAgo.includes('minute')) {
            time = new Date(Date.now() - trimmed * 60000);
        }
        else if (timeAgo.includes('heures') || timeAgo.includes('heure')) {
            time = new Date(Date.now() - trimmed * 3600000);
        }
        else {
            time = new Date(timeAgo);
        }
        return time;
    }
}
exports.NineMangaFR = NineMangaFR;

},{"../NineManga":48,"paperback-extensions-common":5}],50:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const paperback_extensions_common_1 = require("paperback-extensions-common");
class Parser {
    parseMangaDetails($, mangaId, source) {
        var _a, _b, _c, _d, _e, _f;
        const title = (_a = $('.bookface img').attr('alt')) !== null && _a !== void 0 ? _a : '';
        const image = (_b = $('.bookface img').attr('src')) !== null && _b !== void 0 ? _b : 'https://paperback.moe/icons/logo-alt.svg';
        let desc = (_c = $('.bookintro p').text().trim().replace('Summary:', '')) !== null && _c !== void 0 ? _c : '';
        if (desc == '')
            desc = `No Decscription provided by the source(${source.baseUrl})`;
        let author = '';
        let status_str = '';
        let hentai = false;
        const arrayTags = [];
        const info = $('.message li').toArray();
        for (const obj of info) {
            const item = $('b', obj).text().trim().replace(':', '');
            switch (item) {
                case source.genreTag:
                    for (const e of $('a', obj).toArray()) {
                        const id = (_e = (_d = $(e).attr('href')) === null || _d === void 0 ? void 0 : _d.replace('/category/', '').replace('.html', '')) !== null && _e !== void 0 ? _e : '';
                        const label = (_f = $(e).text().trim()) !== null && _f !== void 0 ? _f : '';
                        if (['ADULT', 'SMUT', 'MATURE'].includes(id.toUpperCase()))
                            hentai = true;
                        if (!id || !label)
                            continue;
                        arrayTags.push({ id: id, label: label });
                    }
                    break;
                case source.authorTag:
                    author = $('a', obj).text().trim();
                    break;
                case source.statusTag:
                    status_str = $('a', obj).first().text().trim();
                    break;
            }
        }
        const tagSections = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map((x) => createTag(x)) })];
        const status = source.parseStatus(status_str);
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
        });
    }
    parseChapters($, mangaId, source) {
        var _a, _b, _c;
        const chapters = [];
        let prevChapNum = 1;
        const arrChapters = $('.sub_vol_ul li').toArray().reverse();
        for (const obj of arrChapters) {
            const id = (_b = (_a = $('a', obj).attr('href')) === null || _a === void 0 ? void 0 : _a.replace('.html', '').replace(/\/$/, '')) !== null && _b !== void 0 ? _b : '';
            const name = (_c = $('a', obj).attr('title')) !== null && _c !== void 0 ? _c : '';
            const chapNum = prevChapNum++;
            const time = source.convertTime($('span', obj).text().trim());
            chapters.push(createChapter({
                id,
                mangaId,
                name,
                chapNum,
                time,
                langCode: paperback_extensions_common_1.LanguageCode.JAPANESE,
            }));
        }
        return chapters;
    }
    parseChapterDetails($, mangaId, id, source) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const pages = [];
            const pageArr = $('select#page option').toArray();
            let end = '';
            let i = 0;
            for (const obj of pageArr) {
                const page = (_a = $(obj).attr('value')) !== null && _a !== void 0 ? _a : '';
                if (i == 0)
                    end = page;
                if (i > 0 && page == end)
                    break;
                const imagesArray = yield this.getImage(`${source.baseUrl}${page}`, source);
                for (const image of imagesArray)
                    pages.push(image);
                i++;
            }
            return createChapterDetails({
                id,
                mangaId,
                pages,
                longStrip: true,
            });
        });
    }
    parseSearchResults($, source) {
        var _a, _b, _c, _d, _e;
        const results = [];
        for (const obj of $('.direlist .bookinfo').toArray()) {
            const id = (_b = (_a = $('.bookname', obj).attr('href')) === null || _a === void 0 ? void 0 : _a.replace(`${source.baseUrl}/manga/`, '').replace('.html', '')) !== null && _b !== void 0 ? _b : '';
            const title = (_c = $('.bookname', obj).text().trim()) !== null && _c !== void 0 ? _c : '';
            const subTitle = (_d = $('.chaptername', obj).text().trim().replace(title, '').trim()) !== null && _d !== void 0 ? _d : '';
            const image = (_e = $('dt img', obj).attr('src')) !== null && _e !== void 0 ? _e : '';
            results.push(createMangaTile({
                id,
                image,
                title: createIconText({ text: title }),
                subtitleText: createIconText({ text: subTitle }),
            }));
        }
        return results;
    }
    parseTags($) {
        var _a;
        const genres = [];
        for (const obj of $('div.typelist li.cate_list').toArray()) {
            const id = $(obj).attr('cate_id');
            const label = (_a = $(obj).text().trim()) !== null && _a !== void 0 ? _a : '';
            if (!id || !label)
                continue;
            genres.push(createTag({ label, id }));
        }
        return [createTagSection({ id: '0', label: 'genres', tags: genres })];
    }
    parseHomeSections($, $$, sectionCallback, source) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        return __awaiter(this, void 0, void 0, function* () {
            const section1 = createHomeSection({ id: '1', title: 'Latest Manga', type: paperback_extensions_common_1.HomeSectionType.singleRowNormal, });
            const section2 = createHomeSection({ id: '2', title: 'Popular', type: paperback_extensions_common_1.HomeSectionType.singleRowNormal, });
            const section3 = createHomeSection({ id: '3', title: 'Hot Manga', type: paperback_extensions_common_1.HomeSectionType.singleRowNormal, });
            const section4 = createHomeSection({ id: '4', title: 'New Manga', type: paperback_extensions_common_1.HomeSectionType.singleRowNormal, });
            const popular = [];
            const hot = [];
            const latest = [];
            const newManga = [];
            const arrLatest = $$('.direlist .bookinfo').toArray();
            const arrPopular = $('.pop_update li').toArray();
            const arrHot = $('.rightbox ul:nth-child(3) li dl').toArray();
            const arrNew = $('.rightbox ul:nth-child(6) li dl').toArray();
            for (const obj of arrLatest) {
                const id = (_b = (_a = $$('.bookname', obj).attr('href')) === null || _a === void 0 ? void 0 : _a.replace(`${source.baseUrl}/manga/`, '').replace('.html', '')) !== null && _b !== void 0 ? _b : '';
                const title = (_c = $$('.bookname', obj).text().trim()) !== null && _c !== void 0 ? _c : '';
                const subTitle = (_d = $$('.chaptername', obj).text().trim().toUpperCase().replace(title.toUpperCase(), '').trim()) !== null && _d !== void 0 ? _d : '';
                const image = (_e = $$('dt img', obj).attr('src')) !== null && _e !== void 0 ? _e : '';
                latest.push(createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                    subtitleText: createIconText({ text: subTitle }),
                }));
            }
            section1.items = latest;
            sectionCallback(section1);
            for (const obj of arrPopular) {
                const id = (_g = (_f = $('a', obj).attr('href')) === null || _f === void 0 ? void 0 : _f.replace(`${source.baseUrl}/manga/`, '').replace('.html', '')) !== null && _g !== void 0 ? _g : '';
                const title = (_h = $('a', obj).attr('title')) !== null && _h !== void 0 ? _h : '';
                const image = (_j = $('img', obj).attr('src')) !== null && _j !== void 0 ? _j : '';
                popular.push(createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                }));
            }
            section2.items = popular;
            sectionCallback(section2);
            for (const obj of arrHot) {
                const id = (_l = (_k = $('a', obj).attr('href')) === null || _k === void 0 ? void 0 : _k.replace(`${source.baseUrl}/manga/`, '').replace('.html', '')) !== null && _l !== void 0 ? _l : '';
                const title = (_m = $('img', obj).attr('alt')) !== null && _m !== void 0 ? _m : '';
                const image = (_o = $('img', obj).attr('src')) !== null && _o !== void 0 ? _o : '';
                hot.push(createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                }));
            }
            section3.items = hot;
            sectionCallback(section3);
            for (const obj of arrNew) {
                const id = (_q = (_p = $('a', obj).attr('href')) === null || _p === void 0 ? void 0 : _p.replace(`${source.baseUrl}/manga/`, '').replace('.html', '')) !== null && _q !== void 0 ? _q : '';
                const title = (_r = $('img', obj).attr('alt')) !== null && _r !== void 0 ? _r : '';
                const image = (_s = $('img', obj).attr('src')) !== null && _s !== void 0 ? _s : '';
                newManga.push(createMangaTile({
                    id,
                    image,
                    title: createIconText({ text: title }),
                }));
            }
            section4.items = newManga;
            sectionCallback(section4);
        });
    }
    filterUpdatedManga($, time, ids, source) {
        var _a, _b, _c;
        let passedReferenceTimePrior = false;
        let passedReferenceTimeCurrent = false;
        const updatedManga = [];
        for (const obj of $('.homeupdate li').toArray()) {
            const id = (_b = (_a = $('a', obj).attr('href')) === null || _a === void 0 ? void 0 : _a.replace(`${source.baseUrl}/manga/`, '').replace('.html', '')) !== null && _b !== void 0 ? _b : '';
            let mangaTime;
            const timeSelector = (_c = $('dd', obj).text().trim()) !== null && _c !== void 0 ? _c : '';
            // eslint-disable-next-line prefer-const
            mangaTime = source.convertTime(timeSelector !== null && timeSelector !== void 0 ? timeSelector : '');
            // Check if the date is valid, if it isn't we should skip it
            if (!mangaTime.getTime())
                continue;
            passedReferenceTimeCurrent = mangaTime <= time;
            if (!passedReferenceTimeCurrent || !passedReferenceTimePrior) {
                if (ids.includes(id)) {
                    updatedManga.push(id);
                }
            }
            else
                break;
            if (typeof id === 'undefined') {
                throw new Error(`Failed to parse homepage sections for ${source.baseUrl}/${source.homePage}/`);
            }
            passedReferenceTimePrior = passedReferenceTimeCurrent;
        }
        return updatedManga;
    }
    getImage(url, source) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const request = source.createRequest(url);
            const response = yield source.requestManager.schedule(request, 3);
            const $ = source.cheerio.load(response.data);
            const arrImages = [];
            const img = $('div.pic_box img.manga_pic').toArray();
            for (const obj of img) {
                const i = (_a = $(obj).attr('src')) !== null && _a !== void 0 ? _a : '';
                arrImages.push(i);
            }
            return arrImages;
        });
    }
}
exports.Parser = Parser;

},{"paperback-extensions-common":5}],51:[function(require,module,exports){
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
                return `${entry[0]}=` + entry[1].map(value => value || includeUndefinedParameters ? `${value},` : undefined)
                    .filter(x => x !== undefined)
                    .join('');
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

},{}]},{},[49])(49)
});
