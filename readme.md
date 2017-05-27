# vue-fetch

Use fetch in vue just like `$http` in Angular

## Why

Fetch API is awesome... but it has some feature I don't like :()

- if you need cookies, you must pass ```credentials: 'include'``` as second params
- pass json while manually ```JSON.parse(body)``` and ```headers: new Headers({'content-type': 'application/json' })```

So I wrote this small plugin to provide a "better way" ;)

## Usage

```javascript
import VueFetch from 'vue-fetch'
import Vue from 'vue'

Vue.use(VueFetch, {
  polyfill: true   //should vue-fetch load promise polyfill, set to false to use customer polyfill
});

const vm = new Vue({
});

(async function(){
    let login = await vm.$fetch.post('/user/login', {
        username: 'somebody',
        password: 'wow',
    });
    if (login.status != 200) {
        alert('login error');
    }
    let user = await vm.$fetch.get('/user/profile');
    if (user.status != 200){
        alert('can not get profile')
    }
    vm.user = await user.json();
})()
```

## Inside component

Access via `this.$fetch`

## Outside component

Makes sense to have a separate data layer to keep with *Single Responsibility* guidelines.

```js
import { Fetch as $ } from 'vue-fetch'

export default {
  create: async (data) => {
    return await $.post('/user', data)
  },
  updateById: async (id, data) => {
    return await $.put(`/user/${id}`, )
  },
  deleteById: async (id) => {
    return await $.delete(`/user/${id}`)
  },
  findById: async (id) => {
    return await $.get(`/user/${id}`)
  }
}
```

## Support

### GET/DELETE

```js
vm.$fetch.get(url, {
  page: 1
});
vm.$fetch.delete(url, {
  limit: 1
});
```

### POST/PUT/PATCH

```js
vm.$fetch.post(url, {
  foo: 'bar'
});

vm.$fetch.put(url, {
  foo: 'bar'
});

vm.$fetch.patch(url, {
  foo: 'bar'
});
```

### FETCH

```js
vm.$fetch.fetch('POST', url, {
  page: 1
}, {
  body: 'some info'
});
```