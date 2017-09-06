
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

  return {
    get: function get(url, query) {
      if (query) {
        if (typeof query !== 'string') {
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
    post: function post(url, _body) {
      var _processBody = processBody(_body),
          contentType = _processBody.contentType,
          body = _processBody.body;

      var headers = createHeaders({
        'content-type': contentType
      });

      var request = {
        method: 'POST',
        headers: headers,
        body: body,
        credentials: 'include'
      };
      log('post', {
        request: request
      });

      return _fetch(url, request);
    },
    put: function put(url, _body) {
      var _processBody2 = processBody(_body),
          contentType = _processBody2.contentType,
          body = _processBody2.body;

      var headers = createHeaders({
        'content-type': contentType
      });

      var request = {
        method: 'put',
        headers: headers,
        body: body,
        credentials: 'include'
      };
      log('put', {
        request: request
      });

      return _fetch(url, request);
    },
    patch: function patch(url, _body) {
      var _processBody3 = processBody(_body),
          contentType = _processBody3.contentType,
          body = _processBody3.body;

      var headers = createHeaders({
        'content-type': contentType
      });

      var request = {
        method: 'PATCH',
        headers: headers,
        body: body,
        credentials: 'include'
      };
      log('patch', {
        request: request
      });

      return _fetch(url, request);
    },
    del: function del(url, query) {
      if (query) {
        if (typeof query !== 'string') {
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
    fetch: function fetch(method, url, query, _body) {
      if (query) {
        if (typeof query !== 'string') {
          query = objToSearch(query);
        }
        url = url + '?' + query;
      }
      var options = {
        method: method.toUpperCase(),
        credentials: 'include'
      };
      if (_body) {
        var _processBody4 = processBody(_body),
            contentType = _processBody4.contentType,
            body = _processBody4.body;

        options.headers = createHeaders({
          'content-type': contentType
        });
        options.body = body;
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