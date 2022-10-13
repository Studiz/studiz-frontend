<template>
  <div class="flex flex-col min-h-0 gap-3 flex-none md:flex-1">
    <base-question-image
      :questionImage="renderQuestionImage"
      :numberOfAnswer="numberOfAnswer"
    >
      <div
        class="absolute top-1/2 left-2 transform -translate-y-1/2 text-center p-4 rounded-full background_card drop-shadow-md -space-y-1 w-[100px] h-[100px] hidden md:block"
      >
        <div>Choose</div>
        <div class="font-semibold text-lg">{{ remainingAnswersToChoose }}</div>
        <div>{{ remainingAnswersToChoose >= 2 ? 'answers' : 'answer' }}</div>
      </div>
    </base-question-image>

    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-3 flex-none md:flex-1 h-full w-full"
    >
      <div
        class="md:hidden text-center p-4 rounded-full background_card drop-shadow-md col-span-full"
      >
        <span>Choose</span>
        <span class="font-semibold text-lg">{{
          remainingAnswersToChoose
        }}</span>
        <span>{{ remainingAnswersToChoose >= 2 ? 'answers' : 'answer' }}</span>
      </div>
      <button
        v-for="(item, i) in renderQuestion"
        class="rounded-lg drop-shadow-md p-3 flex justify-between items-center focus:no-underline"
        :key="`${i}-${item}`"
        :class="[
          arrayChoiceColor[i],
          item.status,
          selectedChoice.index == i
            ? 'ring ring-light_primary ring-offset-2 dark:ring-offset-dark_background '
            : '',
          selectedChoice.length === 0 && isStepShowAnswer
            ? 'opacity-100'
            : !selectedChoice.map((item) => item.index).includes(i) &&
              isStepShowAnswer
            ? 'opacity-50'
            : 'opacity-100',
          ,
        ]"
        @click="selectAnswer(item, i)"
      >
        <span class="text-lg leading-relaxed text-left">
          {{ item.option }}
        </span>
        <div class="h-10">
          <v-icon x-large v-if="item.status === 'incorrect'"
            >mdi-close-thick</v-icon
          >
          <v-icon x-large v-if="item.status === 'correct'"
            >mdi-check-bold</v-icon
          >
        </div>
      </button>
    </div>
    <!-- <div class="inline-flex">
      <v-spacer />
      <v-btn
        color="primary"
        elevation="0"
        height="48"
        :disabled="renderDisabledSummitButton"
        @click.once="summitAnswer"
      >
        <span class="normal-case text-lg font-semibold">Summit</span>
      </v-btn>
    </div> -->
  </div>
</template>

<script>
import BaseQuestionImage from './BaseQuestionImage.vue'
export default {
  components: { BaseQuestionImage },
  props: {
    question: {
      type: Object,
      required: true,
    },
    // ถ้าต่อ api ให้เอา comment ออก
    // backendAnswer: {
    //   type: Number,
    //   default: () => {
    //     return [0, 4, 1]
    //   },
    // },
    numberOfSelectedAnswer: {
      type: Number,
      default: 3,
    },
    numberOfAnswer: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    backendAnswer() {
      this.renderBackendAnswer()
    },
  },
  data() {
    return {
      arrayChoiceColor: ['red', 'blue', 'yellow', 'green', 'cyan', 'purple'],
      isTimeExpired: false,
      isStepShowAnswer: false,
      isSummitAnswer: false,
      selectedChoice: [],
      choice: [],
      remainingAnswersToChoose: this.numberOfSelectedAnswer,
      backendAnswer: [0, 4, 1], // ถ้าต่อ api ให้เอาออก
    }
  },
  methods: {
    selectAnswer(item, index) {
      const select = { item, index }
      if (!this.isTimeExpired && this.remainingAnswersToChoose > 0) {
        if (
          item.status !== 'selected' &&
          this.numberOfSelectedAnswer > this.selectedChoice.length
        ) {
          item.status = 'selected'
          this.selectedChoice.push(select)
          if (this.numberOfSelectedAnswer === this.selectedChoice.length) {
            this.summitAnswer()
          }
          this.remainingAnswersToChoose--
        } else {
          item.status = null
          this.selectedChoice = this.selectedChoice.filter(
            (item) => item.index !== index
          )
          this.remainingAnswersToChoose++
        }
      }
    },
    renderBackendAnswer() {
      this.isStepShowAnswer = true
      if (this.selectedChoice.length === 0) {
        this.choice.forEach((item) => {
          if (this.backendAnswer.includes(item.index)) {
            item.status = 'correct'
          } else {
            item.status = 'incorrect'
          }
        })
      } else {
        this.selectedChoice.forEach((item) => {
          if (this.backendAnswer.includes(item.index)) {
            item.item.status = 'correct'
          } else {
            item.item.status = 'incorrect'
          }
        })
      }
    },
    summitAnswer() {
      this.isSummitAnswer = true
      if (
        this.selectedChoice.length > 0 &&
        !this.isStepShowAnswer &&
        !this.isTimeExpired
      ) {
        this.$emit('select-multi-choice', this.selectedChoice)
      }
    },
  },
  computed: {
    renderQuestion() {
      return this.choice
    },
    addStatusForEachChoice() {
      return this.question.answer.options.map((item) => {
        return { ...item, status: null }
      })
    },
    renderQuestionImage() {
      return this.question.image
    },
    renderDisabledSummitButton() {
      return (
        this.selectedChoice.length === 0 ||
        this.isStepShowAnswer === true ||
        this.isTimeExpired === true ||
        this.isSummitAnswer === true
      )
    },
    findBackendAnswerFromChoice() {
      return this.choice.filter((item) => {
        return this.backendAnswer.includes(item.index)
      })
    },
  },
  created() {
    this.$nuxt.$on('time-expired', (prop) => {
      this.isTimeExpired = prop
    })
    this.choice = this.addStatusForEachChoice

    // ถ้าต่อ api ให้เอาออก {
    setTimeout(() => {
      this.renderBackendAnswer()
    }, 4000)
    // }
  },
  destroyed() {
    this.$nuxt.$off('time-expired')
  },
}
</script>

<style scoped>
.red {
  @apply !bg-red-300/50 dark:!bg-red-300/40;
  /* @apply md:hover:ring ring-red-300; */
}
.yellow {
  @apply !bg-yellow-300/50 dark:!bg-yellow-300/40;
  /* @apply md:hover:ring ring-yellow-300; */
}
.green {
  @apply !bg-green-300/50 dark:!bg-green-300/40;
  /* @apply md:hover:ring ring-green-300; */
}
.blue {
  @apply !bg-sky-300/50 dark:!bg-sky-300/40;
  /* @apply md:hover:ring ring-sky-300; */
}
.cyan {
  @apply !bg-cyan-300/50 dark:!bg-cyan-300/40;
  /* @apply md:hover:ring ring-cyan-300; */
}
.purple {
  @apply !bg-purple-300/50 dark:!bg-purple-300/40;
  /* @apply md:hover:ring ring-purple-300; */
}
.correct {
  @apply !bg-green-500/50 dark:!bg-green-500/40;
}
.incorrect {
  @apply !bg-red-500/50 dark:!bg-red-500/40;
}
.selected {
  @apply ring ring-blue-500;
}
</style>
