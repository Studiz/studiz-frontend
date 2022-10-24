<template>
  <div>
    <h1 class="text-H1">Notification</h1>

    <v-divider class="my-5" />

    <div v-if="notifications.length > 0">
      <base-notification-item
        v-for="(notification, i) in notifications"
        :key="`${notification.classRoomId}-${i}`"
        :notification="notification"
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
  computed: {
    notifications() {
      return this.$store.getters.notifications
    },
  },
}
</script>

<style></style>
