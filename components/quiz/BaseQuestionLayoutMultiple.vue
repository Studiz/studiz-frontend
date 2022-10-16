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
      class="grid grid-cols-1 md:grid-cols-2 gap-3 flex-none md:flex-1 h-full w-full auto-rows-fr"
    >
      <div
        class="md:hidden text-center p-4 rounded-full background_card drop-shadow-md col-span-full"
      >
        <span>Choose</span>
        <span class="font-semibold text-lg">
          {{ remainingAnswersToChoose }}
        </span>
        <span>{{ remainingAnswersToChoose >= 2 ? 'answers' : 'answer' }}</span>
      </div>

      <base-question-choice
        v-for="(item, i) in renderQuestion"
        :key="`${i}-${item}`"
        :index="i"
        :item="item"
        :arrayChoiceColor="arrayChoiceColor"
        @selectAnswer="selectAnswer"
      />
    </div>
  </div>
</template>

<script>
import BaseQuestionChoice from './BaseQuestionChoice.vue'
import BaseQuestionImage from './BaseQuestionImage.vue'
export default {
  components: { BaseQuestionImage, BaseQuestionChoice },
  props: {
    question: {
      type: Object,
      required: true,
    },
    backendAnswer: {
      type: Number | null | Array,
      required: true,
    },
    numberCanSelectedAnswer: {
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
      remainingAnswersToChoose: this.numberCanSelectedAnswer,
    }
  },
  methods: {
    selectAnswer(item, index) {
      const selected = { item, index }
      if (!this.isTimeExpired && this.remainingAnswersToChoose > 0) {
        if (
          item.isSelect === false &&
          this.numberCanSelectedAnswer > this.selectedChoice.length
        ) {
          item.isSelect = true
          this.selectedChoice.push(selected)
          if (this.numberCanSelectedAnswer === this.selectedChoice.length) {
            this.summitAnswer()
            this.choice.forEach((item) => {
              if (item.isSelect == false) {
                item.status = 'choice-blur'
              }
            })
          }
          this.remainingAnswersToChoose--
        } else {
          item.isSelect = false
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
        this.choice.forEach((item, index) => {
          if (this.backendAnswer.includes(index)) {
            item.isCorrect = 'correct'
          } else {
            item.isCorrect = 'incorrect'
          }
        })
      } else {
        this.selectedChoice.forEach((item) => {
          if (this.backendAnswer.includes(item.index)) {
            item.item.isCorrect = 'correct'
          } else {
            item.item.isCorrect = 'incorrect'
          }
        })
        setTimeout(() => {
          this.choice.forEach((item, index) => {
            if (this.backendAnswer.includes(index)) {
              item.isCorrect = 'correct'
            } else item.status = 'choice-blur'
          })
        }, 500)
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
        return {
          ...item,
          status: 'choice-blank', // choice-[blank / blur]
          isSelect: false, // [true / false]
          isCorrect: '', // [ '' / 'correct' / 'incorrect']
        }
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
  },
  destroyed() {
    this.$nuxt.$off('time-expired')
  },
}
</script>
