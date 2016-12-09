/**
 * Created by bangbang93 on 2016/12/9.
 */
'use strict';

import 'whatwg-fetch'
import 'url-search-params-polyfill'

const VueFetch = {
  get(url, query){
    if (typeof query != 'string'){
      query = new URLSearchParams(query);
      query = query.toString();
    }
    return fetch(`${url}?${query}`, {credentials: 'include'});
  },
  post(url, body){
    return fetch(url, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify(body),
      credentials: 'include',
    })
  },
  patch(url, body){
    return fetch(url, {
      method: 'put',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify(body),
      credentials: 'include',
    })
  },
  patch(url, body){
    return fetch(url, {
      method: 'PATCH',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify(body),
      credentials: 'include',
    })
  },
  del(url, query){
    if (typeof query != 'string'){
      query = new URLSearchParams(query);
      query = query.toString();
    }
    return fetch(`${url}?${query}`, {
      method: 'DELETE',
      credentials: 'include'
    });
  }
};



export default {
  install: function (Vue, options) {
    Vue.prototype.$fetch = VueFetch;
  }
}