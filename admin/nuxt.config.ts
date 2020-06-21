import { Configuration } from '@nuxt/types'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
let options = {} as any

const script = [
  { src: 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js' }
]

const isDev = process.env.NODE_ENV !== 'production'

// @ts-ignore
const config: Configuration = {
  dev: isDev,
  server: {
    port: 8800,
    host: '0.0.0.0'
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Arrplat - 企业级PaaS解决方案',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script
  },

  env: {
    // ARRPLAT_BASE_URL: 'http://saasapi.tefact.com/',
    // ARRPLAT_BASE_URL: 'http://arrplat.arrway.cn/api'
    // ARRPLAT_BASE_URL: 'http://arrplatapi.arrway.cn/api'
    // ARRPLAT_BASE_URL: 'http://localhost:5500'
    ARRPLAT_BASE_URL: isDev ? 'http://localhost:5500' : 'http://saasapi.tefact.com/',
    BUCKET_NAME: 'arrplat',
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/index.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/ElementUI',
    '~plugins/GlobalComponent',
    '~plugins/ArrplatUI',
    { src: '~/plugins/AxiosToken.ts', ssr: false },
    { src: '~/plugins/PersistedState.ts', ssr: false },
    { src: '~/plugins/Route.ts', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // '@nuxtjs/svg'
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      'vuex-module-decorators', /^element-ui/, 'lodash-es'
    ],
    plugins: [
      new LodashModuleReplacementPlugin()
    ],
    babel: {
      plugins: [
        ["component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ],
    },
    /*
    ** You can extend webpack config here
    */
    extend(config: any, ctx: any) {
      config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map'

      config.node = {
        fs: 'empty',
      }

      // https://segmentfault.com/a/1190000011100006
      // @ts-ignore
      config.resolve.symlinks = false;
    }
  }
}

export default config
