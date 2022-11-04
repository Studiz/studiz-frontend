<template>
  <layout-quiz
    :currentStatus="'lobby'"
    @leave-room="leaveRoom"
    @start-game="startGame"
    @end-game="endGame"
  >
    <div class="space-y-3 xl:space-y-5">
      <v-card
        v-if="userRole == 'TEACHER'"
        flat
        class="primary_shade rounded-lg p-3 !max-w-6xl mx-auto overflow-hidden drop-shadow-md space-y-3"
      >
        <div class="flex items-start justify-center gap-3">
          <div class="inline-flex flex-col">
            <span>GAME PIN:</span>
            <span class="!text-6xl !font-bold select-all">{{ pinCode }}</span>
          </div>

          <v-tooltip
            :open-on-hover="false"
            :open-on-focus="false"
            :open-on-click="true"
            v-model="showTooltip"
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                class="self-center"
                @click="copyToClipboard(pinCode)"
              >
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </template>
            <span>Copied!!</span>
          </v-tooltip>
        </div>

        <div class="flex justify-between flex-wrap">
          <div class="inline-flex flex-wrap p-3 gap-3">
            <v-img
              contain
              class="rounded-lg background_card w-[60px] h-[60px]"
              :src="quizData?.image"
              max-width="60px"
            />
            <div class="font-semibold">
              <div class="text-H2">{{ quizData?.title }}</div>
              <div>Questions ({{ totalQuestion }})</div>
            </div>
            <div>
              <v-chip
                label
                outlined
                v-for="tag in quizData?.tags"
                :key="tag"
                class="shadow-sm mr-2"
                >{{ tag }}</v-chip
              >
            </div>
          </div>
          <div class="flex-wrap inline-flex gap-x-3 p-3 self-end h-fit">
            <!-- <span class="h-1 w-1 bg-gray-500 rounded-xl self-center" /> -->
            <div>Update: {{ quizData?.lastUpdated }}</div>
          </div>
        </div>
      </v-card>

      <v-card
        v-else
        flat
        class="primary_shade rounded-lg p-3 !max-w-6xl mx-auto overflow-hidden drop-shadow-md"
      >
        <div class="md:flex">
          <v-img
            class="rounded-lg background_card w-full h-auto mx-auto"
            :src="quizData?.image"
            max-height="150px"
            max-width="150px"
          ></v-img>
          <div>
            <v-card-title class="!py-0">{{ quizData?.title }}</v-card-title>
            <v-card-text v-if="quizData?.description">{{
              quizData?.description
            }}</v-card-text>
            <div class="mx-3">
              <v-chip
                label
                outlined
                v-for="tag in quizData?.tags"
                :key="tag"
                class="shadow-sm mr-2"
                >{{ tag }}</v-chip
              >
            </div>
          </div>
          <div class="flex md:flex-col items-end flex-wrap justify-between">
            <v-card-subtitle class="whitespace-nowrap text-end !font-semibold"
              >Questions ({{ totalQuestion }})</v-card-subtitle
            >
            <div
              class="whitespace-nowrap inline-flex px-4 pb-4 gap-x-3 items-end md:justify-end"
            >
              <v-img
                class="rounded-full primary"
                :src="quizData?.teacher.imageUrl"
                height="48px"
                width="48px"
              ></v-img>
              <div>
                <div>{{ quizData?.teacher.displayName }}</div>
                <div>{{ quizData?.lastUpdated }}</div>
              </div>
            </div>
          </div>
        </div>
      </v-card>

      <div class="flex flex-wrap gap-3 justify-center items-center">
        <div
          v-for="member in members"
          :key="member.memberId"
          class="group background_card drop-shadow-md h-16 w-full sm:w-80 rounded-lg items-center p-2 gap-x-2 inline-flex transition-all"
        >
          <v-avatar size="46">
            <v-img :src="member.imageUrl" v-if="member?.imageUrl" />
            <v-icon x-large v-else>mdi-account-circle</v-icon>
          </v-avatar>
          <div class="line-clamp-2 w-full" v-if="member">
            {{ member.displayName }}
          </div>
          <v-btn
            v-if="userRole == 'TEACHER'"
            color="erroraaa"
            text
            small
            class="group-hover:visible group-hover:w-auto group-hover:h-auto invisible w-0 h-0"
            >leave</v-btn
          >
        </div>
      </div>
    </div>
  </layout-quiz>
</template>

<script>
import LayoutQuiz from '~/layouts/layoutQuiz.vue'
import TeacherService from '~/services/TeacherService'
import StudentService from '~/services/StudentService'
import { v4 as uuidv4 } from 'uuid'
import socket from '~/plugins/socket.io'

