<template>
  <div>
    <v-app-bar
      fixed
      app
      flat
      class="drop-shadow-md relative"
      height="60"
      dense
      color="background_card"
    >
      <div class="flex items-center gap-x-2">
        <div class="d-none d-md-inline-flex">
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
        </div>
        <div class="d-none d-md-inline-flex">
          <light-dark-mode />
        </div>
        <v-spacer></v-spacer>
        <quiz-progress-bar v-if="!isLobby" />
        <v-spacer></v-spacer>
        <div v-if="userRole == 'TEACHER'" class="inline-flex gap-x-2">
          <!-- <v-btn outlined>End</v-btn> -->
          <v-btn color="primary" class="px-3">Start</v-btn>
        </div>
        <div
          v-else
          class="whitespace-nowrap space-x-3 inline-flex items-center"
        >
          <span class="hidden sm:inline-flex"> {{ user }} </span>
          <v-btn v-if="isRouterLobby" color="error">Leave</v-btn>
        </div>
      </div>
      <div
        class="absolute bottom-0 left-0 w-full h-1 secondary timer transition-all ease-linear rounded-r-full opacity-100"
        :style="{ 'transition-duration': timer / 1000 + 's' }"
      ></div>
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
      eventFullscreen: null,
      timer: 3 * 60 * 1000,
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
    userRole() {
      return this.$store.getters.userRole
    },
    isRouterLobby() {
      return this.$route.name == 'lobby'
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
    timerProgress() {
      let x = setInterval(() => {
        this.timer = this.timer - 1000
        var minutes = Math.floor((this.timer % (1000 * 60 * 60)) / (1000 * 60))
        var seconds = Math.floor((this.timer % (1000 * 60)) / 1000)

        document.getElementById('text-timer').innerHTML =
          (minutes ? minutes + 'm ' : '') + seconds + 's'
        if (this.timer < 0) {
          clearInterval(x)
          document.getElementById('text-timer').innerHTML = 'Expired'
        }
      }, 1000)

      const elem = document.querySelector('.timer')
      elem.style.width = '100%'
      setTimeout(() => {
        elem.style.width = '0%'
      }, 0)
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
  },
  mounted() {
    var minutes = Math.floor((this.timer % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((this.timer % (1000 * 60)) / 1000)
    document.getElementById('text-timer').innerHTML =
      (minutes ? minutes + 'm ' : '') + seconds + 's'

    this.timerProgress()
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        this.isFullScreen = true
      } else {
        this.isFullScreen = false
      }
    })
  },
  created() {},
}
</script>

<style></style>
