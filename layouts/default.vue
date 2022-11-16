<template>
  <div>
    <the-loading-screen />
    <v-app>
      <the-alert-notification />
      <the-navbar-default />
      <v-main class="-mt-16 md:-mt-6">
        <v-container>
          <transition :name="isFristLoad ? '' : 'slide-fade'" mode="out-in">
            <Nuxt v-if="!isFristLoad" />
          </transition>
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
import UserService from '~/services/UserService'

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
  data() {
    return {
      isFristLoad: true,
    }
  },
  mounted() {
    if (localStorage.getItem('accessToken')) {
      UserService.getNotificationByUID(localStorage.getItem('uid')).then(
        (res) => {
          this.$store.commit('SET_NOTIFICATION', res.data)
        }
      )
    }
    socket.on('notification-quiz', (notificationData) => {
      UserService.getNotificationByUID(localStorage.getItem('uid')).then(
        (res) => {
          this.$store.commit('SET_NOTIFICATION', res.data)
        }
      )
      this.$store.commit('TOGGLE_ALERT', {
        type: 'info',
        message: `Quiz ${notificationData.title} is starting`,
      })
    })

    socket.on('event-deleted', (classroomId) => {
      UserService.signInGetProfile(localStorage.getItem('accessToken')).then(
        (res) => {
          this.$store.commit('setUser', res.data)
        }
      )
      socket.emit('leave-classrooms', classroomId)
    })

    setTimeout(() => {
      this.isFristLoad = false
    }, 500)
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