export default {
  layout: 'layoutFree',
  components: { LayoutQuiz },
  head() {
    return {
      title: this.renderQuizName,
      titleTemplate: '%s - Lobby',
    }
  },
  data() {
    return {
      members: [],
      showTooltip: false,
    }
  },
  methods: {
    initGame() {
      socket.emit('init-game', {
        quizId: this.$route.params.quizId,
        quizData: this.quizData,
      })
    },
    joinRoom() {
      if (!localStorage.getItem('memberId')) {
        let memberId = uuidv4()
        localStorage.setItem('memberId', memberId)
      }
      if (this.userRole === 'STUDENT') {
        socket.emit('join-lobby', {
          quizId: this.$route.params.quizId,
          user: this.$store.getters.user,
          memberId: localStorage.getItem('memberId'),
          socketId: socket.id,
          quizData: [],
          totalScore: 0,
        })
      } else {
        socket.emit('join-lobby', {
          quizId: this.$route.params.quizId,
          user: {
            displayName: this.$route.params.displayName
              ? this.$route.params.displayName
              : localStorage.getItem('displayName'),
            imageUrl: '',
            role: 'GUEST',
          },
          memberId: localStorage.getItem('memberId'),
          socketId: socket.id,
          quizData: [],
          totalScore: 0,
        })
      }
    },
    leaveRoom() {
      if (confirm('Do you want to leave the room?')) {
        socket.emit('leave-lobby', {
          quizId: this.$route.params.quizId,
          memberId: localStorage.getItem('memberId'),
        })
        localStorage.removeItem('memberId')
        localStorage.removeItem('displayName')
        this.$router.push('/')
      }
    },
    startGame() {
      socket.emit('start-game', {
        quizId: this.$route.params.quizId,
      })
    },
    endGame() {
      socket.emit('end-game', {
        quizId: this.$route.params.quizId,
      })
    },
    copyToClipboard(data) {
      navigator.clipboard.writeText(data)
      this.showTooltip = true
      setTimeout(() => {
        this.showTooltip = false
      }, 2000)
    },
    randomItems() {
      console.log(this.totalQuestion)
      StudentService.randomItems(Math.floor(this.totalQuestion / 5)).then(
        (response) => {
          console.log(response.data)
        }
      )
    },
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole
    },
    totalQuestion() {
      return this.quizData?.totalQuestion
    },
    quizData() {
      return this.$store.getters.quizData
    },
    pinCode() {
      return this.$store.getters.pinCode
    },
    renderQuizName() {
      return this.quizData?.title
    },
  },
  destroyed() {
    // if (confirm('Do you want to leave the room?')) {
    //   socket.disconnect()
    // }
  },
  mounted() {
    console.log(this.$route.name)
    socket.on('joined', (data) => {
      this.members = data.map((member) => member.user)
    })

    socket.on('move-to-quiz', (data) => {
      this.$router.push({
        name: 'quiz-quizId',
        params: {
          quizId: this.$route.params.quizId,
          questionData: data,
        },
      })
    })

    socket.on('quiz-end', () => {
      this.$store.commit('TOGGLE_ALERT', {
        type: 'info',
        message: 'The quiz already ended',
      })
      this.$router.push('/')
      localStorage.removeItem('displayName')
      localStorage.removeItem('memberId')
    })

    socket.on('move-to-home', () => {
      this.$store.commit('TOGGLE_ALERT', {
        type: 'info',
        message: 'The quiz has been ended by the teacher',
      })
      this.$router.push('/')
      localStorage.removeItem('displayName')
      localStorage.removeItem('memberId')
    })
  },
  created() {
    this.$store.commit('TOGGLE_LOADING', true)
    if (this.userRole === 'TEACHER') {
      TeacherService.getQuizById(this.$route.params.quizId)
        .then((res) => {
          this.$store.commit('setPinCode', res.data.pinCode)
          this.$store.commit('setQuizData', res.data.quizTemplate)
          this.$store.commit('setClassroomId', res.data.classroomId)
          this.$store.commit('setStartAt', res.data.startAt)
          this.$store.commit('TOGGLE_LOADING', false)
          this.initGame()
          this.$store.commit('TOGGLE_ALERT', {
            type: 'success',
            message: 'Quiz created',
          })
        })
        .catch((err) => {
          this.$store.commit('TOGGLE_LOADING', false)
          this.$store.commit('TOGGLE_ALERT', {
            type: 'error',
            message: err.response.message,
          })
        })
    } else {
      StudentService.getQuizById(this.$route.params.quizId)
        .then((res) => {
          this.$store.commit('setPinCode', res.data.pinCode)
          this.$store.commit('setQuizData', res.data.quizTemplate)
          this.joinRoom()
          this.$store.commit('TOGGLE_LOADING', false)
          this.$store.commit('TOGGLE_ALERT', {
            type: 'success',
            message: 'Joined',
          })
          this.randomItems()
        })
        .catch((err) => {
          if (err.response.status === 400) {
            this.$store.commit('TOGGLE_LOADING', false)
            this.$store.commit('TOGGLE_ALERT', {
              type: 'info',
              message: err.response.data,
            })
          } else {
            this.$store.commit('TOGGLE_LOADING', false)
            this.$store.commit('TOGGLE_ALERT', {
              type: 'error',
              message: err.response.data,
            })
          }
          this.$router.push('/')
        })
    }
  },
}
</script>

<style lang="scss" scoped></style>
