<template>
  <div>
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
          <img src="../static/logo/Studiz logo.svg" />
          <v-menu offset-y left color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
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
              >
                <v-icon>{{ item.icon }}</v-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-btn @click="trun_ligth_mode" hide-details inset>Light</v-btn>
                <v-btn @click="trun_dark_mode" hide-details inset>Dark</v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn @click="resetTheme" hide-details inset
                  >systemTheme</v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-app-bar>
    </div>

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
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'join',
          to: '/join',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'login',
          to: '/login',
        },
      ],
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

<style></style>
