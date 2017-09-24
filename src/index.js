/**
 * Created by bangbang93 on 2016/12/9.
 */
'use strict';

import 'url-search-params-polyfill'
import ES6Promise from 'es6-promise'
import * as WhatwgFetch from 'whatwg-fetch'

export function Fetch(opts = {}) {
  let log
  if (opts.logging) {
    if (typeof opts.logging === 'function') {
      log = opts.logging
    } else {
      log = function log(name, ...msgs) {
        console.log(`Fetch:${name}`, ...msgs)
      }
    }
  } else {
    log = () => {}
  }

  let _fetch = opts.fetch || (typeof window !== 'undefined' && window.fetch)
    || (typeof global !== 'undefined' && global.fetch)
  let _Headers = opts.Headers || (typeof window !== 'undefined' && window.Headers)
    || (typeof global !== 'undefined' && global.Headers)

  if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    _fetch = require('node-fetch')
    _Headers = _fetch.Headers
  }

  let createHeaders = opts.createHeaders || function (obj) {
    if (obj.hasOwnProperty('content-type') && !obj['content-type']) {
      delete obj['content-type']
    }
    return new _Headers(obj)
  }

  opts.defaultHeaders = opts.defaultHeaders || {}

  log('config', {
    opts,
    fetch: _fetch,
    createHeaders
  })

  function doFetch({method, url, query, body, headers = {}, credentials = 'include'}) {
    headers = Object.assign(opts.defaultHeaders, headers)
    if (query) {
      if (typeof query !== 'string') {
        query = objToSearch(query);
      }
      url = `${url}?${query}`
    }
    let request = {
      method: method.toUpperCase(),
      credentials
    };
    if (body) {
      const {contentType, body: _body} = processBody(body)
      if (contentType) {
        headers = Object.assign(headers,{
          'content-type': contentType
        })
      }

      request.body = _body;
    }
    request.headers = createHeaders(headers);

    log('fetch', {
      url,
      request
    })

    return _fetch(url, request);
  }

  return {
    get(url, query) {
      return doFetch({method: 'get', url, query});
    },
    post(url, body, query) {
      return doFetch({method: 'post', url, query, body})
    },
    put(url, body, query) {
      return doFetch({method: 'put', url, body, query})
    },
    patch(url, body, query) {
      return doFetch({method: 'patch', url, body, query})
    },
    del(url, query) {
      return doFetch({method: 'delete', url, query})
    },
    fetch({method, url, query, body, headers}) {
      if (arguments.length !== 1) {
        return doFetch({
          method: arguments[0],
          url: arguments[1],
          query: arguments[2],
          body: arguments[3],
          headers: arguments[4],
        })
      } else {
        return doFetch(arguments[0])
      }
    },
    setDefaultHeader(key, value) {
      opts.defaultHeaders[key] = value
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
    case typeof body === 'string':
    case body instanceof Blob:
      return {body};
    default:
      return {
        body: JSON.stringify(body),
        contentType: 'application/json',
      };
  }
}
