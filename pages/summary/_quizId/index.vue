<template>
  <layout-quiz
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
          <v-btn icon class="self-center" @click="copyToClipboard(pinCode)">
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </div>
        <div class="flex justify-between flex-wrap">
          <div class="inline-flex flex-wrap p-3 gap-3">
            <v-img
              class="rounded-lg primary w-full h-auto"
              :src="quizData?.image"
              max-height="60px"
              max-width="60px"
            />
            <div class="font-semibold">
              <div class="text-H2">{{ quizData?.title }}</div>
              <div>Questions ({{ totalQuestion }})</div>
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
            class="rounded-lg primary w-full h-auto mx-auto"
            :src="quizData?.image"
            max-height="150px"
            max-width="150px"
          ></v-img>
          <div>
            <v-card-title>{{ quizData?.title }}</v-card-title>
            <v-card-text>{{ quizData?.description }}</v-card-text>
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
                max-height="48px"
                max-width="48px"
              ></v-img>
              <div>
                <div>{{ quizData?.teacher.displayName }}</div>
                <div>{{ quizData?.lastUpdated }}</div>
              </div>
            </div>
          </div>
        </div>
      </v-card>

      <the-leader-board
        :membersInClass="membersInClass"
        :currentStatus="'summary'"
      />
    </div>
  </layout-quiz>
</template>

<script>
import LayoutQuiz from '~/layouts/layoutQuiz.vue'
import TheLeaderBoard from '~/components/quiz/TheLeaderBoard.vue'
import TeacherService from '~/services/TeacherService'
import StudentService from '~/services/StudentService'
import { v4 as uuidv4 } from 'uuid'
import socket from '~/plugins/socket.io'

export default {
  layout: 'layoutFree',
  components: { LayoutQuiz, TheLeaderBoard },
  data() {
    return {
      members: [],
      membersInClass: [],
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
            displayName: this.$route.params.displayName,
            imageUrl:
              'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/Studiz_logo.svg?alt=media&token=556fa651-57d6-4877-a211-51ded3b82dcb',
            role: 'Guest',
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
  },
  destroyed() {
    // if (confirm('Do you want to leave the room?')) {
    //   socket.disconnect()
    // }
  },
  mounted() {
    this.membersInClass = this.$route.params.membersInClass
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

    socket.on('move-to-home', () => {
      this.$store.commit('TOGGLE_ALERT', {
        type: 'info',
        message: 'The quiz has been ended by the teacher',
      })
      this.$router.push('/')
      localStorage.removeItem('memberId')
    })
  },
  created() {
    if (this.userRole === 'TEACHER') {
      TeacherService.getQuizById(this.$route.params.quizId).then((res) => {
        this.$store.commit('setPinCode', res.data.pinCode)
        this.$store.commit('setQuizData', res.data.quizTemplate)
        this.initGame()
      })
    } else {
      StudentService.getQuizById(this.$route.params.quizId).then((res) => {
        this.$store.commit('setPinCode', res.data.pinCode)
        this.$store.commit('setQuizData', res.data.quizTemplate)
        this.joinRoom()
      })
    }
  },
}
</script>

<style lang="scss" scoped></style>
