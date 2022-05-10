<template>
  <v-app>
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
        <img src="../assets/logo/Studiz logo.svg" />
        <v-menu offset-y left color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Dropdown
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in route"
              :key="index"
              :to="item.to"
            >
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-title>{{ item.title }}sdfsfsdfsd</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-btn @click="trun_ligth_mode" hide-details inset>Light</v-btn>
              <v-btn @click="trun_dark_mode" hide-details inset>Dark</v-btn>
              <v-btn @click="resetTheme" hide-details inset>systemTheme</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main class="web-theme">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      route: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'test',
          to: '/teste',
        },
      ],
      offset: true,
      ThemeMode: [
        { icon: 'mdi-white-balance-sunny', title: '' },
        { icon: 'mdi-weather-night', title: '' },
        { icon: 'mdi-desktop-tower-monitor', title: '' },
      ],
    }
  },
  methods: {
    trun_dark_mode() {
      localStorage.theme = 'dark'
      this.$vuetify.theme.dark = true
      document.getElementById('dark')
      this.mode()
    },
    trun_ligth_mode() {
      localStorage.theme = 'light'
      this.$vuetify.theme.dark = false
      document.getElementById('light')
      this.mode()
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
      } else {
        document.documentElement.classList.remove('dark')
        this.$vuetify.theme.dark = false
      }
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

<style>
.dark:root {
  color-scheme: dark;
}
.light:root {
  color-scheme: light;
}
</style>
