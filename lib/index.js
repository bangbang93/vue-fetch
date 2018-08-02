/**
 * Created by bangbang93 on 2016/12/9.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require("debug");
var _URLSearchParams;
if (typeof URLSearchParams === 'undefined') {
    _URLSearchParams = require('url').URLSearchParams;
}
else {
    _URLSearchParams = URLSearchParams;
}
var debug = Debug('vue-fetch');
var VueFetch = function VueFetch(opts) {
    if (opts === void 0) { opts = {}; }
    var _fetch = opts.fetch || (typeof window !== 'undefined' && window.fetch)
        || (typeof global !== 'undefined' && global['fetch']);
    var _Headers = opts.Headers || (typeof window !== 'undefined' && window['Headers'])
        || (typeof global !== 'undefined' && global['Headers']);
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
        _fetch = require('node-fetch');
        _Headers = _fetch.Headers;
    }
    var createHeaders = opts.createHeaders || function (obj) {
        if (obj.hasOwnProperty('content-type') && !obj['content-type']) {
            delete obj['content-type'];
        }
        return new _Headers(obj);
    };
    opts.defaultHeaders = opts.defaultHeaders || {};
    debug('config', {
        opts: opts,
        fetch: _fetch,
        createHeaders: createHeaders,
    });
    function doFetch(_a) {
        var method = _a.method, url = _a.url, query = _a.query, body = _a.body, _b = _a.headers, headers = _b === void 0 ? {} : _b, _c = _a.credentials, credentials = _c === void 0 ? 'include' : _c;
        headers = Object.assign(opts.defaultHeaders, headers);
        if (query) {
            if (typeof query !== 'string') {
                query = objToSearch(query);
            }
            url = url + "?" + query;
        }
        var request = {
            method: method.toUpperCase(),
            credentials: credentials,
            body: null,
            headers: null,
        };
        if (body) {
            var _d = processBody(body), contentType = _d.contentType, _body = _d.body;
            if (contentType) {
                headers = Object.assign(headers, {
                    'content-type': contentType,
                });
            }
            request.body = _body;
        }
        request.headers = createHeaders(headers);
        debug('fetch', {
            url: url,
            request: request,
        });
        return _fetch(url, request);
    }
    return {
        get: function (url, query) {
            return doFetch({ method: 'get', url: url, query: query });
        },
        post: function (url, body, query) {
            return doFetch({ method: 'post', url: url, query: query, body: body });
        },
        put: function (url, body, query) {
            return doFetch({ method: 'put', url: url, body: body, query: query });
        },
        patch: function (url, body, query) {
            return doFetch({ method: 'patch', url: url, body: body, query: query });
        },
        del: function (url, query) {
            return doFetch({ method: 'delete', url: url, query: query });
        },
        fetch: function (_a) {
            var method = _a.method, url = _a.url, query = _a.query, body = _a.body, headers = _a.headers;
            if (arguments.length !== 1) {
                return doFetch({
                    method: arguments[0],
                    url: arguments[1],
                    query: arguments[2],
                    body: arguments[3],
                    headers: arguments[4],
                });
            }
            else {
                return doFetch(arguments[0]);
            }
        },
        setDefaultHeader: function (key, value) {
            opts.defaultHeaders[key] = value;
        },
    };
};
function install(Vue, options) {
    if (options === void 0) { options = { polyfill: true }; }
    Vue.prototype.$fetch = exports.Fetch(options);
}
exports.install = install;
VueFetch.install = install;
exports.Fetch = VueFetch;
exports.default = VueFetch;
function objToSearch(obj) {
    var query = new _URLSearchParams();
    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        query.set(key, obj[key]);
    });
    return query.toString();
}
function processBody(body) {
    switch (true) {
        case body instanceof FormData:
        case typeof body === 'string':
        case body instanceof Blob:
            return { body: body };
        default:
            return {
                body: JSON.stringify(body),
                contentType: 'application/json',
            };
    }
}
//# sourceMappingURL=index.js.map