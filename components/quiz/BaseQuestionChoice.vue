<template>
  <button
    class="rounded-lg drop-shadow-md p-3 flex justify-between items-center focus:no-underline gap-x-3"
    :class="[arrayChoiceColor[index], item.status]"
    @click="selectAnswer(item, index)"
  >
    <span class="text-lg leading-relaxed" :class="[renderFontSize, text_class]">
      {{ item.option }}
    </span>
    <div
      v-if="typeQuestions === 'poll'"
      class="h-full w-14 inline-flex items-center p-2 bg-white/30 dark:bg-black/30 rounded-md"
    >
      <span class="font-semibold">100%</span>
    </div>
    <div v-else class="h-10">
      <v-icon x-large v-if="item.status === 'incorrect'"
        >mdi-close-thick</v-icon
      >
      <v-icon x-large v-if="item.status === 'correct'">mdi-check-bold</v-icon>
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
  @apply ring ring-light_primary ring-offset-2 dark:ring-offset-dark_background;
}
</style>
