<template>
  <div
    class="flex items-center justify-center gap-x-3 w-full sm:w-2/6 lg:w-1/6"
  >
    <div v-show="isShowTimer" class="md:min-w-[64px]">
      <div id="text-timer" class="w-full text-right whitespace-nowrap"></div>
    </div>
    <div class="w-full overflow-hidden rounded-md background ring-1">
      <div
        class="z-40 h-6 transition-all rounded-md primary"
        :style="{ width: `${currentProgress}%` }"
      ></div>
    </div>
    <span class="whitespace-nowrap">{{ currentPage }} / {{ totalPage }}</span>
  </div>
</template>

<script>
export default {
  props: {
    isShowTimer: {
      type: Boolean,
    },
  },
  watch: {
    isShowTimer() {
      this.$forceUpdate()
    },
  },
  computed: {
    currentProgress() {
      let current = (this.currentPage * 100) / this.totalPage
      return current
    },
    currentPage() {
      return this.$store.getters.currentPage
    },
    totalPage() {
      return this.$store.getters.quizData?.totalQuestion
    },
  },
}
</script>
