<template>
  <v-app>
    <v-app-bar
      fixed
      app
      flat
      class="bg-primary"
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
      this.$vuetify.theme.dark = true
      localStorage.setItem('theme', this.$vuetify.theme.dark.toString())
    },
    trun_ligth_mode() {
      this.$vuetify.theme.dark = false
      localStorage.setItem('theme', this.$vuetify.theme.dark.toString())
    },
    resetTheme() {
      localStorage.removeItem('theme')
      this.systemTheme()
    },
    systemTheme() {
      const theme = localStorage.getItem('theme')
      if (theme) {
        if (theme === 'true') {
          this.$vuetify.theme.dark = true
          console.log('Dark')
        } else {
          this.$vuetify.theme.dark = false
          console.log('Light')
        }
      } else if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        this.$vuetify.theme.dark = true
        localStorage.setItem('theme', this.$vuetify.theme.dark.toString())
      } else {
        this.$vuetify.theme.dark = false
      }
    },
  },
  mounted() {
    this.systemTheme()
    setTimeout(() => {
      this.systemTheme()
    }, 10)
  },
}
</script>

<style scoped></style>
