<template>
  <div>
    <v-app-bar
      fixed
      app
      flat
      class="drop-shadow-md"
      height="60"
      dense
      color="background_card"
    >
      <div class="flex items-center gap-x-2">
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
        <v-spacer></v-spacer>
        <quiz-progress-bar v-if="!isLobby" />
        <v-spacer></v-spacer>
        <span class="hidden whitespace-nowrap sm:inline-block">{{ user }}</span>
      </div>
    </v-app-bar>
    <v-footer fixed color="transparent" padless v-if="false">
      <div class="primary p-3 rounded-lg w-fit mx-auto my-5">
        <v-btn
          color="black"
          x-large
          icon
          class="rounded-lg shadow-[inset_0px_4px_0px_#374151] bg-gray-500"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-footer>
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
      isLobby: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
        ? this.$store.getters.user.displayName
          ? this.$store.getters.user.displayName
          : this.$store.getters.user.firstName
        : 'User Guest'
    },
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
    if (this.$route.path.includes('lobby')) {
      this.isLobby = true
    }
  },
}
</script>

<style></style>
