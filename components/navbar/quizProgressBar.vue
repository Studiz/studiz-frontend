<template>
  <div class="flex items-center justify-center gap-x-3 w-full">
    <div class="w-full sm:w-1/2" @click="currentPage++">
      <div
        class="w-full overflow-hidden bg-gray-200 rounded-md dark:bg-gray-800"
      >
        <div
          class="z-40 h-6 transition-all rounded-md bg-ligh_tprimary dark:bg-dark_primary"
          :style="{ width: `${currentProgress}%` }"
        ></div>
      </div>
    </div>
    <span class="whitespace-nowrap">{{ currentPage }} / {{ totalPage }}</span>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    currentProgress() {
      if (
        typeof this.currentPage == 'number' &&
        typeof this.totalPage == 'number'
      ) {
        let current = (this.currentPage * 100) / this.totalPage
        return current
      }
      return 0
    },
  },
}
</script>
