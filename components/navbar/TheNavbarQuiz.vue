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
            rounded
            icon
            @click="openFullscreen"
          >
            <v-icon>$vuetify.icons.full_screen</v-icon>
          </v-btn>
          <v-btn v-else color="primary" rounded icon @click="closeFullscreen">
            <v-icon>$vuetify.icons.normal_screen</v-icon>
          </v-btn>
        </div>

        <div class="d-none d-md-inline-flex">
          <base-button-light-dark-mode />
        </div>

        <v-spacer />

        <the-quiz-progress-bar
          :key="currentStatus"
          :isShowTimer="!isLeaderBoardStatus"
          v-show="isQuestionStatus || isLeaderBoardStatus"
        />

        <div
          v-if="$store.getters.useItem"
          class="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex items-center"
        >
          <v-icon size="10" :color="$store.getters.useItem?.color">{{
            $store.getters.useItem?.icon
          }}</v-icon>
          <span
            class="text-[10px] font-medium"
            :class="`text-[${$store.getters.useItem?.color}]`"
            >{{ $store.getters.useItem?.name }}</span
          >
        </div>

        <v-spacer />

        <div v-if="userRole == 'TEACHER'" class="inline-flex gap-x-2">
          <v-btn outlined @click="endGame">End</v-btn>
          <v-btn
            color="primary"
            class="px-3"
            v-if="isLobbyStatus"
            @click="startGame"
            >Start</v-btn
          >
          <v-btn
            color="primary"
            class="px-3"
            v-if="isQuestionStatus || isLeaderBoardStatus"
            @click="nextQuestion"
            >Next</v-btn
          >
        </div>

        <div
          v-else
          class="whitespace-nowrap space-x-3 inline-flex items-center"
        >
          <span class="hidden sm:inline-flex">{{ user }}</span>
          <v-btn v-if="!isRouterQuiz" color="error" @click="leaveRoom"
            >Leave
          </v-btn>
        </div>
      </div>

      <div
        id="timer"
        v-show="isQuestionStatus"
        :key="isQuestionStatus"
        class="absolute bottom-0 left-0 w-full h-1 secondary transition-all ease-linear rounded-r-full opacity-100"
        :class="isTimeLimitOut ? 'w-0' : 'w-100'"
        :style="{ 'transition-duration': timeLimit / 1000 + 's' }"
      ></div>
    </v-app-bar>

    <the-items-inventory
      v-if="isRouteLobby && userRole == 'STUDENT'"
      @random-items="$emit('random-items', $event)"
    />
  </div>
</template>

<script>
import TheItemsInventory from '~/components/quizItemAssistant/TheItemsInventory.vue'
import BaseButtonLightDarkMode from './BaseButtonLightDarkMode.vue'
import TheQuizProgressBar from './TheQuizProgressBar.vue'
import socket from '~/plugins/socket.io'

export default {
  components: {
    TheQuizProgressBar,
    BaseButtonLightDarkMode,
    TheItemsInventory,
  },
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
        this.timeLimit = this.time
        this.isTimeLimitOut = false
        setTimeout(() => {
          this.setTextTime()
        }, 10)
        this.timerProgress()
      }
    },
    time(newVal) {
      if (newVal !== 0) {
        // this.timeLimit = this.time
        // setTimeout(() => {
        //   this.setTextTime()
        // }, 10)
        // this.timerProgress()
      }
    },
  },
  data() {
    return {
      isFullScreen: false,
      isLobby: false,
      eventFullscreen: null,
      timeLimit: null,
      isTimeLimitOut: false,
      m: null,
      s: null,
      timeInterval: null,
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
    isLobbyStatus() {
      return this.currentStatus === 'lobby'
    },
    isQuestionStatus() {
      return this.currentStatus === 'question'
    },
    isLeaderBoardStatus() {
      return this.currentStatus === 'leaderBoard'
    },
    isSummaryStatus() {
      return this.currentStatus === 'summary'
    },
    isRouteLobby() {
      return this.$route.name === 'lobby-quizId'
    },
    isIntroQuestionStatus() {
      return this.currentStatus === 'introQuestion'
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
      this.timeInterval = setInterval(() => {
        this.timeLimit = this.timeLimit - 1000
        this.setTextTime()
        if (this.timeLimit < 0) {
          document.getElementById('text-timer').innerHTML = 'Expired'
          this.$nuxt.$emit('remove-time-interval')
          this.$emit('time-expired')
        }
      }, 1000)

      setTimeout(() => {
        this.isTimeLimitOut = true
      }, 10)
    },

    setTextTime() {
      this.m = Math.floor((this.timeLimit % (1000 * 60 * 60)) / (1000 * 60))
      this.s = Math.floor((this.timeLimit % (1000 * 60)) / 1000)
      if (document.getElementById('text-timer')) {
        document.getElementById('text-timer').innerHTML =
          (this.m ? this.m + 'm ' : '') + this.s + 's'
      }
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
      if (confirm('Are you sure to end this game?')) {
        socket.emit('end-game', {
          quizId: this.$route.params.quizId,
        })
      }
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

  created() {
    this.$nuxt.$on('remove-time-interval', () => {
      clearInterval(this.timeInterval)
      this.m = null
      this.s = null
      this.timeInterval = null
      this.$nuxt.$emit('time-expired', true)
    })
  },

  destroyed() {
    this.$nuxt.$off('remove-time-interval')
  },
}
</script>

<style></style>
