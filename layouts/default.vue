<template>
  <v-app>
    <Navbar />
    <v-main class="-mt-14 md:-mt-6">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navbar from '~/components/navbar.vue'
export default {
  components: { navbar },
  name: 'DefaultLayout',
  data() {
    return {}
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
.text-cap {
  @apply capitalize;
}
.text-nor {
  @apply normal-case;
}
.fontbold {
  @apply font-bold;
}
</style>
