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
  if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    _fetch = require('node-fetch')
  }
  const _Headers = opts.Headers || (typeof window !== 'undefined' && window.Headers) || WhatwgFetch.Headers
  let createHeaders = opts.createHeaders || function (obj) {
    return new _Headers(obj)
  }

  log('config', {
    opts,
    Headers: _Headers,
    fetch: _fetch,
    createHeaders
  })

  return {
    get(url, query) {
      if (query) {
        if (typeof query !== 'string') {
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
    post(url, _body) {
      const {contentType, body} = processBody(_body)

      const headers = createHeaders({
        'content-type': contentType
      })

      let request = {
        method: 'POST',
        headers,
        body,
        credentials: 'include',
      }
      log('post', {
        request
      })

      return _fetch(url, request)
    },
    put(url, _body) {
      const {contentType, body} = processBody(_body)

      const headers = createHeaders({
        'content-type': contentType
      })

      let request = {
        method: 'put',
        headers,
        body,
        credentials: 'include',
      }
      log('put', {
        request
      })

      return _fetch(url, request)
    },
    patch(url, _body) {
      const {contentType, body} = processBody(_body)

      const headers = createHeaders({
        'content-type': contentType
      })

      let request = {
        method: 'PATCH',
        headers,
        body,
        credentials: 'include',
      }
      log('patch', {
        request
      })

      return _fetch(url, request)
    },
    del(url, query) {
      if (query) {
        if (typeof query !== 'string') {
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
    fetch(method, url, query, _body) {
      if (query) {
        if (typeof query !== 'string') {
          query = objToSearch(query);
        }
        url = `${url}?${query}`
      }
      let options = {
        method: method.toUpperCase(),
        credentials: 'include'
      };
      if (_body) {
        const {contentType, body} = processBody(_body)

        options.headers = createHeaders({
          'content-type': contentType
        });
        options.body = body;
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

function processBody (body) {
  switch (true) {
    case body instanceof FormData:
      return {
        body,
        contentType: 'multipart/form-data',
      }
    case typeof body === 'string':
      return {body};
    default:
      return {
        body: JSON.stringify(body),
        contentType: 'application/json',
      };
  }
}
