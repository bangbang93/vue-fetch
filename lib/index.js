
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

require('whatwg-fetch');

require('url-search-params-polyfill');

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

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

  var headers = {
    'content-type': 'application/json'
  };

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
      return fetch(url, request);
    },
    post: function post(url, body) {
      var request = {
        method: 'POST',
        headers: headers,
        body: (0, _stringify2.default)(body),
        credentials: 'include'
      };
      log('post', {
        request: request
      });

      return fetch(url, request);
    },
    put: function put(url, body) {
      var request = {
        method: 'put',
        headers: headers,
        body: (0, _stringify2.default)(body),
        credentials: 'include'
      };
      log('put', {
        request: request
      });

      return fetch(url, request);
    },
    patch: function patch(url, body) {
      var request = {
        method: 'PATCH',
        headers: headers,
        body: (0, _stringify2.default)(body),
        credentials: 'include'
      };
      log('patch', {
        request: request
      });

      return fetch(url);
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

      return fetch(url, request);
    },
    fetch: function (_fetch) {
      function fetch(_x2, _x3, _x4, _x5) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (method, url, query, body) {
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
        options.body = (0, _stringify2.default)(body);
      }
      var request = options;
      log('fetch', {
        request: request
      });

      return fetch(url, request);
    })
  };
};

function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    polyfill: true
  };

  Vue.prototype.$fetch = Fetch(options);
  if (options.polyfill) {
    _es6Promise2.default.polyfill();
  }
}

function objToSearch(obj) {
  var query = new URLSearchParams();
  var keys = (0, _keys2.default)(obj);
  keys.forEach(function (key) {
    query.set(key, obj[key]);
  });
  return query.toString();
}