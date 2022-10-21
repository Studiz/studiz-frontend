<template>
  <div>
    <h1 class="text-H1">Notification</h1>

    <v-divider class="my-5" />

    <base-notification-item
      v-for="(notification,i) in this.$store.getters.notifications"
      :key="`${notification.classRoomId}-${i}`"
      :notification="notification"
    />
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
}
</script>

<style></style>
