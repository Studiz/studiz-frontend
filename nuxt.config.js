export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // ssr: false,
  mode: 'spa',
  target: 'static',
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
          apiKey: 'AIzaSyBGYCsOpzKtnrcCTUIflOZr_phSv1DSY4s',
          authDomain: 'studiz-ce53f.firebaseapp.com',
          projectId: 'studiz-ce53f',
          storageBucket: 'studiz-ce53f.appspot.com',
          messagingSenderId: '874564223143',
          appId: '1:874564223143:web:9d292f2f1f60fd61815b82',
          measurementId: 'G-1Z69XQJNN6'
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
  env: {
    baseURL: "http://20.239.140.141:9091/api",
    FIRE_ENV: process.env.FIRE_ENV
  },

  router: {
    middleware: ['auth']
  },

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
