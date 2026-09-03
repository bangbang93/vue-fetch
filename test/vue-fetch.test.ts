import { createApp } from 'vue'
import { describe, expect, it } from 'vitest'
import VueFetch from '../dist/index.mjs'

(global as any).window = {};
(global as any).Headers = function () {};

describe('vue-fetch', () => {
  it('should install in vue', () => {
    const app = createApp({});
    app.use(VueFetch);
    expect(app.config.globalProperties.$fetch).toBeDefined();
    expect(typeof app.config.globalProperties.$fetch.get).toBe('function');
  });
  it('should can be used in other contexts', () => {
    const fetch = VueFetch();
    expect(fetch).toHaveProperty('get');
    expect(typeof fetch.get).toBe('function');
  });
});
