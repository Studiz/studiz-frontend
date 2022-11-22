<template>
  <div class="flex flex-col min-h-0 gap-3 flex-none md:flex-1">
    <base-question-image
      :questionImage="renderQuestionImage"
      :numberOfAnswer="numberOfAnswer"
    />

    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-3 flex-none md:flex-1 h-full w-full auto-rows-fr"
    >
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
      type: Number | null,
      required: true,
    },
    numberOfAnswer: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    backendAnswer(newVal, oldVal) {
      console.log('backendAnswer', newVal, oldVal)
      if (newVal !== null) {
        console.log('check')
        this.renderBackendAnswer()
      }
    },
  },
  data() {
    return {
      arrayChoiceColor: ['red', 'blue', 'yellow', 'green', 'cyan', 'purple'],
      isTimeExpired: false,
      isStepShowAnswer: false,
      selectedChoice: {},
      choices: [],
    }
  },
  methods: {
    selectAnswer(item, index) {
      if (
        !this.isTimeExpired &&
        Object.keys(this.selectedChoice).length === 0
      ) {
        item.isSelect = true
        this.selectedChoice = { item, index }
        this.$emit('select-choice', this.selectedChoice)
        this.choices.forEach((item) => {
          if (item.isSelect == false) {
            item.status = 'choice-blur'
          }
        })
      }
    },
    renderBackendAnswer() {
      this.isStepShowAnswer = true
      if (Object.keys(this.selectedChoice).length === 0) {
        this.choices.forEach((item, index) => {
          if (index === this.backendAnswer) {
            item.isCorrect = 'correct'
          } else {
            item.isCorrect = 'incorrect'
          }
        })
      } else {
        if (this.selectedChoice.index === this.backendAnswer) {
          this.selectedChoice.item.isCorrect = 'correct'
        } else {
          this.selectedChoice.item.isCorrect = 'incorrect'
        }
        setTimeout(() => {
          this.choices.forEach((item, index) => {
            if (this.backendAnswer === index) {
              item.isCorrect = 'correct'
            } else item.status = 'choice-blur'
          })
        }, 500)
      }
    },
  },
  computed: {
    renderQuestion() {
      return this.choices
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
  },
  created() {
    this.$nuxt.$on('time-expired', (prop) => {
      this.isTimeExpired = prop
    })
    this.choices = this.addStatusForEachChoice
  },
  destroyed() {
    this.$nuxt.$off('time-expired')
  },
}
</script>
