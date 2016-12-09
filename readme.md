# vue-fetch
use fetch in vue just like $http in angular

## Why
Fetch api is awesome.
But it has some feature I don't like.

- if you need cookies, you must pass ```credentials: 'include'``` as second params
- pass json while manually ```JSON.parse(body)``` and ```headers: new Headers({'content-type': 'application/json' })```

So I wrote this small plugin

## Usage

```javascript
import VueFetch from 'vue-fetch'
import Vue from 'vue'

Vue.use(VueFetch);

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

## Support

### GET/DELETE
```javascript
vm.$fetch.get(url, {
  page: 1
});
vm.$fetch.delete(url, {
  limit: 1
});
```

### POST/PUT/PATCH
```javascript
vm.$fetch.post(url, {
  foo: 'bar'
});
```

### FETCH
```javascript
vm.$fetch.fetch('POST', url, {
  page: 1
}, {
  body: 'some info'
});
```