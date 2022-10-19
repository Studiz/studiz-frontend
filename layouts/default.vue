<template>
  <div>
    <loading-page />
    <v-app>
      <alert-notification />
      <Navbar />
      <v-main class="-mt-16 md:-mt-6">
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import "@lottiefiles/lottie-player";
import LoadingPage from '~/components/LoadingPage.vue'
import AlertNotification from '~/components/AlertNotification.vue'
import navbar from '~/components/navbar/navbar.vue'
export default {
  components: { navbar, LoadingPage, AlertNotification },
  name: 'DefaultLayout',
  head() {
    return {
      meta: [
        {
          hid: `og:image`,
          property: 'og:image',
          content: '/studiz-logo.png',
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
