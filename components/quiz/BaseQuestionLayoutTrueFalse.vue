<template>
  <div class="flex flex-col min-h-0 gap-3 flex-none md:flex-1">
    <base-question-image
      :questionImage="renderQuestionImage"
      :numberOfAnswer="numberOfAnswer"
    />

    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 h-full w-full auto-rows-fr"
    >
      <base-question-choice
        v-for="(item, i) in choices"
        :key="`${i}-${item}`"
        :class="isStepShowAnswer && item.status === null ? 'opacity-30' : ''"
        :item="item"
        :index="i"
        :arrayChoiceColor="arrayChoiceColor"
        text_class="text-center w-full"
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
      arrayChoiceColor: ['red', 'blue'],
      isTimeExpired: false,
      isStepShowAnswer: false,
      selectedChoice: {},
      choices: [
        {
          option: 'True',
          status: null,
        },
        {
          option: 'False',
          status: null,
        },
      ],
    }
  },
  methods: {
    selectAnswer(item, index) {
      if (
        !this.isTimeExpired &&
        Object.keys(this.selectedChoice).length === 0
      ) {
        item.status = 'selected'
        this.selectedChoice = { item, index }
        this.$emit('select-choice', this.selectedChoice)
        console.log(this.selectedChoice)
      }
    },
    renderBackendAnswer() {
      this.isStepShowAnswer = true
      if (Object.keys(this.selectedChoice).length === 0) {
        this.choices.forEach((item, index) => {
          if (index === this.backendAnswer) {
            item.status = 'correct'
          } else {
            item.status = 'incorrect'
          }
        })
      } else {
        if (this.selectedChoice.index === this.backendAnswer) {
          this.selectedChoice.item.status = 'correct'
        } else {
          this.selectedChoice.item.status = 'incorrect'
        }
      }
    },
  },
  computed: {
    renderQuestionImage() {
      return this.question.image
    },
  },
  created() {
    this.$nuxt.$on('time-expired', (prop) => {
      this.isTimeExpired = prop
    })
  },
  destroyed() {
    this.$nuxt.$off('time-expired')
  },
}
</script>
