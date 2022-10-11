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
          <v-btn v-if="!isFullScreen" color="primary" rounded icon @click="openFullscreen">
            <v-icon>$vuetify.icons.full_screen</v-icon>
          </v-btn>
          <v-btn v-else color="primary" rounded icon @click="closeFullscreen">
            <v-icon>$vuetify.icons.normal_screen</v-icon>
          </v-btn>
        </div>
        <div class="d-none d-md-inline-flex">
          <light-dark-mode />
        </div>
        <v-spacer></v-spacer>
        <quiz-progress-bar v-show="isQuestionStatus" />
        <v-spacer></v-spacer>
        <div v-if="userRole == 'TEACHER'" class="inline-flex gap-x-2">
          <!-- <v-btn outlined @click="endGame">End</v-btn> -->
          <v-btn color="primary" class="px-3" v-if="!isQuestionStatus" @click="startGame">Start</v-btn>
          <v-btn color="primary" class="px-3" v-if="isQuestionStatus" @click="nextQuestion">Next</v-btn>
        </div>
        <div v-else class="whitespace-nowrap space-x-3 inline-flex items-center">
          <span class="hidden sm:inline-flex">{{ user }}</span>
          <v-btn v-if="!isRouterQuiz" color="error" @click="leaveRoom">Leave</v-btn>
        </div>
      </div>
      <div
        v-show="isQuestionStatus"
        class="absolute bottom-0 left-0 w-full h-1 secondary timer transition-all ease-linear rounded-r-full opacity-100"
        :style="{ 'transition-duration': timeLimit / 1000 + 's' }"
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
  props: {
    time: {
      type: Number,
    },
    currentStatus: {
      type: String,
    },
  },
  watch: {
    currentStatus(newVal) {
      if (newVal == 'question') {
        this.timerProgress()
      }
    },
  },
  data() {
    return {
      isFullScreen: false,
      isLobby: false,
      eventFullscreen: null,
      timeLimit: 0,
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
        ? this.$store.getters.user.displayName
          ? this.$store.getters.user.displayName
          : this.$store.getters.user.firstName
        : localStorage.getItem('displayName')
    },
    userRole() {
      return this.$store.getters.userRole
    },
    isRouterQuiz() {
      return this.$route.name === 'quiz-quizId'
    },
    isQuestionStatus() {
      return this.currentStatus === 'question'
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
      this.timeLimit = this.time
      let setTextTime = () => {
        var m = Math.floor((this.timeLimit % (1000 * 60 * 60)) / (1000 * 60))
        var s = Math.floor((this.timeLimit % (1000 * 60)) / 1000)
        document.getElementById('text-timer').innerHTML =
          (m ? m + 'm ' : '') + s + 's'
      }
      setTextTime()

      let x = setInterval(() => {
        this.timeLimit = this.timeLimit - 1000
        setTextTime()
        if (this.timeLimit < 0) {
          clearInterval(x)
          document.getElementById('text-timer').innerHTML = 'Expired'
          this.$emit('time-expired')
          this.$nuxt.$emit('time-expired', true)
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

    leaveRoom() {
      this.$emit('leave-room')
    },
    startGame() {
      this.$emit('start-game')
    },
    nextQuestion() {
      this.$emit('next-question')
    },
    endGame() {
      this.$emit('end-game')
    },
  },

  mounted() {
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
