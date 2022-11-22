<template>
  <div class="space-y-3 xl:space-y-5 max-w-6xl mx-auto mb-16 mb-md-0">
    <v-card
      v-if="userRole == 'TEACHER'"
      flat
      class="primary_shade rounded-lg p-3 overflow-hidden drop-shadow-md space-y-3"
    >
      <div class="flex justify-between flex-wrap">
        <div class="inline-flex flex-wrap p-3 gap-3">
          <v-img
            contain
            class="rounded-lg background_card w-[60px] h-[60px]"
            :src="summaryData?.quizData?.image"
            max-width="60px"
          />
          <div class="font-semibold">
            <div class="text-H2">{{ summaryData?.quizData?.title }}</div>
            <div>Questions ({{ summaryData?.quizData?.totalQuestion }})</div>
          </div>
          <div>
            <v-chip
              label
              outlined
              v-for="tag in summaryData?.quizData?.tags"
              :key="tag"
              class="shadow-sm mr-2"
              >{{ tag }}</v-chip
            >
          </div>
        </div>
        <div class="flex-wrap inline-flex gap-x-3 p-3 self-end h-fit">
          <!-- <span class="h-1 w-1 bg-gray-500 rounded-xl self-center" /> -->
          <div>Update: {{ summaryData?.quizData?.lastUpdated }}</div>
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
          :src="summaryData?.quizData?.image"
          max-height="150px"
          max-width="150px"
        ></v-img>
        <div>
          <v-card-title>{{ summaryData?.quizData?.title }}</v-card-title>
          <v-card-text>{{ summaryData?.quizData?.description }}</v-card-text>
          <div class="mx-3">
            <v-chip
              label
              outlined
              v-for="tag in summaryData?.quizData?.tags"
              :key="tag"
              class="shadow-sm mr-2"
              >{{ tag }}</v-chip
            >
          </div>
        </div>
        <div class="flex md:flex-col items-end flex-wrap justify-between">
          <v-card-subtitle class="whitespace-nowrap text-end !font-semibold"
            >Questions ({{
              summaryData?.quizData?.totalQuestion
            }})</v-card-subtitle
          >
          <div
            class="whitespace-nowrap inline-flex px-4 pb-4 gap-x-3 items-end md:justify-end"
          >
            <v-img
              class="rounded-full background_card"
              :src="summaryData?.quizData?.teacher?.imageUrl"
              height="48px"
              width="48px"
            />
            <div>
              <div>{{ summaryData?.quizData?.teacher?.displayName }}</div>
              <div>{{ summaryData?.quizData?.lastUpdated }}</div>
            </div>
          </div>
        </div>
      </div>
    </v-card>

    <div
      class="fixed top-0 left-0 right-0 bottom-0 z-50"
      v-if="isWinner && showAnimation"
    >
      <lottie-player
        autoplay
        src="https://assets5.lottiefiles.com/private_files/lf30_ujs3c7ok.json"
        style="width: 500px"
        class="mx-auto"
      />
    </div>

    <v-card
      flat
      color="background_card"
      class="rounded-lg p-3 overflow-hidden drop-shadow-md flex-1 h-fit"
    >
      <div
        class="flex flex-row items-center sm:justify-center relative gap-x-3"
      >
        <v-img
          class="rounded-full background_card w-16 h-16"
          :src="summaryData?.leaderboard?.winner?.image"
          max-width="64px"
        />
        <div class="py-4 text-lg md:text-xl lg:text-2xl">
          The winner is {{ summaryData?.leaderboard?.winner?.displayName }}
        </div>
        <div
          class="absolute -left-3 -bottom-3 sm:relative sm:left-0 sm:bottom-0"
        >
          <lottie-player
            autoplay
            loop
            src="https://assets3.lottiefiles.com/packages/lf20_touohxv0.json"
            class="p-px background_card rounded-full w-9 sm:w-24"
          />
        </div>
      </div>
      <div v-if="userRole !== 'TEACHER'">
        <v-card-subtitle>Your score : {{ studentScore }}</v-card-subtitle>
        <v-card-text
          >Number of correct answers :
          {{ numberCorrectAnswers ? numberCorrectAnswers : 0 }}/{{
            numberQuestions
          }}
          (Not include poll)</v-card-text
        >
      </div>
    </v-card>

    <the-summary-leader-board
      v-if="userRole == 'TEACHER'"
      :membersInClass="membersInClass"
      :currentStatus="'summary'"
      class="flex-1 w-full"
      @choose-member="chooseMember"
    />

    <the-leader-board
      v-else
      :membersInClass="summaryData?.leaderboard?.members"
      :currentStatus="'summary'"
      class="flex-1 w-full"
    />

    <div
      class="max-w-xl mx-auto background_card drop-shadow-md p-3 rounded-lg space-y-2"
      v-if="studentQuizData"
    >
      <div class="flex justify-between flex-col sm:flex-row flex-wrap gap-2">
        <span class="text-lg" v-if="userRole == 'TEACHER'">
          User: {{ student?.user?.displayName }}
        </span>
        <div class="text-lg">
          Score: <span class="font-semibold">{{ studentScore }}</span>
        </div>
      </div>
      <div class="flex justify-between flex-col flex-wrap gap-2">
        <span>✅ Correct: {{ numberCorrectAnswers }}</span>
        <span>❌ Incorrect: {{ numberInCorrectAnswers }}</span>
      </div>

      <div class="space-y-3">
        <base-summry-question-item
          v-for="(question, index) in studentQuizData"
          :key="`${question}-${index}`"
          :index="index"
          :question="question"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TheSummaryLeaderBoard from '~/components/TheSummaryLeaderBoard.vue'
