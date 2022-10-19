<template>
  <div
    class="flex-none"
    :class="[
      questionImage === ''
        ? 'flex-initial md:h-[100px] my-auto'
        : 'min-h-0 min-w-0 md:flex-1',
    ]"
  >
    <div class="flex flex-col gap-3 h-full relative">
      <div class="self-center" v-if="renderIsTeacherRole">
        <div
          v-if="typeQuestions === 'sort'"
          class="flex-none text-center p-4 rounded-full background_card drop-shadow-md -space-y-1 w-[100px] h-[100px] inline-flex flex-col justify-center items-center"
        >
          <div class="font-semibold text-lg">
            {{ numberOfAnswer }}
          </div>
          <div>Answers</div>
        </div>

        <div
          v-else
          class="absolute top-1/2 right-2 transform -translate-y-1/2 text-center p-4 rounded-full background_card drop-shadow-md -space-y-1 w-[100px] h-[100px] hidden md:inline-flex flex-col justify-center items-center"
        >
          <div class="font-semibold text-lg">{{ numberOfAnswer }}</div>
          <div>Answers</div>
        </div>
      </div>

      <div v-if="questionImage !== ''" class="flex">
        <v-img
          contain
          class="drop-shadow-md max-h-80 sm:max-h-full"
          :class="[
            typeQuestions === 'sort' ? 'rounded-md background_card' : '',
          ]"
          :content-class="renderImageClass"
          :src="renderImage"
        />
      </div>

      <slot></slot>
    </div>
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
    typeQuestions: {
      type: String,
    },
  },
  computed: {
    renderImage() {
      if (this.questionImage === '') {
        return ''
      } else return this.questionImage
    },
    renderImageClass() {
      if (this.questionImage === '') {
        return 'h-[100px] p-1'
      } else return 'w-auto sm:h-80 md:h-full'
    },
    renderIsTeacherRole() {
      return this.$store.getters.userRole === 'TEACHER' ? true : false
    },
  },
}
</script>

<style scoped>
:deep(.v-responsive__sizer) {
  @apply pb-[224px] sm:!pb-0 !transition-none;
}
</style>
