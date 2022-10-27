<template>
  <button
    class="rounded-lg drop-shadow-md p-3 flex justify-between items-center focus:no-underline gap-x-3"
    :class="[
      arrayChoiceColor[index],
      item.status,
      item.isCorrect,
      renderClassItemIsSelect,
      typeQuestions === 'sort' ? 'pl-6' : 'transition-all',
    ]"
    @click.once="selectAnswer(item, index)"
  >
    <span class="text-lg leading-relaxed" :class="[renderFontSize, text_class]">
      {{ item.option }}
    </span>
    <div
      v-if="typeQuestions === 'poll'"
      class="h-full w-14 inline-flex items-center p-2 bg-white/30 dark:bg-black/30 rounded-md"
    >
      <span
        :id="`percentage-${index}`"
        class="font-semibold text-xl text-right w-14"
        >0%</span
      >
    </div>

    <v-icon
      large
      v-if="typeQuestions === 'sort'"
      class="handle cursor-grabbing py-3 px-1 !absolute top-1/2 left-2 transform -translate-x-1/2 -translate-y-1/2 opacity-60"
      >mdi-drag-vertical</v-icon
    >

    <div v-if="typeQuestions === ''">
      <v-icon x-large v-if="item.isCorrect === 'incorrect'"
        >mdi-close-thick
      </v-icon>
      <v-icon x-large v-if="item.isCorrect === 'correct'"
        >mdi-check-bold
      </v-icon>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    text_class: {
      type: String,
      default: 'text-left',
    },
    index: {
      type: Number,
      required: true,
    },
    arrayChoiceColor: {
      type: Array,
      default: () => ['red', 'blue', 'yellow', 'green', 'cyan', 'purple'],
    },
    typeQuestions: {
      type: String,
      default: '',
    },
  },
  methods: {
    selectAnswer(item, i) {
      this.$emit('selectAnswer', item, i)
    },
  },
  computed: {
    renderFontSize() {
      let length = this.item.option.length
      if (length > 99) {
        return 'md:text-lg lg:text-xl'
      } else if (length > 69) {
        return 'md:text-xl lg:text-2xl'
      } else if (length > 24) {
        return 'md:text-3xl lg:text-4xl'
      } else if (length > 6) {
        return 'md:text-5xl lg:text-6xl xl:text-7xl'
      } else if (length > 0) {
        return 'text-2xl md:text-6xl lg:text-7xl xl:text-8xl'
      }
    },
    renderClassItemIsSelect() {
      return this.item.isSelect ? 'choice-selected' : ''
    },
  },
}
</script>

<style scoped>
.red {
  @apply !bg-red-300/50 dark:!bg-red-300/40;
}
.yellow {
  @apply !bg-yellow-300/50 dark:!bg-yellow-300/40;
}
.green {
  @apply !bg-green-300/50 dark:!bg-green-300/40;
}
.blue {
  @apply !bg-sky-300/50 dark:!bg-sky-300/40;
}
.cyan {
  @apply !bg-cyan-300/50 dark:!bg-cyan-300/40;
}
.purple {
  @apply !bg-purple-300/50 dark:!bg-purple-300/40;
}

/* status: 'choice-blank', // choice-[blank / blur]
  isSelect: false, // [true / false]
  isCorrect: '', // [ '' / 'correct' / 'incorrect'] */

.correct {
  @apply !bg-green-500/50 dark:!bg-green-500/40 !opacity-100;
}
.incorrect {
  @apply !bg-red-500/50 dark:!bg-red-500/40;
}
.choice-selected {
  @apply ring ring-light_primary ring-offset-2 dark:ring-offset-dark_background;
}
.choice-blank {
  @apply opacity-100;
}
.choice-blur {
  @apply opacity-40;
}

.choice-winner::before {
  content: '👑';
  @apply rounded-full px-[1px] py-[2px] text-4xl opacity-100;
}
</style>
