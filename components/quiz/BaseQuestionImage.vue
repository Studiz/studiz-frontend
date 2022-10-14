<template>
  <div
    class="relative flex-none"
    :class="
      questionImage === ''
        ? 'p-1 flex-initial h-[100px] hidden md:block'
        : 'min-h-0 md:flex-1 sm:h-56 lg:h-72'
    "
  >
    <v-img contain class="max-h-full drop-shadow-md" :src="renderImage">
    </v-img>
    <div
      class="absolute top-1/2 right-2 transform -translate-y-1/2 text-center p-4 rounded-full background_card drop-shadow-md -space-y-1 w-[100px] h-[100px] hidden md:inline-flex flex-col justify-center items-center"
    >
      <div class="font-semibold text-lg">{{ numberOfAnswer }}</div>
      <div>Answers</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    questionImage: {
      type: String,
      default: '',
    },
    numberOfAnswer: {
      type: Number,
    },
  },
  computed: {
    renderImage() {
      if (this.questionImage === '') {
        return 'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/Studiz_logo.svg?alt=media&token=556fa651-57d6-4877-a211-51ded3b82dcb'
      } else return this.questionImage
    },
  },
}
</script>

<style></style>
