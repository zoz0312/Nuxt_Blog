const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s',
    title: 'AJu Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'google-site-verification', content: 'HdqxAV1Q66xJq19qFKZ0oUuhzDdoCwz6sHR_042OXUA' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/sitemap' //Must Last
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.blue.darken1,
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
      }
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
		{ src : '~/plugins/vue-apexchart.js', ssr : false },
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor : [
			'vue-apexchart'
    ],
    /*
     ** You can extend webpack config here
     */
  },
  serverMiddleware: [
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'http://blog.zoz0312.com',
    lastmod: '2019-11-20',
    exclude: [
      '/login',
      '/category/**',
      '/posts/create'
    ],
		routes: ["/list/22","/list/25","/list/37","/list/38","/list/39","/list/46","/list/47","/posts/read/6","/posts/read/18","/posts/read/19","/posts/read/20","/posts/read/21"]
  }
}
