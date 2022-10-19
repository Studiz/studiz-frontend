<template>
  <div>
    <h1 class="text-H1">Setting</h1>

    <v-divider class="my-5" />

    <v-list color="transparent" rounded class="pa-0">
      <!-- <v-btn flat block elevation="0"> -->
      <v-list-item link class="px-3" @click="clickTheme">
        <!-- @click="clickTheme" -->

        <v-icon size="36px" color="primary" left class="mr-4"
          >{{ this.$store.getters.themeIcon }}
        </v-icon>

        <v-list-item-content>
          <v-list-item-title class="text-cap d-flex items-center">
            theme: {{ this.$store.getters.themeName }}
            <!-- <v-spacer></v-spacer> -->
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- </v-btn> -->
      <!-- <LightDarkMode name="theme"></LightDarkMode> -->
    </v-list>
  </div>
</template>

<script>
import LightDarkMode from '~/components/navbar/light-dark-mode.vue'
export default {
  components: { LightDarkMode },
  head() {
    return {
      title: 'Setting',
    }
  },
  methods: {
    clickTheme() {
      document.getElementById('theme').click()
    },
  },
}
</script>

<style></style>
