<template>
  <layout-quiz
    :currentStatus="currentStatus"
    :renderQuestionTime="time"
    @next-question="nextQuestion"
    @time-expired="checkAnswer"
  >
    <the-count-down v-if="currentStatus === 'countdown'" />

    <div
      v-if="currentStatus === 'introQuestion'"
      class="h-[calc(100vh-calc(24px+60px))] flex items-center"
    >
      <base-question-text
        :question="renderQuestion.question"
        :key="currentStatus"
        class="w-full text-center"
      >
        <div
          id="question-timer"
          class="absolute bottom-0 left-0 h-1 secondary transition-all ease-linear rounded-r-full opacity-100"
          :class="
            isTimerToShowQuestion !== null
              ? isTimerToShowQuestion
                ? 'w-full'
                : 'w-0'
              : 'w-full'
          "
          :style="{ 'transition-duration': '5000ms' }"
        ></div
      ></base-question-text>
    </div>

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
        :numberOfAnswer="numStudentAnswer"
        @select-choice="selectChoice"
      />
      <base-question-layout-multiple
        v-if="renderQuestionType === 'multiple'"
        :question="renderQuestion"
        :backendAnswer="backendAnswer"
        :numberCanSelectedAnswer="prepareQuestion?.numAnswers"
        :numberOfAnswer="numStudentAnswer"
        @select-multi-choice="selectChoice"
      />
      <base-question-layout-true-false
        v-if="renderQuestionType === 'true/false'"
        :question="renderQuestion"
        :backendAnswer="backendAnswer"
        :numberOfAnswer="numStudentAnswer"
        @select-choice="selectChoice"
      />
      <base-question-layout-poll
        v-if="renderQuestionType === 'poll'"
        :question="renderQuestion"
        :backendAnswer="backendAnswer"
        :numberOfAnswer="numStudentAnswer"
        @select-choice="selectChoice"
      />
      <base-question-layout-sort
        v-if="renderQuestionType === 'sort'"
        :question="renderQuestion"
        :backendAnswer="backendAnswer"
        :numberOfAnswer="numStudentAnswer"
        @select-choice="selectChoice"
      />
    </div>

    <the-waiting v-if="currentStatus === 'wating'" />

    <the-leader-board
      v-if="currentStatus === 'leaderBoard'"
      :membersInClass="membersInClass"
    />

    <lottie-player
      class="absolute"
      :class="positionImageMeme[indaxPosition]"
      v-if="currentStatus === 'leaderBoard'"
      style="width: 200px !important; height: 200px !important"
      autoplay
      loop
      :src="imagesMeme[indaxImageMeme]"
    />
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
  head() {
    return {
      title: 'Quiz',
    }
  },
  data() {
    return {
      currentQuestion: 0,
      totalQuestions: 5,
      currentStatus: 'countdown',
      positionImageMeme: ['right-14', 'left-14'],
      indaxPosition: 0,
      indaxImageMeme: 0,
      imagesMeme: [
        'https://assets2.lottiefiles.com/packages/lf20_nc99k6bp.json',
        'https://assets7.lottiefiles.com/packages/lf20_bdzc21c8.json',
        'https://assets9.lottiefiles.com/packages/lf20_sxh1eqfy.json',
        'https://assets5.lottiefiles.com/packages/lf20_8ptubsmp.json',
        'https://assets10.lottiefiles.com/packages/lf20_iqxl5bjr.json',
        'https://assets3.lottiefiles.com/packages/lf20_zboivc9e.json',
      ],
      prepareQuestion: {
        image:
          'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/1662831260125_280293376_521951536307306_1630564870936868063_n.jpg?alt=media&token=22fd3e5c-6e08-4ff1-93ef-59e9bdd7389e',
        time: 3000,
        answer: {
          options: [
            {
              option: 'sadd Look at the shaded model.',
              index: 0,
            },
            {
              option: 'asd Look at the shaded model.',
              index: 1,
            },
            {
              option: 'sadsad Look at the shaded model.',
              index: 2,
            },
            {
              option: 'ffasd Look at the shaded model.',
              index: 3,
            },
          ],
        },
        question: 'Look at the shaded model. Which number sentence is true?',
        type: 'poll',
      },
      question: {},
      userSelected: null,
      prepareBackendAnswer: 1,
      backendAnswer: null,
      time: null,
      timeInterval: null,
      timeAnswer: 0,
      isTimerToShowQuestion: null,
      membersInClass: [],
      numStudentAnswer: 0,
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
      this.indaxImageMeme = Math.floor(Math.random() * this.imagesMeme.length)
      this.indaxPosition = Math.floor(
        Math.random() * this.positionImageMeme.length
      )
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
      let countDown = 3
      let countDownInterval1 = setInterval(() => {
        countDown--
        if (countDown === 0) {
          this.question = this.prepareQuestion
          this.changeStatus('introQuestion')
          this.countDownFive()
          clearInterval(countDownInterval1)
          setTimeout(() => {
            this.isTimerToShowQuestion = true
          }, 10)
        }
      }, 1200)
    },

    countDownFive() {
      setTimeout(() => {
        this.isTimerToShowQuestion = false
      }, 20)
      let countDown = 5
      let countDownInterval2 = setInterval(() => {
        countDown--
        if (countDown === 0) {
          this.questionReady()
          this.changeStatus('question')
          clearInterval(countDownInterval2)
        }
      }, 1000)
    },

    questionReady() {
      this.question = this.prepareQuestion
      this.time = this.question.time
    },
    selectChoice(data) {
      console.log(data)
      let answer = {}
      clearInterval(this.timeInterval)
      answer.answer = data
      answer.quizId = this.$route.params.quizId
      answer.timeAnswer = this.timeAnswer
      answer.memberId = localStorage.getItem('memberId')

      socket.emit('select-choice', answer)
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
        this.isTimerToShowQuestion = null
        this.$nuxt.$emit('remove-time-interval')
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
      this.isTimerToShowQuestion = null
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

    socket.on('show-poll-answer', (data) => {
      this.prepareBackendAnswer = data
    })

    socket.on('show-number-answers', (data) => {
      this.numStudentAnswer = data
    })

    socket.on('show-leaderboard', (data) => {
      this.changeStatus('leaderBoard')
      this.membersInClass = data
    })

    socket.on('show-next-question', (data) => {
      this.$store.commit('setCurrentPage', data.currentQuestion)
      this.$nuxt.$emit('remove-time-interval')
      this.currentStatus = 'countdown'
      this.countDownTree()
      this.prepareQuestion = data
      this.resetDataQuiz()
    })

    socket.on('show-quiz-summary', (data) => {
      this.changeStatus('leaderBoard')
      this.membersInClass = data
      this.$router.push({
        name: 'summary-quizId',
        params: {
          quizId: this.$route.params.quizId,
          summaryData: data,
          winnerId: data.members[0].memberId,
        },
      })
    })
  },
  created() {
    if (this.$route.params.quizId !== 'quiztest') {
      this.prepareQuestion = this.$route.params.questionData
    }
    this.countDownTree()
    // this.currentStatus = 'introQuestion'
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
