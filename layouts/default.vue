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
import navbar from '~/components/navbar/navbar.vue'
export default {
  components: { navbar },
  name: 'DefaultLayout',
  head() {
    return {
      meta: [
        {
          hid: `og:image`,
          property: 'og:image',
          content: '/studiz_logo.png',
        },
      ],
    }
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
.text-H1 {
  @apply text-H_1 font-bold;
}
.text-H2 {
  @apply text-H_2 font-bold;
}
.text-H3 {
  @apply text-H_3 font-bold;
}
</style>