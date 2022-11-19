<template>
  <v-menu offset-y left color="primary" transition="slide-y-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" id="theme" v-bind="attrs" rounded icon v-on="on">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="mode in ThemeMode"
        :key="mode.mode"
        @click="themeMode(mode.methods)"
      >
        <v-icon left>{{ mode.icon }}</v-icon>
        {{ mode.title }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      themeIcon: '',
      ThemeMode: [
        {
          icon: 'mdi-white-balance-sunny',
          methods: 'light',
          title: 'Light',
        },
        {
          icon: 'mdi-weather-night',
          methods: 'dark',
          title: 'Dark',
        },
        {
          icon: 'mdi-desktop-tower-monitor',
          methods: 'theme',
          title: 'System default',
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
        this.mode()
      } else if (mode === 'light') {
        localStorage.theme = 'light'
        this.$vuetify.theme.dark = false
        document.getElementById('light')
        this.mode()
      } else {
        localStorage.theme = 'system'
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
        localStorage.theme = 'dark'
        this.$vuetify.theme.dark = true
        this.themeIcon = 'mdi-weather-night'
        this.$store.commit('setThemeMode', this.ThemeMode[1])
      } else if (localStorage.theme === 'light') {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
        this.$vuetify.theme.dark = false
        this.themeIcon = 'mdi-white-balance-sunny'
        this.$store.commit('setThemeMode', this.ThemeMode[0])
      } else {
        localStorage.theme = 'system'
        this.themeIcon = 'mdi-desktop-tower-monitor'
        this.$store.commit('setThemeMode', this.ThemeMode[2])
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.$vuetify.theme.dark = true
          document.documentElement.classList.add('dark')
        } else {
          this.$vuetify.theme.dark = false
          document.documentElement.classList.remove('dark')
        }
      }
    },
  },
  computed: {
    icon() {
      return this.$store.getters.themeIcon
    },
  },
  mounted() {
    this.mode()
    setTimeout(() => {
      this.mode()
    }, 10)

    const modePreference = window.matchMedia('(prefers-color-scheme: dark)')
    modePreference.addEventListener('change', () => this.mode())
  },
}
</script>
