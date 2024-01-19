(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeColor = void 0;
var BadgeColor;
(function (BadgeColor) {
    BadgeColor["BLUE"] = "default";
    BadgeColor["GREEN"] = "success";
    BadgeColor["GREY"] = "info";
    BadgeColor["YELLOW"] = "warning";
    BadgeColor["RED"] = "danger";
})(BadgeColor = exports.BadgeColor || (exports.BadgeColor = {}));

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],5:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
/**
* @deprecated Use {@link PaperbackExtensionBase}
*/
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

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = exports.SourceIntents = void 0;
var SourceIntents;
(function (SourceIntents) {
    SourceIntents[SourceIntents["MANGA_CHAPTERS"] = 1] = "MANGA_CHAPTERS";
    SourceIntents[SourceIntents["MANGA_TRACKING"] = 2] = "MANGA_TRACKING";
    SourceIntents[SourceIntents["HOMEPAGE_SECTIONS"] = 4] = "HOMEPAGE_SECTIONS";
    SourceIntents[SourceIntents["COLLECTION_MANAGEMENT"] = 8] = "COLLECTION_MANAGEMENT";
    SourceIntents[SourceIntents["CLOUDFLARE_BYPASS_REQUIRED"] = 16] = "CLOUDFLARE_BYPASS_REQUIRED";
    SourceIntents[SourceIntents["SETTINGS_UI"] = 32] = "SETTINGS_UI";
})(SourceIntents = exports.SourceIntents || (exports.SourceIntents = {}));
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],7:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./ByteArray"), exports);
__exportStar(require("./Badge"), exports);
__exportStar(require("./interfaces"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./HomeSectionType"), exports);
__exportStar(require("./PaperbackExtensionBase"), exports);

},{"./Badge":1,"./ByteArray":2,"./HomeSectionType":3,"./PaperbackExtensionBase":4,"./Source":5,"./SourceInfo":6,"./interfaces":15}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],15:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./ChapterProviding"), exports);
__exportStar(require("./CloudflareBypassRequestProviding"), exports);
__exportStar(require("./HomePageSectionsProviding"), exports);
__exportStar(require("./MangaProgressProviding"), exports);
__exportStar(require("./MangaProviding"), exports);
__exportStar(require("./RequestManagerProviding"), exports);
__exportStar(require("./SearchResultsProviding"), exports);

},{"./ChapterProviding":8,"./CloudflareBypassRequestProviding":9,"./HomePageSectionsProviding":10,"./MangaProgressProviding":11,"./MangaProviding":12,"./RequestManagerProviding":13,"./SearchResultsProviding":14}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],60:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./DynamicUI/Exports/DUIBinding"), exports);
__exportStar(require("./DynamicUI/Exports/DUIForm"), exports);
__exportStar(require("./DynamicUI/Exports/DUIFormRow"), exports);
__exportStar(require("./DynamicUI/Exports/DUISection"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIHeader"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIInputField"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUILabel"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUILink"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIMultilineLabel"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUINavigationButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIOAuthButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISecureInputField"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISelect"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIStepper"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISwitch"), exports);
__exportStar(require("./Exports/ChapterDetails"), exports);
__exportStar(require("./Exports/Chapter"), exports);
__exportStar(require("./Exports/Cookie"), exports);
__exportStar(require("./Exports/HomeSection"), exports);
__exportStar(require("./Exports/IconText"), exports);
__exportStar(require("./Exports/MangaInfo"), exports);
__exportStar(require("./Exports/MangaProgress"), exports);
__exportStar(require("./Exports/PartialSourceManga"), exports);
__exportStar(require("./Exports/MangaUpdates"), exports);
__exportStar(require("./Exports/PBCanvas"), exports);
__exportStar(require("./Exports/PBImage"), exports);
__exportStar(require("./Exports/PagedResults"), exports);
__exportStar(require("./Exports/RawData"), exports);
__exportStar(require("./Exports/Request"), exports);
__exportStar(require("./Exports/SourceInterceptor"), exports);
__exportStar(require("./Exports/RequestManager"), exports);
__exportStar(require("./Exports/Response"), exports);
__exportStar(require("./Exports/SearchField"), exports);
__exportStar(require("./Exports/SearchRequest"), exports);
__exportStar(require("./Exports/SourceCookieStore"), exports);
__exportStar(require("./Exports/SourceManga"), exports);
__exportStar(require("./Exports/SecureStateManager"), exports);
__exportStar(require("./Exports/SourceStateManager"), exports);
__exportStar(require("./Exports/Tag"), exports);
__exportStar(require("./Exports/TagSection"), exports);
__exportStar(require("./Exports/TrackedMangaChapterReadAction"), exports);
__exportStar(require("./Exports/TrackerActionQueue"), exports);

},{"./DynamicUI/Exports/DUIBinding":17,"./DynamicUI/Exports/DUIForm":18,"./DynamicUI/Exports/DUIFormRow":19,"./DynamicUI/Exports/DUISection":20,"./DynamicUI/Rows/Exports/DUIButton":21,"./DynamicUI/Rows/Exports/DUIHeader":22,"./DynamicUI/Rows/Exports/DUIInputField":23,"./DynamicUI/Rows/Exports/DUILabel":24,"./DynamicUI/Rows/Exports/DUILink":25,"./DynamicUI/Rows/Exports/DUIMultilineLabel":26,"./DynamicUI/Rows/Exports/DUINavigationButton":27,"./DynamicUI/Rows/Exports/DUIOAuthButton":28,"./DynamicUI/Rows/Exports/DUISecureInputField":29,"./DynamicUI/Rows/Exports/DUISelect":30,"./DynamicUI/Rows/Exports/DUIStepper":31,"./DynamicUI/Rows/Exports/DUISwitch":32,"./Exports/Chapter":33,"./Exports/ChapterDetails":34,"./Exports/Cookie":35,"./Exports/HomeSection":36,"./Exports/IconText":37,"./Exports/MangaInfo":38,"./Exports/MangaProgress":39,"./Exports/MangaUpdates":40,"./Exports/PBCanvas":41,"./Exports/PBImage":42,"./Exports/PagedResults":43,"./Exports/PartialSourceManga":44,"./Exports/RawData":45,"./Exports/Request":46,"./Exports/RequestManager":47,"./Exports/Response":48,"./Exports/SearchField":49,"./Exports/SearchRequest":50,"./Exports/SecureStateManager":51,"./Exports/SourceCookieStore":52,"./Exports/SourceInterceptor":53,"./Exports/SourceManga":54,"./Exports/SourceStateManager":55,"./Exports/Tag":56,"./Exports/TagSection":57,"./Exports/TrackedMangaChapterReadAction":58,"./Exports/TrackerActionQueue":59}],61:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./generated/_exports"), exports);
__exportStar(require("./base/index"), exports);
__exportStar(require("./compat/DyamicUI"), exports);

},{"./base/index":7,"./compat/DyamicUI":16,"./generated/_exports":60}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaTube = exports.MangaTubeInfo = void 0;
const types_1 = require("@paperback/types");
const parser_1 = require("./parser");
const MT_DOMAIN = 'https://manga-tube.me/';
exports.MangaTubeInfo = {
    version: '3.0.0',
    name: 'MangaTube',
    description: 'Extension that pulls manga from MangaTube.',
    author: 'NmN',
    authorWebsite: 'http://github.com/pandeynmm',
    icon: 'icon.png',
    contentRating: types_1.ContentRating.EVERYONE,
    language: 'de',
    websiteBaseURL: MT_DOMAIN,
    sourceTags: [
        {
            text: 'GERMAN',
            type: types_1.BadgeColor.GREY,
        },
    ],
    intents: types_1.SourceIntents.MANGA_CHAPTERS | types_1.SourceIntents.HOMEPAGE_SECTIONS,
};
class MangaTube {
    constructor(cheerio) {
        this.cheerio = cheerio;
        this.parser = new parser_1.Parser();
        this.RETRIES = 5;
        this.RPS = 8;
        this.requestManager = App.createRequestManager({
            requestsPerSecond: this.RPS,
        });
        this.userAgentRandomizer = `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/78.0${Math.floor(Math.random() * 100000)}`;
    }
    getMangaShareUrl(mangaId) {
        return `${MT_DOMAIN}/series/${mangaId}`;
    }
    async getMangaDetails(mangaId) {
        const request = App.createRequest({
            url: `${MT_DOMAIN}/series/${mangaId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, this.RETRIES);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseMangaDetails($, mangaId);
    }
    async getChapters(mangaId) {
        const request = App.createRequest({
            url: `${MT_DOMAIN}/series/${mangaId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, this.RETRIES);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseChapters($, mangaId);
    }
    async getChapterDetails(mangaId, chapterId) {
        const request = App.createRequest({
            url: `${MT_DOMAIN}/series/${chapterId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, this.RETRIES);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseChapterDetails(response.data, mangaId, chapterId);
    }
    async getTags() {
        const request = App.createRequest({
            url: MT_DOMAIN,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, this.RETRIES);
        const $ = this.cheerio.load(response.data);
        return this.parser.parseTags($);
    }
    async getSearchResults(query, metadata) {
        let page = metadata?.page ?? 1;
        if (page == -1)
            return App.createPagedResults({ results: [], metadata: { page: -1 } });
        const request = App.createRequest({
            url: `${MT_DOMAIN}/ajax`,
            method: 'POST',
            headers: this.constructHeaders({
                'content-type': 'application/x-www-form-urlencoded',
            }),
            data: {
                action: 'search_query',
                'parameter[query]': query.title,
            },
        });
        const response = await this.requestManager.schedule(request, 2);
        const $ = this.cheerio.load(response.data);
        const manga = this.parser.parseSearchResults(response.data);
        page++;
        if (manga.length < 16)
            page = -1;
        return App.createPagedResults({
            results: manga,
            metadata: { page: page },
        });
    }
    async getHomePageSections(sectionCallback) {
        const request = App.createRequest({
            url: `${MT_DOMAIN}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 2);
        const $ = this.cheerio.load(response.data);
        this.parser.parseHomeSections($, sectionCallback);
    }
    async getViewMoreItems(id, metadata) {
        const page = metadata?.page ?? 1;
        const request = this.createRequestObject(id, page);
        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);
        let manga = [];
        switch (id) {
            case '1':
                manga = this.parser.parseViewMoreLatest($);
                if (page > 1)
                    manga.shift();
                break;
            case '2':
                manga = this.parser.parseViewMorePopular(response.data);
                break;
        }
        return App.createPagedResults({
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
    createRequestObject(id, page) {
        let request = App.createRequest({
            url: `${MT_DOMAIN}/?page=${page}`,
            method: 'GET',
        });
        if (id == '1')
            return request;
        request = App.createRequest({
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
        });
        return request;
    }
    constructHeaders(headers, refererPath) {
        headers = headers ?? {};
        if (this.userAgentRandomizer !== '') {
            headers['user-agent'] = this.userAgentRandomizer;
        }
        headers['referer'] = `${MT_DOMAIN}${refererPath ?? ''}`;
        return headers;
    }
}
exports.MangaTube = MangaTube;

},{"./parser":63,"@paperback/types":61}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const types_1 = require("@paperback/types");
const MW_DOMAIN = 'https://www.mangaworld.in';
class Parser {
    parseMangaDetails($, mangaId) {
        const title = $('.img-responsive').attr('alt') ?? '';
        const image = $('.img-responsive').attr('data-original') ?? '';
        const desc = $('.series-footer p').text().trim();
        let hentai = false;
        let author = '';
        let artist = '';
        let rating = 0;
        let statStr = '';
        const id_arr = [];
        const label_arr = [];
        $('.list-unstyled.genre-list').find('li').each((_, e) => {
            label_arr.push($(e).text().trim() ?? '') &&
                id_arr.push($('a', e).attr('href')?.replace('//manga-tube.me/series/search?genre=', '') ?? '');
        });
        let i = 0;
        let shift = 0;
        const items = $('.list-unstyled.series-details li').toArray();
        for (const obj of items) {
            switch (i) {
                case shift:
                    rating = Number($(obj).text().trim().replace(',', '.').slice(0, 10).trim());
                    break;
                case shift + 1:
                    author = $(obj).text().trim().replace('Autor:', '').trim();
                    if (author.toLowerCase().includes('alternative')) {
                        shift++;
                        author = $(items[i + 1])
                            .text()
                            .replace('Autor:', '')
                            .trim();
                    }
                    break;
                case shift + 2:
                    artist = $(obj).text().replace('Artist:', '').trim();
                    break;
                case shift + 7:
                    statStr = $(obj).text().trim();
                    break;
            }
            i++;
        }
        let status = 'Unknown';
        if (statStr.toLocaleLowerCase().includes('laufend')) {
            status = 'Ongoing';
        }
        else if (statStr.toLocaleLowerCase().includes('abgeschlossen')) {
            status = 'Completed';
        }
        const arrayTags = [];
        for (const j in label_arr) {
            const id = id_arr[j] ?? '';
            const label = label_arr[j] ?? '';
            if (['HENTAI'].includes(id.toUpperCase()))
                hentai = true;
            if (!id || !label)
                continue;
            arrayTags.push({ id: id, label: label });
        }
        const tagSections = [App.createTagSection({ id: '0', label: 'genres', tags: arrayTags.map((x) => App.createTag(x)) })];
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
        });
    }
    parseChapters($, mangaId) {
        const chapters = [];
        const arrChapters = $('#chapter .chapter-list li').toArray().reverse();
        let i = 1;
        for (const obj of arrChapters) {
            const id = $('a:nth-child(2)', obj).attr('href')?.replace('//manga-tube.me/series/', '') ?? '';
            const name = $('.chapter-name', obj).text().trim() ?? '';
            console.log(`name : ${name}`);
            chapters.push(App.createChapter({
                id,
                name,
                chapNum: i,
                time: new Date(Date.now()),
                langCode: 'it',
            }));
            i++;
        }
        return chapters;
    }
    parseChapterDetails(data, mangaId, id) {
        const pages = [];
        if (data === null)
            throw new Error(data);
        const start = data.match('pages: ').index + 7;
        const end = data.match('total_pages:').index - 5;
        const imgStart = data.match('img_path: ').index + 11;
        const imagePath = data.slice(imgStart, start - 13);
        const json = JSON.parse(data.slice(start, end));
        for (const obj of json) {
            const imageUrl = imagePath + obj.file_name;
            if (!imageUrl)
                continue;
            pages.push(imageUrl.trim());
        }
        return App.createChapterDetails({
            id,
            mangaId,
            pages,
        });
    }
    parseTags($) {
        const genres = [];
        let first_label = '';
        let i = 0;
        for (const item of $('.dropdown-menu.dropdown-multicol .dropdown-item').toArray()) {
            const id = $(item).attr('href')?.replace(`${MW_DOMAIN}/archive?genre=`, '') ?? '';
            const label = $(item).text().trim();
            if (i == 0)
                first_label = label;
            if (label == first_label && i > 0)
                break;
            genres.push(App.createTag({ label: label, id: id }));
            i++;
        }
        return [App.createTagSection({ id: '0', label: 'Genre', tags: genres })];
    }
    parseSearchResults(data) {
        const jsonData = JSON.parse(data);
        const results = [];
        for (const item of jsonData['suggestions']) {
            const id = item['manga_slug'] ?? '';
            const title = item['value'] ?? '';
            const image = item['covers'][0]['img_name'] ?? '';
            results.push(App.createPartialSourceManga({
                image,
                title: title,
                mangaId: id,
                subtitle: undefined,
            }));
        }
        return results;
    }
    parseHomeSections($, sectionCallback) {
        const section1 = App.createHomeSection({
            id: '1',
            title: 'Serien Updates',
            containsMoreItems: true,
            type: types_1.HomeSectionType.singleRowNormal,
        });
        const section2 = App.createHomeSection({
            id: '2',
            title: 'Beliebte Serien',
            containsMoreItems: true,
            type: types_1.HomeSectionType.singleRowNormal,
        });
        const latestManga = [];
        const popularManga = [];
        const arrLatest = $('.panel-body .row .series-update-wraper').toArray();
        const arrPopular = $('#series-highlight-popular a').toArray();
        for (const obj of arrLatest) {
            const id = $('a', obj).attr('href')?.replace('//manga-tube.me/series/', '').slice(0, -1) ?? '';
            const title = $('.series-name', obj).text().trim() ?? '';
            const image = $('a img', obj).attr('data-original')?.replace('min', 'max') ?? '';
            const subtitle = $('.list-unstyled', obj).text().trim().split('\n')[0] ?? '';
            latestManga.push(App.createPartialSourceManga({
                image,
                title: title,
                mangaId: id,
                subtitle: subtitle,
            }));
        }
        section1.items = latestManga;
        sectionCallback(section1);
        for (const obj of arrPopular) {
            const id = $(obj).attr('href')?.replace('//manga-tube.me/series/', '') ?? '';
            const title = $(obj).text().trim() ?? '';
            const image = $('img', obj).attr('src') ?? '';
            popularManga.push(App.createPartialSourceManga({
                image,
                title: title,
                mangaId: id,
                subtitle: undefined,
            }));
        }
        section2.items = popularManga;
        sectionCallback(section2);
    }
    parseViewMoreLatest($) {
        const more = [];
        const arrLatest = $('.panel-body .row .series-update-wraper').toArray();
        for (const obj of arrLatest) {
            const id = $('a', obj).attr('href')?.replace('//manga-tube.me/series/', '').slice(0, -1) ?? '';
            const title = $('.series-name', obj).text().trim() ?? '';
            const image = $('a img', obj).attr('data-original')?.replace('min', 'max') ?? '';
            const subtitle = $('.list-unstyled', obj).text().trim().split('\n')[0] ?? '';
            more.push(App.createPartialSourceManga({
                image,
                title: title,
                mangaId: id,
                subtitle: subtitle,
            }));
        }
        return more;
    }
    parseViewMorePopular(data) {
        const more = [];
        const jsonData = JSON.parse(data);
        for (const item of jsonData['success']) {
            const id = item['manga_slug'] ?? '';
            const title = item['manga_title'] ?? '';
            const image = item['covers'][0]['img_name'] ?? '';
            more.push(App.createPartialSourceManga({
                image,
                title: title,
                mangaId: id,
                subtitle: undefined,
            }));
        }
        return more;
    }
}
exports.Parser = Parser;

},{"@paperback/types":61}]},{},[62])(62)
});
