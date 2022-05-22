<template>
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
  },
  mounted() {
    this.mode()
    setTimeout(() => {
      this.mode()
    }, 10)
  },
}
</script>
