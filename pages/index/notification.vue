<template>
  <div>
    <div class="items-center justify-between space-y-2 md:flex">
      <h1 class="text-H1">Notification</h1>
      <v-btn
        v-if="notifications.length > 0"
        height="48"
        color="primary"
        class="w-full md:w-auto rounded-lg"
        @click="deleteAllNoti"
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
    <div v-else class="text-center font-light">
      <lottie-player
        class="custon-lottie-star w-48 h-48 mx-auto"
        autoplay
        src="https://assets10.lottiefiles.com/packages/lf20_lsklpwya.json"
      />
      <span>No Notification</span>
    </div>
  </div>
</template>

<script>
import BaseNotificationItem from '~/components/BaseNotificationItem.vue'
export default {
  components: { BaseNotificationItem },
  head() {
    return {
      title: 'Notification',
    }
  },
  methods: {
    deleteAllNoti() {
      this.$store.commit('DELETE_ALL_NOTIFICATION')
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
