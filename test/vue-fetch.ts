import { createApp } from 'vue'
import VueFetch from '../dist/index.mjs'
import 'should'

global['window'] = {};
global['Headers'] = function () {};

describe('vue-fetch', function () {
  it('should install in vue', function () {
    const app = createApp({});
    app.use(VueFetch);
    app.config.globalProperties['should'].property('$fetch');
    app.config.globalProperties.$fetch.get['should'].be.Function();
  });
  it('should can be used in other contexts', function () {
    const fetch = VueFetch();
    fetch['should'].hasOwnProperty('get');
    fetch.get['should'].be.Function();
  });
});
