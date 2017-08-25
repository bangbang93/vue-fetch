
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.Fetch = Fetch;
exports.install = install;

require('url-search-params-polyfill');

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _whatwgFetch = require('whatwg-fetch');

var WhatwgFetch = _interopRequireWildcard(_whatwgFetch);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Fetch() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  function log(name) {
    if (opts.logging) {
      var _console;

      for (var _len = arguments.length, msgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        msgs[_key - 1] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['Fetch:' + name].concat(msgs));
    }
  }

  var _fetch = opts.fetch || typeof window !== 'undefined' && window.fetch || typeof global !== 'undefined' && global.fetch;
  if (typeof process !== 'undefined' && typeof process.on === 'function') _fetch = _nodeFetch2.default;
  var _Headers = opts.Headers || typeof window !== 'undefined' && window.Headers || WhatwgFetch.Headers;
  var createHeaders = opts.createHeaders || function (obj) {
    return new _Headers(obj);
  };

  log('config', {
    opts: opts,
    Headers: _Headers,
    fetch: _fetch,
    createHeaders: createHeaders
  });

  var headers = createHeaders({
    'content-type': 'application/json'
  });

  log('config', {
    headers: headers
  });

  var stringify = _stringify2.default;

  return {
    get: function get(url, query) {
      if (query) {
        if (typeof query != 'string') {
          query = objToSearch(query);
        }
        url = url + '?' + query;
      }
      var request = {
        credentials: 'include'
      };
      log('get', {
        request: request
      });
      return _fetch(url, request);
    },
    post: function post(url, body) {
      var request = {
        method: 'POST',
        headers: headers,
        body: stringify(body),
        credentials: 'include'
      };
      log('post', {
        request: request
      });

      return _fetch(url, request);
    },
    put: function put(url, body) {
      var request = {
        method: 'put',
        headers: headers,
        body: stringify(body),
        credentials: 'include'
      };
      log('put', {
        request: request
      });

      return _fetch(url, request);
    },
    patch: function patch(url, body) {
      var request = {
        method: 'PATCH',
        headers: headers,
        body: stringify(body),
        credentials: 'include'
      };
      log('patch', {
        request: request
      });

      return _fetch(url, request);
    },
    del: function del(url, query) {
      if (query) {
        if (typeof query != 'string') {
          query = objToSearch(query);
        }
        url = url + '?' + query;
      }
      var request = {
        method: 'DELETE',
        credentials: 'include'
      };
      log('del', {
        request: request
      });

      return _fetch(url, request);
    },
    fetch: function fetch(method, url, query, body) {
      if (query) {
        if (typeof query != 'string') {
          query = objToSearch(query);
        }
        url = url + '?' + query;
      }
      var options = {
        method: method.toUpperCase(),
        credentials: 'include'
      };
      if (body) {
        options.headers = headers;
        options.body = stringify(body);
      }
      var request = options;
      log('fetch', {
        request: request
      });

      return _fetch(url, request);
    }
  };
}

function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    polyfill: true
  };

  Vue.prototype.$fetch = Fetch(options);
  if (options.polyfill) {
    _es6Promise2.default.polyfill();
  }
}

Fetch.install = install;

exports.default = Fetch;


function objToSearch(obj) {
  var query = new URLSearchParams();
  var keys = (0, _keys2.default)(obj);
  keys.forEach(function (key) {
    query.set(key, obj[key]);
  });
  return query.toString();
}