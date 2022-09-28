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
        <v-tooltip bottom v-if="!isFullScreen">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="primary"
              id="theme"
              rounded
              icon
              @click="openFullscreen"
            >
              <v-icon>$vuetify.icons.full_screen</v-icon>
            </v-btn>
          </template>
          <span>Full screen</span>
        </v-tooltip>
        <v-tooltip bottom v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="primary"
              id="theme"
              rounded
              icon
              @click="closeFullscreen"
            >
              <v-icon>$vuetify.icons.normal_screen</v-icon>
            </v-btn>
          </template>
          <span>Exit full screen</span>
        </v-tooltip>
        <light-dark-mode />
        <v-spacer></v-spacer>
        <quiz-progress-bar v-if="!isLobby" />
        <v-spacer></v-spacer>
        <div v-if="userRole == 'TEACHER'" class="space-x-2">
          <v-btn outlined>End</v-btn>
          <v-btn color="primary">Start</v-btn>
        </div>
        <div
          v-else
          class="whitespace-nowrap space-x-3 inline-flex items-center"
        >
          <span class="hidden sm:inline-flex">{{ user }}</span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon color="secondary" v-bind="attrs" v-on="on">
                <v-icon>mdi-exit-to-app</v-icon>
              </v-btn>
            </template>
            <span>Leave</span>
          </v-tooltip>
        </div>
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
      eventFullscreen: null,
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
}
</script>

<style></style>
