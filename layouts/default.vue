<template>
  <v-app>
    <Navbar />
    <v-main class="-mt-6">
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
.text-cap-btn {
  @apply capitalize;
}
.text-nor-btn {
  @apply normal-case;
}
</style>
