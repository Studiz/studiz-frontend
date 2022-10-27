<template>
  <div
    :id="`question-${question?.type}`"
    class="p-2 flex flex-row-reverse gap-2 items-start ring-1 ring-black/10 dark:ring-white/10 !rounded-lg overflow-hidden relative"
  >
    <div
      v-if="question?.image || question?.score"
      id="image"
      class="inline-flex flex-col"
    >
      <v-img
        v-if="question?.image"
        contain
        content-class="ring-1 ring-black/10 dark:ring-white/10 !rounded-md"
        class="self-center justify-self-center background_card transition-all duration-500 p-px rounded-md overflow-hidden w-14 h-14"
        :src="question?.image"
      />
      <div
        v-if="renderIsCorrect === 'correct'"
        class="text-right font-semibold text-green-500"
      >
        +{{ question?.score }}
      </div>
    </div>

    <div class="flex flex-col justify-start ml-2">
      <div class="text-lg">{{ index + 1 }}. {{ question?.question }}</div>

      <v-divider class="my-2" />
      <div
        id="choices"
        class="flex flex-col p-0.5 pl-2 rounded-full mb-1"
        :class="[renderIndexStudentAnswer(i)]"
        v-for="(choice, i) in newOptions"
        :key="i"
      >
        <div id="choice" class="flex gap-2 items-start">
          <div class="w-3 h-3 py-1 inline-flex">
            <span
              class="w-3 h-3 rounded-full mt-0.5 outline outline-1 outline-black/30 dark:outline-white/30"
              :class="[
                choice?.isCorrect ? 'correct' : 'blank',
                findMostSelected() === i ? 'most-selected' : '',
              ]"
            />
          </div>
          <span>{{ choice?.option }}</span>
          <v-spacer />
          <div v-if="choice?.selected >= 0">{{ choice?.selected }}%</div>
        </div>
      </div>
    </div>

    <div
      class="absolute top-0 bottom-0 left-0 w-2"
      :class="renderIsCorrect"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      newOptions: [],
      optionForTrueFlase: [
        {
          option: 'True',
          isCorrect: false,
        },
        {
          option: 'False',
          isCorrect: false,
        },
      ],
    }
  },
  methods: {
    renderIndexStudentAnswer(index) {
      if (this.question.type === 'multiple') {
        return this.question.indexStudentAnswer.includes(index)
          ? 'selected'
          : ''
      } else {
        return this.question.indexStudentAnswer === index ? 'selected' : ''
      }
    },
    findMostSelected() {
      if (this.question.type === 'poll') {
        let max = 0
        let index = 0
        this.newOptions.forEach((choice, i) => {
          if (choice.selected > max) {
            max = choice.selected
            index = i
          }
        })
        return index
      }
    },
  },
  computed: {
    renderIsCorrect() {
      if (this.question.type === 'poll') {
        return 'bg-gray-500'
      } else {
        return this.question.studentAnswer ? 'correct' : 'incorrect'
      }
    },
  },
  mounted() {
    if (this.question.type === 'true/false') {
      this.newOptions = structuredClone(this.optionForTrueFlase)
      this.newOptions.forEach((option) => {
        if ((option.option === 'True' ? true : false) == this.question.answer) {
          option.isCorrect = true
        }
      })
    } else {
      this.newOptions = structuredClone(this.question.answer.options)
    }
  },
}
</script>

<style scoped>
.correct {
  @apply bg-green-500;
}
.incorrect {
  @apply bg-red-500;
}
.selected {
  @apply ring-1 ring-light_primary;
}
.selected .blank {
  @apply bg-red-500;
}
#question-poll .blank {
  @apply bg-transparent;
}
.most-selected {
  @apply !bg-yellow-500;
}
</style>
