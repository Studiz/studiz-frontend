<template>
  <div>
    <v-alert
      :value="isAlertActive"
      dismissible
      prominent
      shaped
      transition="slide-x-reverse-transition"
      :type="alertType"
      class="z-50"
    >{{alertMessage}}</v-alert>
  </div>
</template>

<script>
export default {
  computed: {
    isAlertActive() {
      return this.$store.state.isAlertActive
    },
    alertMessage() {
      return this.$store.state.alertInfo?.message
    },
    alertType() {
      return this.$store.state.alertInfo?.type
        ? this.$store.state.alertInfo.type
        : 'success'
    },
  },
}
</script>

<style scoped>
.v-alert {
  position: fixed;
  right: 1%;
  bottom: 1%;
}
</style>
