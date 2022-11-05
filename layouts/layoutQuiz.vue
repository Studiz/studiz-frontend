<template>
  <v-app>
    <the-alert-notification />
    <the-navbar-quiz
      :currentStatus="currentStatus"
      :time="renderQuestionTime"
      @leave-room="$emit('leave-room', $event)"
      @start-game="$emit('start-game', $event)"
      @next-question="$emit('next-question', $event)"
      @end-game="$emit('end-game', $event)"
      @time-expired="$emit('time-expired', $event)"
      @random-items="$emit('random-items', $event)"
    />
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TheNavbarQuiz from '~/components/navbar/TheNavbarQuiz.vue'
import TheAlertNotification from '~/components/TheAlertNotification.vue'
export default {
  components: { TheNavbarQuiz, TheAlertNotification },
  props: {
    currentStatus: {
      type: String,
    },
    renderQuestionTime: {
      type: Number,
    },
  },
}
</script>

<style lang="scss" scoped>
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
