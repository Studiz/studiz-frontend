import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  ssr: false,
  head: {
    titleTemplate: '%s - Studiz',
    title: 'Studiz',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      },
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
    // '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyB-HKwqUYKKwNTwZ2JZc2i3dlQnVeYDleg',
          authDomain: 'orangequiz-a1567.firebaseapp.com',
          projectId: 'orangequiz-a1567',
          storageBucket: 'orangequiz-a1567.appspot.com',
          messagingSenderId: '654468903990',
          appId: '1:654468903990:web:c25930fce2301ef4ca5497',
          measurementId: 'G-E493KNZ3BS'
        },
        services: {
          auth: {
            onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
            onAuthStateChangedAction: "onAuthStateChangedAction",
          },
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: "./vuetify.options.js",
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Montserrat'
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
