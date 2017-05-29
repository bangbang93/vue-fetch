
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fetch = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.install = install;

require('whatwg-fetch');

require('url-search-params-polyfill');

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fetch = exports.Fetch = {
  get: function get(url, query) {
    if (query) {
      if (typeof query != 'string') {
        query = objToSearch(query);
      }
      url = url + '?' + query;
    }
    return fetch(url, {
      credentials: 'include'
    });
  },
  post: function post(url, body) {
    return fetch(url, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: (0, _stringify2.default)(body),
      credentials: 'include'
    });
  },
  put: function put(url, body) {
    return fetch(url, {
      method: 'put',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: (0, _stringify2.default)(body),
      credentials: 'include'
    });
  },
  patch: function patch(url, body) {
    return fetch(url, {
      method: 'PATCH',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: (0, _stringify2.default)(body),
      credentials: 'include'
    });
  },
  del: function del(url, query) {
    if (query) {
      if (typeof query != 'string') {
        query = objToSearch(query);
      }
      url = url + '?' + query;
    }
    return fetch(url, {
      method: 'DELETE',
      credentials: 'include'
    });
  },
  fetch: function (_fetch) {
    function fetch(_x, _x2, _x3, _x4) {
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
      options.headers = new Headers({
        'content-type': 'application/json'
      });
      options.body = (0, _stringify2.default)(body);
    }
    return fetch(url, options);
  })
};

function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    polyfill: true
  };

  Vue.prototype.$fetch = Fetch;
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