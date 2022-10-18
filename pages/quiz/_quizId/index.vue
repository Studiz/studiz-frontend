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
      :class="
        renderQuestionType === 'true/false'
          ? 'h-[calc(100vh-calc(24px+60px))]'
          : ''
      "
    >
      <base-question-text :question="renderQuestion.question" />

      <base-question-layout-single
        v-if="renderQuestionType === 'single'"
        :question="renderQuestion"
        :backendAnswer="backendAnswer"
        @select-choice="selectChoice"
      />
      <base-question-layout-multiple
        v-if="renderQuestionType === 'multiple'"
        :question="renderQuestion"
        :backendAnswer="backendAnswer"
        @select-multi-choice="selectChoice"
      />
      <base-question-layout-true-false
        v-if="renderQuestionType === 'true/false'"
        :question="renderQuestion"
        :backendAnswer="backendAnswer"
        @select-multi-choice="selectChoice"
      />
      <base-question-layout-poll
        v-if="renderQuestionType === 'poll'"
        :question="renderQuestion"
        :backendAnswer="backendAnswer"
        @select-multi-choice="selectChoice"
      />
      <base-question-layout-sort
        v-if="renderQuestionType === 'sort'"
        :question="renderQuestion"
        :backendAnswer="backendAnswer"
        @select-choice="selectChoice"
      />
    </div>

    <the-waiting v-if="currentStatus === 'wating'" />

    <the-leader-board v-if="currentStatus === 'leaderBoard'" :membersInClass="membersInClass" />
  </layout-quiz>
</template>

<script>
import BaseQuestionLayoutMultiple from '~/components/quiz/BaseQuestionLayoutMultiple.vue'
import BaseQuestionLayoutPoll from '~/components/quiz/BaseQuestionLayoutPoll.vue'
import BaseQuestionLayoutSingle from '~/components/quiz/BaseQuestionLayoutSingle.vue'
import BaseQuestionLayoutSort from '~/components/quiz/BaseQuestionLayoutSort.vue'
import BaseQuestionLayoutTrueFalse from '~/components/quiz/BaseQuestionLayoutTrueFalse.vue'
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
    BaseQuestionLayoutTrueFalse,
    BaseQuestionLayoutPoll,
    BaseQuestionLayoutSort,
  },
  layout: 'layoutFree',
  data() {
    return {
      currentQuestion: 0,
      totalQuestions: 5,
      currentStatus: 'countdown',

      prepareQuestion: {
        image: 'https://picsum.photos/200/300',
        time: 1000,
        answer: {
          options: [
            {
              option: 'sadd',
              index: 0,
            },
            {
              option: 'asd',
              index: 1,
            },
            {
              option: 'sadsad',
              index: 2,
            },
            {
              option: 'ffasd',
              index: 3,
            },
          ],
        },
        question: 'Look at the shaded model. Which number sentence is true?',
        type: 'sort',
      },
      question: {},
      userSelected: null,
      prepareBackendAnswer: 1,
      backendAnswer: null,
      time: 0,
      timeInterval: null,
      timeAnswer: 0,
      membersInClass: [],
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
        socket.emit('send-leaderboard', {
          quizId: this.$route.params.quizId,
        })
      }
      if (this.currentStatus === 'leaderBoard') {
        socket.emit('send-next-question', {
          quizId: this.$route.params.quizId,
        })
      }
    },
    resetDataQuiz() {
      this.userSelected = null
      this.prepareBackendAnswer = null
      this.backendAnswer = null
      this.time = 0
      this.timeInterval = null
      this.timeAnswer = 0
      this.membersInClass = []
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

    socket.on('show-leaderboard', (data) => {
      this.changeStatus('leaderBoard')
      this.membersInClass = data
    })

    socket.on('show-next-question', (data) => {
      this.$store.commit('setCurrentPage', data.currentQuestion)
      this.currentStatus = 'countdown'
      this.countDownTree()
      this.prepareQuestion = data
      this.resetDataQuiz()
    })

    socket.on('show-leaderboard-summary', (data) => {
      // this.currentStatus = 'leaderBoard'
      // this.membersInClass = data
      this.$router.push({
        name: 'summary-quizId',
        params: {
          quizId: this.$route.params.quizId,
          membersInClass: data,
        },
      })
    })
  },
  created() {
    if (this.$route.params.quizId !== 'quiztest') {
      this.prepareQuestion = this.$route.params.questionData
    }
    this.countDownTree()
    // this.currentStatus = 'leaderBoard'
  },
}
</script>

<style scoped>
.scrollbar {
  overflow: auto;
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
