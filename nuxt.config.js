export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  mode: 'spa',
  target: 'static',
  head: {
    titleTemplate: '%s - Studiz',
    title: 'Studiz',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Hello Studiz',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/studiz-logo.png',
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: '/studiz-logo.png',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['vue-slick-carousel/dist/vue-slick-carousel.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: './plugins/vue-slick-carousel.js' }],

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
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyBGYCsOpzKtnrcCTUIflOZr_phSv1DSY4s',
          authDomain: 'studiz-ce53f.firebaseapp.com',
          projectId: 'studiz-ce53f',
          storageBucket: 'studiz-ce53f.appspot.com',
          messagingSenderId: '874564223143',
          appId: '1:874564223143:web:9d292f2f1f60fd61815b82',
          measurementId: 'G-1Z69XQJNN6',
        },
        services: {
          auth: {
            onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
            onAuthStateChangedAction: 'onAuthStateChangedAction',
          },
        },
      },
    ],
  ],
  env: {
    baseURL: 'https://www.studiz.games/studiz/api',
    // baseURL: "http://localhost:9091/api",
    webSocket: "https://www.studiz.games/",
    // webSocket: "http://localhost:9091",
    FIRE_ENV: process.env.FIRE_ENV,
  },

  router: {
    middleware: ['auth'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: './vuetify.options.js',
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Montserrat',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    timing: false,
  },
  pwa: {
    icon: {
      fileName: 'icon.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
      purpose: 'any',
    },
    manifest: {
      icon: {
        fileName: 'icon.png',
        sizes: [64, 120, 144, 152, 192, 384, 512],
      },
      name: 'Studiz',
      short_name: 'studiz',
      lang: 'en',
      theme_color: '#0c8ce9',
      description:
        'This web application will help students interact with friends and teachers to create an active learning process and make students feel more interested in learning and having fun.',
      start_url: '/join',
    },
  },
}
