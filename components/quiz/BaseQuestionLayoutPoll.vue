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
        typeQuestions="poll"
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
      type: Number,
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
      let mockBackendAnswer = [90, 30, 50, 40, 10, 20]

      this.choices.forEach((item, index) => {
        if (item.isSelect == false) {
          item.status = 'choice-blank'
        }
        item.selected = mockBackendAnswer[index]
        this.counter(index, item.selected, 3000)
      })

      setTimeout(() => {
        this.choices.forEach((item, index) => {
          if (index === this.findMostSelected()) {
            item.status = 'choice-winner'
          } else {
            item.status = 'choice-blur'
          }
        })
      }, 4000)
    },
    counter(index, end, duration) {
      let obj = document.getElementById('percentage-' + index),
        current = 0,
        range = end - 0,
        increment = end > 0 ? 1 : -1,
        step = Math.abs(Math.floor(duration / range)),
        timer = setInterval(() => {
          current += increment
          obj.textContent = current + '%'
          if (current == end) {
            clearInterval(timer)
          }
        }, step)
    },
    findMostSelected() {
      let max = 0
      let index = 0
      this.choices.forEach((item, i) => {
        if (item.selected > max) {
          max = item.selected
          index = i
        }
      })
      return index
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
