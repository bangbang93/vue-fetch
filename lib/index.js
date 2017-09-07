
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.Fetch = Fetch;
exports.install = install;

require('url-search-params-polyfill');

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _whatwgFetch = require('whatwg-fetch');

var WhatwgFetch = _interopRequireWildcard(_whatwgFetch);

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
  if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    _fetch = require('node-fetch');
  }
  var _Headers = opts.Headers || typeof window !== 'undefined' && window.Headers || WhatwgFetch.Headers;
  var createHeaders = opts.createHeaders || function (obj) {
    if (obj.hasOwnProperty('content-type') && !obj['content-type']) {
      delete obj['content-type'];
    }
    return new _Headers(obj);
  };

  log('config', {
    opts: opts,
    Headers: _Headers,
    fetch: _fetch,
    createHeaders: createHeaders
  });

  function doFetch(_ref) {
    var method = _ref.method,
        url = _ref.url,
        query = _ref.query,
        body = _ref.body,
        headers = _ref.headers;

    if (query) {
      if (typeof query !== 'string') {
        query = objToSearch(query);
      }
      url = url + '?' + query;
    }
    var request = {
      method: method.toUpperCase(),
      credentials: 'include'
    };
    if (body) {
      var _processBody = processBody(body),
          contentType = _processBody.contentType,
          _body = _processBody.body;

      if (contentType) {
        headers = (0, _assign2.default)(headers, {
          'content-type': contentType
        });
      }

      request.headers = createHeaders(headers);
      request.body = _body;
    }
    log('fetch', {
      url: url,
      request: request
    });

    return _fetch(url, request);
  }

  return {
    get: function get(url, query) {
      return doFetch({ method: 'get', url: url, query: query });
    },
    post: function post(url, body, query) {
      return doFetch({ method: 'post', url: url, query: query, body: body });
    },
    put: function put(url, body, query) {
      return doFetch({ method: 'put', url: url, body: body, query: query });
    },
    patch: function patch(url, body, query) {
      return doFetch({ method: 'patch', url: url, body: body, query: query });
    },
    del: function del(url, query) {
      return doFetch({ method: 'delete', url: url, query: query });
    },
    fetch: function fetch(_ref2) {
      var method = _ref2.method,
          url = _ref2.url,
          query = _ref2.query,
          body = _ref2.body,
          headers = _ref2.headers;

      if (arguments.length !== 1) {
        return doFetch({
          method: arguments[0],
          url: arguments[1],
          query: arguments[2],
          body: arguments[3],
          headers: arguments[4]
        });
      } else {
        return doFetch(arguments[0]);
      }
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

function processBody(body) {
  switch (true) {
    case body instanceof FormData:
    case typeof body === 'string':
      return { body: body };
    default:
      return {
        body: (0, _stringify2.default)(body),
        contentType: 'application/json'
      };
  }
}