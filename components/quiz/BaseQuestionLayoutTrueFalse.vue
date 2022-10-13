<template>
  <div class="flex flex-col min-h-0 gap-3 flex-none md:flex-1">
    <base-question-image
      :questionImage="renderQuestionImage"
      :numberOfAnswer="numberOfAnswer"
    />

    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-3 flex-none md:flex-1 h-full w-full"
    >
      <button
        v-for="(item, i) in choice"
        class="rounded-lg drop-shadow-md p-3 flex justify-between items-center focus:no-underline"
        :key="`${i}-${item}`"
        :class="[
          arrayChoiceColor[i],
          item.status,
          selectedChoice.index == i
            ? 'ring ring-light_primary ring-offset-2 dark:ring-offset-dark_background '
            : '',
          Object.keys(selectedChoice).length === 0 && isStepShowAnswer
            ? 'opacity-100'
            : selectedChoice.index !== i && isStepShowAnswer
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
      choice: [
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
        this.selectedChoice = { item, index }
        this.$emit('select-choice', this.selectedChoice)
        console.log(this.selectedChoice)
      }
    },
    renderBackendAnswer() {
      this.isStepShowAnswer = true
      if (Object.keys(this.selectedChoice).length === 0) {
        this.choice.forEach((item, index) => {
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

<style scoped>
.red {
  @apply !bg-red-300/50 dark:!bg-red-300/40;
}
.blue {
  @apply !bg-sky-300/50 dark:!bg-sky-300/40;
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
