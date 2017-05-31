/**
 * Created by bangbang93 on 2017/5/31.
 */
'use strict';
require('should');
const Vue = require('vue');
const VueFetch = require('../lib/index').default;

global.window = {};
global.Headers = function () {};

describe('vue-fetch', function () {
  it('should install in vue', function () {
    Vue.use(VueFetch);
    const vm = new Vue();
    vm.should.property('$fetch');
    vm.$fetch.get.should.be.Function();
  });
  it('should can be used in other contexts', function () {
    const fetch = VueFetch();
    fetch.should.hasOwnProperty('get');
    fetch.get.should.be.Function();
  });

});