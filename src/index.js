/**
 * Created by bangbang93 on 2016/12/9.
 */
'use strict';

import 'whatwg-fetch'
import 'url-search-params-polyfill'
import ES6Promise from 'es6-promise'

export function Fetch(opts = {}) {
  function log(name, ...msgs) {
    if (opts.logging) {
      console.log(`Fetch:${name}`, ...msgs)
    }
  }

  // const headers = new Headers({
  //   'content-type': 'application/json'
  // })

  const headers = {
    'content-type': 'application/json'
  }

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
      return fetch(url, request);
    },
    post(url, body) {
      let request = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        credentials: 'include',
      }
      log('post', {
        request
      })

      return fetch(url, request)
    },
    put(url, body) {
      let request = {
        method: 'put',
        headers,
        body: JSON.stringify(body),
        credentials: 'include',
      }
      log('put', {
        request
      })

      return fetch(url, request)
    },
    patch(url, body) {
      let request = {
        method: 'PATCH',
        headers,
        body: JSON.stringify(body),
        credentials: 'include',
      }
      log('patch', {
        request
      })

      return fetch(url, )
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

      return fetch(url, request);
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
        options.body = JSON.stringify(body);
      }
      let request = options
      log('fetch', {
        request
      })

      return fetch(url, request);
    }
  }
};

export function install(Vue, options = {
  polyfill: true
}) {
  Vue.prototype.$fetch = Fetch(options);
  if (options.polyfill) {
    ES6Promise.polyfill();
  }
}

function objToSearch(obj) {
  let query = new URLSearchParams();
  let keys = Object.keys(obj);
  keys.forEach((key) => {
    query.set(key, obj[key]);
  });
  return query.toString();
}