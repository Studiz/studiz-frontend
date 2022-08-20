<template>
  <div>
    <v-app-bar
      fixed
      app
      flat
      class="drop-shadow-md"
      height="60"
      dense
      color="background"
    >
      <div class="flex items-center justify-between gap-x-2">
        <v-btn
          v-if="!isFullScreen"
          color="primary"
          id="theme"
          rounded
          icon
          @click="openFullscreen"
        >
          <v-icon>$vuetify.icons.full_screen</v-icon>
        </v-btn>
        <v-btn
          v-else
          color="primary"
          id="theme"
          rounded
          icon
          @click="closeFullscreen"
        >
          <v-icon>$vuetify.icons.normal_screen</v-icon>
        </v-btn>
        <light-dark-mode />
        <!-- <v-spacer class="hidden sm:inline-flex"></v-spacer> -->
        <quiz-progress-bar />
        <!-- <v-spacer class="hidden sm:inline-flex"></v-spacer> -->
        <span class="hidden whitespace-nowrap sm:inline-block">
          {{
            user
              ? user.displayName
                ? user.displayName
                : user.firstName
              : 'User Guest'
          }}
        </span>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import lightDarkMode from './light-dark-mode.vue'
import QuizProgressBar from './quizProgressBar.vue'
export default {
  components: { lightDarkMode, QuizProgressBar },
  data() {
    return {
      isFullScreen: false,
    }
  },
  methods: {
    openFullscreen() {
      const elem = document.documentElement
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen()
      }
      this.isFullScreen = true
    },

    closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      this.isFullScreen = false
    },
    checkFullScreen() {
      const elem = document.documentElement
      if (
        elem.requestFullscreen ||
        elem.webkitRequestFullscreen ||
        elem.msRequestFullscreen
      ) {
        this.isFullScreen = false
      } else {
        this.isFullScreen = true
      }
      console.log('isFullScreen', this.isFullScreen)
    },
  },
  mounted() {
    document.addEventListener('fullscreenchange', this.checkFullScreen())
  },
}
</script>

<style></style>
