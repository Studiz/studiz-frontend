<template>
  <div
    class="background_card overflow-hidden p-3 drop-shadow-md text-xl sm:text-2xl flex-none rounded-lg"
    :class="renderFontSize"
  >
    {{ renderQuestion }}<slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true,
    },
  },
  computed: {
    renderQuestion() {
      return this.question
    },
    renderFontSize() {
      let length = this.renderQuestion.length
      if (length > 101) {
        return 'md:text-2xl lg:text-3xl xl:text-4xl'
      } else if (length > 100) {
        return 'md:text-3xl lg:text-4xl xl:text-5xl'
      } else if (length > 50) {
        return 'md:text-4xl lg:text-5xl xl:text-6xl'
      } else if (length > 25) {
        return 'md:text-5xl lg:text-6xl xl:text-7xl'
      } else {
        return 'md:text-6xl lg:text-7xl xl:text-8xl'
      }
    },
  },
}
</script>

<style></style>
