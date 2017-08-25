/**
 * Created by bangbang93 on 2016/12/9.
 */
'use strict';

import 'url-search-params-polyfill'
import ES6Promise from 'es6-promise'
import * as WhatwgFetch from 'whatwg-fetch'

export function Fetch(opts = {}) {
  function log(name, ...msgs) {
    if (opts.logging) {
      console.log(`Fetch:${name}`, ...msgs)
    }
  }

  let _fetch = opts.fetch || (typeof window !== 'undefined' && window.fetch)
    || (typeof global !== 'undefined' && global.fetch)
  if (typeof process !== 'undefined' && typeof process.on === 'function') {
    import NodeFetch from 'node-fetch'
    _fetch = NodeFetch
  }
  let _Headers = opts.Headers || (typeof window !== 'undefined' && window.Headers) || WhatwgFetch.Headers
  let createHeaders = opts.createHeaders || function (obj) {
    return new _Headers(obj)
  }

  log('config', {
    opts,
    Headers: _Headers,
    fetch: _fetch,
    createHeaders
  })

  const headers = createHeaders({
    'content-type': 'application/json'
  })

  log('config', {
    headers
  })

  const stringify = JSON.stringify

  return {
    get(url, query) {
      if (query) {
        if (typeof query != 'string') {
          query = objToSearch(query);
        }
        url = `${url}?${query}`
      }
      let request = {
        credentials: 'include'
      }
      log('get', {
        request
      })
      return _fetch(url, request);
    },
    post(url, body) {
      let request = {
        method: 'POST',
        headers,
        body: stringify(body),
        credentials: 'include',
      }
      log('post', {
        request
      })

      return _fetch(url, request)
    },
    put(url, body) {
      let request = {
        method: 'put',
        headers,
        body: stringify(body),
        credentials: 'include',
      }
      log('put', {
        request
      })

      return _fetch(url, request)
    },
    patch(url, body) {
      let request = {
        method: 'PATCH',
        headers,
        body: stringify(body),
        credentials: 'include',
      }
      log('patch', {
        request
      })

      return _fetch(url, request)
    },
    del(url, query) {
      if (query) {
        if (typeof query != 'string') {
          query = objToSearch(query);
        }
        url = `${url}?${query}`;
      }
      let request = {
        method: 'DELETE',
        credentials: 'include'
      }
      log('del', {
        request
      })

      return _fetch(url, request);
    },
    fetch(method, url, query, body) {
      if (query) {
        if (typeof query != 'string') {
          query = objToSearch(query);
        }
        url = `${url}?${query}`
      }
      let options = {
        method: method.toUpperCase(),
        credentials: 'include'
      };
      if (body) {
        options.headers = headers;
        options.body = stringify(body);
      }
      let request = options
      log('fetch', {
        request
      })

      return _fetch(url, request);
    }
  }
}

export function install(Vue, options = {
  polyfill: true
}) {
  Vue.prototype.$fetch = Fetch(options);
  if (options.polyfill) {
    ES6Promise.polyfill();
  }
}

Fetch.install = install;

export default Fetch;

function objToSearch(obj) {
  let query = new URLSearchParams();
  let keys = Object.keys(obj);
  keys.forEach((key) => {
    query.set(key, obj[key]);
  });
  return query.toString();
}