import TheLeaderBoard from '~/components/quiz/TheLeaderBoard.vue'
import QuizService from '~/services/QuizService'
import socket from '~/plugins/socket.io'
import BaseSummryQuestionItem from '~/components/BaseSummryQuestionItem.vue'

export default {
  components: { TheLeaderBoard, TheSummaryLeaderBoard, BaseSummryQuestionItem },
  watch: {
    userRole: {
      handler: function (newVal, oldVal) {
        this.loadData()
      },
      deep: true,
    },
  },
  data() {
    return {
      summaryData: {},
      membersInClass: [],
      studentQuizData: {},
      memberChosen: {},
      timeoutWinner: null,
      showAnimation: false,
    }
  },
  methods: {
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
    endGame() {
      socket.emit('end-game', {
        quizId: this.$route.params.quizId,
      })
    },
    chooseMember(member) {
      this.memberChosen = this.summaryData?.members[member.index]
      this.studentQuizData = this.summaryData?.members[member.index]?.quizData
    },
    loadData() {
      this.$store.commit('TOGGLE_LOADING', true)
      QuizService.getQuizHistoryByQuizId(this.$route.params.quizId)
        .then((res) => {
          this.summaryData = res.data
          this.membersInClass = res.data.members.map((member) => {
            return {
              ...member,
              numberQuestions: res.data.quizData.numberQuestions,
            }
          })
          this.studentQuizData = this.student?.quizData
          this.$store.commit('TOGGLE_LOADING', false)
        })
        .catch((err) => {
          this.$store.commit('TOGGLE_LOADING', false)
          this.$store.commit('TOGGLE_ALERT', {
            type: 'error',
            message: err.response.data,
          })
        })
    },
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole
    },
    student() {
      if (this.userRole == 'TEACHER') {
        return this.memberChosen ? this.memberChosen : {}
      } else if (this.userRole == 'STUDENT') {
        return this.summaryData?.members?.find((member) => {
          return member.user?.uid === localStorage.getItem('uid')
        })
      } else {
        return localStorage.getItem('memberId')
          ? this.summaryData?.members?.find((member) => {
              return member.memberId === localStorage.getItem('memberId')
            })
          : {}
      }
    },
    studentScore() {
      return this.student?.totalScore
    },
    numberCorrectAnswers() {
      return this.student?.numberCorrectAnswers
    },
    numberInCorrectAnswers() {
      return this.student?.numberInCorrectAnswers
    },
    isWinner() {
      return this.$route.params.winnerId
        ? this.$route.params.winnerId === localStorage.getItem('memberId')
        : false
    },
    numberQuestions() {
      return this.summaryData?.quizData?.numberQuestions
    },
    haveStudentQuizData() {
      return Object.keys(this.studentQuizData).length
    },
    renderStudentQuizData() {
      return this.studentQuizData
    },
  },
  destroyed() {
    // if (confirm('Do you want to leave the room?')) {
    //   socket.disconnect()
    // }

    if (localStorage.getItem('displayName')) {
      localStorage.removeItem('memberId')
    } else {
      window.location.reload()
    }
  },

  mounted() {
    // this.membersInClass = this.$route.params.summaryData?.leaderboard.members
    this.loadData()
    this.showAnimation = true
    this.timeoutWinner = setTimeout(() => {
      this.showAnimation = false
    }, 5000)
  },
  created() {},
}
</script>

<style lang="scss" scoped></style>
