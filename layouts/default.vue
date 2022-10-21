<template>
  <div>
    <the-loading-screen />
    <v-app>
      <the-alert-notification />
      <the-navbar-default />
      <v-main class="-mt-16 md:-mt-6">
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import '@lottiefiles/lottie-player'
import TheAlertNotification from '~/components/TheAlertNotification.vue'
import TheNavbarDefault from '~/components/navbar/TheNavbarDefault.vue'
import TheLoadingScreen from '~/components/TheLoadingScreen.vue'
import socket from '~/plugins/socket.io'

export default {
  components: { TheAlertNotification, TheNavbarDefault, TheLoadingScreen },
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
  mounted() {
    socket.on('notification-quiz', (notificationData) => {
      this.$store.commit('pushNotification', notificationData)
      this.$store.commit('TOGGLE_ALERT', {
        type: 'info',
        message: `Quiz ${notificationData.title} is starting`,
      })
    })
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
