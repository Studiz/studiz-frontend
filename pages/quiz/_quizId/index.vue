<template>
  <layout-quiz
    :currentStatus="currentStatus"
    :renderQuestionTime="time"
    @time-expired="checkAnswer"
  >
    <div v-if="currentStatus == 'countdown'">
      <the-count-down />
    </div>

    <div
      v-if="currentStatus == 'question'"
      class="md:h-[calc(100vh-calc(24px+60px))] flex flex-col gap-y-3"
    >
      <base-question-text :question="renderQuestion.question" />

      <base-question-layout-single
        v-if="renderQuestionType == 'single'"
        :question="renderQuestion"
        :backendAnswer="backendAnswer"
        @select-choice="selectChoice"
      />
      <base-question-layout-multiple v-if="renderQuestionType == 'multiple'" />
    </div>

    <div
      v-if="currentStatus == 'wating'"
      class="h-[calc(100vh-calc(24px+60px))] flex items-center justify-center"
    >
      <div
        class="inline-flex text-4xl font-bold items-end loading dark:loading"
      >
        Waiting Host
      </div>
    </div>

    <div v-if="currentStatus == 'leaderBoard'"></div>
  </layout-quiz>
</template>

<script>
import BaseQuestionLayoutMultiple from '~/components/quiz/BaseQuestionLayoutMultiple.vue'
import BaseQuestionLayoutSingle from '~/components/quiz/BaseQuestionLayoutSingle.vue'
import BaseQuestionText from '~/components/quiz/BaseQuestionText.vue'
import TheCountDown from '~/components/quiz/TheCountDown.vue'
import layoutQuiz from '~/layouts/layoutQuiz.vue'
export default {
  components: {
    layoutQuiz,
    BaseQuestionLayoutSingle,
    TheCountDown,
    BaseQuestionLayoutMultiple,
    BaseQuestionText,
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
      backendAnswer: null,
      time: 0,
    }
  },
  methods: {
    changeStatus(stutus) {
      this.currentStatus = stutus
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
      this.userSelected = data
    },
    checkAnswer() {
      this.backendAnswer = 0
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
  created() {
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

.loading:after {
  content: ' .';
  animation: dotsLight 1s steps(5, end) infinite;
}

.dark .dark\:loading:after {
  content: ' .';
  animation: dotsDark 1s steps(5, end) infinite;
}

@keyframes dotsLight {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: black;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 black, 0.5em 0 0 black;
  }
}

@keyframes dotsDark {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: white;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 white;
  }
}
</style>
