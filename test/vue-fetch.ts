import Vue from 'vue'
import VueFetch from '../src/'
import 'should'

console.log(require('vue'))

global['window'] = {};
global['Headers'] = function () {};

describe('vue-fetch', function () {
  it('should install in vue', function () {
    Vue.use(VueFetch);
    const vm = new Vue();
    vm['should'].property('$fetch');
    vm.$fetch.get['should'].be.Function();
  });
  it('should can be used in other contexts', function () {
    const fetch = VueFetch();
    fetch['should'].hasOwnProperty('get');
    fetch.get['should'].be.Function();
  });
});
