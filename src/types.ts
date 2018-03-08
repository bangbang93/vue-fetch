export interface IOptions {
  fetch?: Function
  Headers?: any
  createHeaders?: Function
  defaultHeaders?: any
  polyfill?: boolean
}

export interface IDoFetchArguments {
  url: string,
  method: string,
  query?: any,
  body?: any,
  headers?: any,
  credentials?: any,
}

export interface IFetch extends PluginObject<IOptions> {
  (opts?: IOptions): IVueFetch
}

export interface IRawFetch {
  method: string,
  url: string,
  query: any,
  body: any,
  headers: any,
}

export interface IVueFetch {
  get(url: string, query?: any): Promise<Response>
  post(url: string, body?: any, query?: any): Promise<Response>
  put(url: string, body?: any, query?: any): Promise<Response>
  patch(url: string, body?: any, query?: any): Promise<Response>
  del(url: string, query?: any): Promise<Response>
  fetch(options: IRawFetch): Promise<Response>
  setDefaultHeader(key: string, value: string)
}

import Vue, {PluginFunction, PluginObject} from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $fetch: IVueFetch
  }
}
