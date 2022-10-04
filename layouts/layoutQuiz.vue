<template>
  <v-app>
    <quiz-navbar
      :currentStatus="currentStatus"
      @leave-room="$emit('leave-room', $event)"
      @start-game="$emit('start-game', $event)"
      @end-game="$emit('end-game', $event)"
    />
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import QuizNavbar from '~/components/navbar/quizNavbar.vue'
export default {
  components: { QuizNavbar },
  props: {
    currentStatus: {
      type: String,
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
