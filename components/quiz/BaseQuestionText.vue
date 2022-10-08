<template>
  <div
    class="background_card overflow-hidden p-3 drop-shadow-md text-lg sm:text-2xl leading-relaxed flex-none rounded-lg"
    :class="renderFontSize"
  >
    {{ renderQuestion }}
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
        return 'md:text-4xl'
      } else if (length > 100) {
        return 'md:text-5xl'
      } else if (length > 50) {
        return 'md:text-6xl'
      } else if (length > 25) {
        return 'md:text-7xl'
      } else {
        return 'md:text-8xl'
      }
    },
  },
}
</script>

<style></style>
