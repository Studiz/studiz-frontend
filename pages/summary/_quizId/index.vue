<template>
  <div class="space-y-3 xl:space-y-5 max-w-6xl mx-auto">
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
          :src="summaryData?.quizData?.image"
          class="rounded-lg background_card w-full h-auto mx-auto"
          contain
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
              class="rounded-full primary"
              :src="summaryData?.quizData?.teacher?.imageUrl"
              max-height="48px"
              max-width="48px"
            />
            <div>
              <div>{{ summaryData?.quizData?.teacher?.displayName }}</div>
              <div>{{ summaryData?.quizData?.lastUpdated }}</div>
            </div>
          </div>
        </div>
      </div>
    </v-card>

    <lottie-player
      v-if="isWinner"
      autoplay
      src="https://assets5.lottiefiles.com/private_files/lf30_ujs3c7ok.json"
      style="width: 500px"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />

    <!-- <div class="flex md:flex-row flex-col-reverse gap-3"> -->

    <v-card
      flat
      class="rounded-lg p-3 overflow-hidden drop-shadow-md flex-1 h-fit"
    >
      <div class="flex flex-row items-center justify-center">
        <v-img
          class="rounded-full primary"
          :src="summaryData?.leaderboard?.winner?.image"
          max-height="65px"
          max-width="65px"
        />
        <v-card-title
          >The winner is
          {{ summaryData?.leaderboard?.winner?.displayName }}</v-card-title
        >
        <div>
          <lottie-player
            autoplay
            loop
            src="https://assets3.lottiefiles.com/packages/lf20_touohxv0.json"
            style="width: 100px"
          />
        </div>
      </div>
      <div v-if="userRole !== 'TEACHER'">
        <v-card-subtitle>Your score {{ studentScore }}</v-card-subtitle>
        <v-card-text
          >Number of correct answers
          {{ numberCorrectAnswers ? numberCorrectAnswers : 0 }}/{{
            numberQuestions
          }}</v-card-text
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
      class="max-w-xl mx-auto background_card drop-shadow-md p-3 rounded-lg space-y-3"
      v-if="studentQuizData"
    >
      <div class="flex justify-between">
        <span class="text-lg font-semibold" v-if="userRole == 'TEACHER'">{{
          student?.user?.displayName
        }}</span>
        <span class="text-lg font-semibold">Score: {{ studentScore }}</span>
      </div>
      <div class="flex justify-between flex-wrap">
        <span>Correct: {{ numberCorrectAnswers }}</span>
        <span>Incorrect: {{ numberInCorrectAnswers }}</span>
      </div>
      <base-summry-question-item
        v-for="(question, index) in studentQuizData"
        :key="`${question}-${index}`"
        :index="index"
        :question="question"
      />
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
  data() {
    return {
      summaryData: {},
      membersInClass: [],
      studentQuizData: {},
      memberChosen: {},
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
  },
  destroyed() {
    // if (confirm('Do you want to leave the room?')) {
    //   socket.disconnect()
    // }
  },
  mounted() {
    // this.membersInClass = this.$route.params.summaryData?.leaderboard.members

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
    QuizService.getQuizHistoryByQuizId(this.$route.params.quizId).then(
      (res) => {
        this.summaryData = res.data
        this.membersInClass = this.summaryData?.members
        this.studentQuizData = this.student?.quizData
      }
    )
  },
}
</script>

<style lang="scss" scoped></style>
