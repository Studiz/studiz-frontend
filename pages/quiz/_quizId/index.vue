<template>
  <layout-quiz
    :currentStatus="currentStatus"
    :renderQuestionTime="time"
    @next-question="nextQuestion"
    @time-expired="checkAnswer"
  >
    <the-count-down v-if="currentStatus === 'countdown'" />

    <div
      v-if="currentStatus === 'question'"
      class="md:h-[calc(100vh-calc(24px+60px))] flex flex-col gap-y-3"
    >
      <base-question-text :question="renderQuestion.question" />

      <base-question-layout-single
        v-if="renderQuestionType === 'single'"
        :question="renderQuestion"
        :backendAnswer="backendAnswer"
        @select-choice="selectChoice"
      />
      <base-question-layout-multiple v-if="renderQuestionType === 'multiple'" />
    </div>

    <the-waiting v-if="currentStatus === 'wating'" />

    <the-leader-board v-if="currentStatus === 'leaderBoard'" />
  </layout-quiz>
</template>

<script>
import BaseQuestionLayoutMultiple from '~/components/quiz/BaseQuestionLayoutMultiple.vue'
import BaseQuestionLayoutSingle from '~/components/quiz/BaseQuestionLayoutSingle.vue'
import BaseQuestionText from '~/components/quiz/BaseQuestionText.vue'
import TheCountDown from '~/components/quiz/TheCountDown.vue'
import TheLeaderBoard from '~/components/quiz/TheLeaderBoard.vue'
import TheWaiting from '~/components/quiz/TheWaiting.vue'
import layoutQuiz from '~/layouts/layoutQuiz.vue'
import socket from '~/plugins/socket.io'

export default {
  components: {
    layoutQuiz,
    BaseQuestionLayoutSingle,
    TheCountDown,
    BaseQuestionLayoutMultiple,
    BaseQuestionText,
    TheWaiting,
    TheLeaderBoard,
  },
  layout: 'layoutFree',
  data() {
    return {
      currentQuestion: 0,
      totalQuestions: 5,
      currentStatus: 'countdown',

      prepareQuestion: {
        index: 0,
        time: 1000,
        image:
          'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/1662913566784_L2FwcGhvc3RpbmdfcHJvZC9ibG9icy9BRW5CMlVwQnlmSUJxY05lOVlIM3R0eWFlMW5IaXJxS18xZzg4QllqTUw4TzNvcEstVEVlOUhVc2dOdmZ6REd3X0NVV2d5dE1Va0Jpd0w2LUw5RF9rQ2Q0ZHdHUE55TlJnUS5HWnVBa1pPSHVoX0FodTVy_900_900.png?alt=media&token=2c877977-766a-4152-84ff-d936c22b7d60',
        answer: {
          options: [
            {
              index: 0,
              option: '555555',
            },
            {
              index: 1,
              option: '11111111111',
            },
            {
              option: '3333333333333',
              index: 2,
            },
            {
              index: 3,
              option: '22222222222',
            },
            {
              index: 4,
              option: '44444444',
            },
          ],
        },
        question: 'Look at the shaded model.  Which number sentence is true?',
        type: 'single',
        fileImage: {},
      },
      question: {},
      userSelected: null,
      prepareBackendAnswer: null,
      backendAnswer: null,
      time: 0,
      timeInterval: null,
      timeAnswer: 0,
    }
  },
  watch: {
    currentStatus(newVal) {
      if (newVal == 'question') {
        this.timerProgress()
      }
    },
  },
  methods: {
    changeStatus(stutus) {
      this.currentStatus = stutus
    },
    timerProgress() {
      this.timeInterval = setInterval(() => {
        if (this.timeAnswer < this.prepareQuestion.time) {
          this.timeAnswer += 10
        } else {
          clearInterval(this.timeInterval)
        }
      }, 10)
    },
    countDownTree() {
      this.countDown = 3
      this.countDownInterval = setInterval(() => {
        this.countDown--
        if (this.countDown === 0) {
          clearInterval(this.countDownInterval)
          this.changeStatus('question')
          this.questionReady()
        }
      }, 1200)
    },
    questionReady() {
      this.question = this.prepareQuestion
      this.time = this.question.time
    },
    selectChoice(data) {
      clearInterval(this.timeInterval)
      data.quizId = this.$route.params.quizId
      data.timeAnswer = this.timeAnswer
      data.memberId = localStorage.getItem('memberId')
      socket.emit('select-choice', data)
      this.userSelected = data
    },
    checkAnswer() {
      this.backendAnswer = this.prepareBackendAnswer
    },
    nextQuestion() {
      if (this.currentStatus === 'question') {
        socket.emit('send-leader-board', {
          quizId: this.$route.params.quizId,
        })
      }
      if (this.currentStatus === 'leaderBoard') {
        this.currentStatus = 'countdown'
        this.time = null
        socket.emit('send-next-question', {
          quizId: this.$route.params.quizId,
        })
      }
      // if (this.currentStatus === 'leaderBoard') {
      //   this.currentQuestion++
      //   if (this.currentQuestion === this.totalQuestions) {
      //     this.$router.push({
      //       name: 'quiz-result',
      //       params: {
      //         quizId: this.$route.params.quizId,
      //       },
      //     })
      //   } else {
      //     this.changeStatus('countdown')
      //     this.countDownTree()
      //   }
      // }
      // this.currentStatus = 'leaderBoard'
    },
  },
  computed: {
    renderCurrentQuestion() {
      return this.question.index + 1
    },
    renderQuestionType() {
      return this.question.type
    },
    renderQuestion() {
      return this.question
    },
  },
  mounted() {
    socket.on('check-answer', (data) => {
      this.prepareBackendAnswer = data
    })

    socket.on('show-leader-board', (data) => {
      this.changeStatus('leaderBoard')
    })

    socket.on('show-next-question', (data) => {
      this.prepareQuestion = data
      console.log(this.prepareQuestion)
      this.countDownTree()
    })
  },
  created() {
    this.prepareQuestion = this.$route.params.questionData
    this.countDownTree()
  },
}
</script>

<style scoped>
.scrollbar {
  @apply overflow-auto;
}
.scrollbar::-webkit-scrollbar {
  width: 5px;
}
.scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 8px 8px;
}
.scrollbar::-webkit-scrollbar-thumb {
  background: var(--v-primary-base);
  border-radius: 50px;
}
.scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--v-primary-base);
  border-radius: 50px;
}
</style>
