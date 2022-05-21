<template>
  <div>
    <!-- TOP -->
    <div class="hidden md:inline-block">
      <v-app-bar fixed app flat class="drop-shadow-md" height="60" dense color="background">
        <div class="flex justify-between items-center container">
          <v-btn height="50px" elevation="0" color="background" class @click="goHomePage">
            <v-img :src="require('../static/logo/Studiz_logo.svg')" max-width="80" />
            <!-- <v-icon x-large>$vuetify.icons.Studiz_logo</v-icon> -->
          </v-btn>
          <div class="flex items-center space-x-4">
            <v-spacer></v-spacer>
            <!-- right  -->
            <v-menu offset-y left color="primary" transition="slide-y-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary text-cap" v-bind="attrs" rounded icon v-on="on">
                  <v-icon>{{ themeIcon }}</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="mode in ThemeMode"
                  :key="mode.mode"
                  @click="themeMode(mode.methods)"
                  hide-details
                  inset
                  class="text-cap"
                >
                  <v-icon left>{{ mode.icon }}</v-icon>
                  {{ mode.mode }}
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu offset-y left color="primary" transition="slide-y-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary text-cap" dark v-bind="attrs" height="40" rounded v-on="on">
                  <v-avatar class="-m-5 mr-1">
                    <v-icon large>mdi-account-circle</v-icon>
                  </v-avatar>User Grest
                  <v-icon right>mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item v-for="item in route" :key="item.to" :to="item.to" class="font">
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
    <v-bottom-navigation
      grow
      fixed
      height="70"
      class="drop-shadow-md d-md-none"
      color="primary-title"
      active-class="primary--text"
    >
      <v-btn
        color="background"
        height="70"
        min-width="10"
        v-for="b in buttonNav"
        :key="b.icon"
        :to="b.to"
      >
        {{b.title}}
        <v-icon>{{b.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
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
      ThemeMode: [
        {
          icon: 'mdi-white-balance-sunny',
          methods: 'light',
          mode: 'Light',
        },
        {
          icon: 'mdi-weather-night',
          methods: 'dark',
          mode: 'Dark',
        },
        {
          icon: 'mdi-desktop-tower-monitor',
          methods: 'theme',
          mode: 'SystemTheme',
        },
      ],
      buttonNav: [
        {
          title: 'classroom',
          icon: '$vuetify.icons.classroom',
          to: '/classrooms',
        },
        {
          title: 'join quiz',
          icon: '$vuetify.icons.quiz',
          to: '/quiz',
        },
        {
          title: 'notification',
          icon: '$vuetify.icons.notification',
          to: '/notification',
        },
        {
          title: 'more',
          icon: '$vuetify.icons.more',
          to: '/',
        },
      ],
    }
  },
  methods: {
    themeMode(mode) {
      if (mode === 'dark') {
        localStorage.theme = 'dark'
        this.$vuetify.theme.dark = true
        document.getElementById('dark')
        this.themeIcon = mode.icon
        this.mode()
      } else if (mode === 'light') {
        localStorage.theme = 'light'
        this.$vuetify.theme.dark = false
        document.getElementById('light')
        this.themeIcon = mode.icon
        this.mode()
      } else {
        localStorage.removeItem('theme')
        this.mode()
      }
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
