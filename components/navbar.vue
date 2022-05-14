<template>
  <div>
    <!-- TOP -->
    <div class="hidden md:inline-block">
      <v-app-bar
        fixed
        app
        flat
        class="drop-shadow-md"
        height="70"
        dense
        color="background"
      >
        <div class="flex justify-between items-center container">
          <v-btn
            height="60px"
            elevation="0"
            color="background"
            class=""
            @click="goHomePage"
          >
            <img src="../static/logo/Studiz logo.svg" />
          </v-btn>
          <div class="flex items-center space-x-4">
            <v-spacer></v-spacer>
            <v-menu offset-y left color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary text-cap-btn"
                  v-bind="attrs"
                  rounded
                  icon
                  v-on="on"
                >
                  <v-icon>{{ themeIcon }}</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  @click="ligthMode"
                  hide-details
                  inset
                  class="text-cap-btn"
                  ><v-icon left>mdi-white-balance-sunny</v-icon
                  >Light</v-list-item
                >
                <v-list-item
                  @click="darkMode"
                  hide-details
                  inset
                  class="text-cap-btn"
                  ><v-icon left>mdi-weather-night</v-icon>Dark</v-list-item
                >
                <v-list-item
                  @click="resetTheme"
                  hide-details
                  inset
                  class="text-cap-btn"
                  ><v-icon left>mdi-desktop-tower-monitor</v-icon
                  >SystemTheme</v-list-item
                >
              </v-list>
            </v-menu>
            <v-menu offset-y left color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary text-cap-btn"
                  dark
                  v-bind="attrs"
                  height="50"
                  rounded
                  v-on="on"
                >
                  <v-icon left x-large class="mr-5 p-3"
                    >mdi-account-circle</v-icon
                  >
                  User Grest
                  <v-icon right>mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, index) in route"
                  :key="index"
                  :to="item.to"
                  class="font"
                >
                  <v-icon>{{ item.icon }}</v-icon>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </v-app-bar>
    </div>

    <!-- Bottom -->
    <div class="md:hidden">
      <v-app-bar
        bottom
        fixed
        flat
        class="drop-shadow-md"
        height="70"
        dense
        color="background"
      >
        <p>teat</p>
      </v-app-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: [
        {
          title: 'login',
          to: '/login',
        },
        {
          title: 'Sign up',
          to: '/signup',
        },
      ],
      themeIcon: '',
      // ThemeMode: [
      //   {
      //     icon: 'mdi-white-balance-sunny',
      //     methods: 'ligthMode',
      //     title: 'Light',
      //   },
      //   { icon: 'mdi-weather-night', methods: 'darkMode', title: 'Dark' },
      //   {
      //     icon: 'mdi-desktop-tower-monitor',
      //     methods: 'resetTheme',
      //     title: 'SystemTheme',
      //   },
      // ],
    }
  },
  methods: {
    darkMode() {
      localStorage.theme = 'dark'
      this.$vuetify.theme.dark = true
      document.getElementById('dark')
      this.mode()
      this.themeIcon = 'mdi-weather-night'
    },
    ligthMode() {
      localStorage.theme = 'light'
      this.$vuetify.theme.dark = false
      document.getElementById('light')
      this.mode()
      this.themeIcon = 'mdi-white-balance-sunny'
    },
    resetTheme() {
      localStorage.removeItem('theme')
      this.mode()
    },
    mode() {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
        this.$vuetify.theme.dark = true
        this.themeIcon = 'mdi-weather-night'
      } else {
        document.documentElement.classList.remove('dark')
        this.$vuetify.theme.dark = false
        this.themeIcon = 'mdi-white-balance-sunny'
      }
    },
    goHomePage() {
      this.$router.push('/join')
    },
  },
  mounted() {
    this.mode()
    setTimeout(() => {
      this.mode()
    }, 10)
  },
}
</script>

<style scoped>
.font {
  @apply font-medium text-H2;
}
</style>
