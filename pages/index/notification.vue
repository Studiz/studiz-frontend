<template>
  <div>
    <div class="items-center justify-between space-y-2 md:flex">
      <h1 class="text-H1">Notification</h1>
      <v-btn
        v-if="notifications.length > 0"
        height="48"
        color="primary"
        class="w-full md:w-auto rounded-lg"
        @click="deleteAllNotification"
      >
        <span class="normal-case">Clear all</span>
      </v-btn>
    </div>
    <v-divider class="my-5" />

    <div v-if="notifications.length > 0">
      <base-notification-item
        v-for="(notification, i) in notifications"
        :key="`${notification.classroomId}-${i}`"
        :notification="notification"
        :index="i"
      />
    </div>
    <div v-else>
      <lottie-player
        class="custon-lottie-star w-48 h-48 mx-auto"
        autoplay
        src="https://assets10.lottiefiles.com/packages/lf20_lsklpwya.json"
      />
      <div class="text-center font-light space-y-2">
        <div class="text-xl font-semibold">No Notification</div>
        <div class="max-w-xs mx-auto">
          When you have notifications, you will see them here.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseNotificationItem from '~/components/BaseNotificationItem.vue'
import UserService from '~/services/UserService.js'

export default {
  components: { BaseNotificationItem },
  head() {
    return {
      title: 'Notification',
    }
  },
  methods: {
    deleteAllNotification() {
      UserService.deleteAllNotification(localStorage.getItem('uid')).then(
        (res) => {
          this.$store.commit('DELETE_ALL_NOTIFICATION')
        }
      )
    },
  },
  computed: {
    notifications() {
      return this.$store.getters.notifications
    },
  },
}
</script>

<style></style>
