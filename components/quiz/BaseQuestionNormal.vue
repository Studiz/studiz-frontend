<template>
  <div class="flex flex-col min-h-0 gap-3 flex-none md:flex-1">
    <div class="flex-none md:flex-1 min-h-0 h-56 lg:max-h-72 items-center">
      <v-img
        contain
        class="max-h-full drop-shadow-md self-center"
        :src="image"
      />
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-3 flex-none md:flex-1 h-full w-full"
    >
      <button
        v-for="(item, index) in 6"
        :key="item"
        :class="[arrayChoiceColor[index]]"
        class="rounded-lg drop-shadow-md p-3 flex items-center focus:no-underline"
      >
        <span class="text-lg leading-relaxed text-left">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
          officia veniam iure hic facere! Magni
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrayChoiceColor: ['red', 'blue', 'yellow', 'green', 'cyan', 'purple'],
      image: 'https://random.responsiveimages.io/v1/docs',
    }
  },
}
</script>

<style scoped>
.red {
  @apply !bg-red-300/50 dark:!bg-red-300/40 md:hover:ring ring-red-300;
}
.yellow {
  @apply !bg-yellow-300/50 dark:!bg-yellow-300/40 md:hover:ring ring-yellow-300;
}
.green {
  @apply !bg-green-300/50 dark:!bg-green-300/40 md:hover:ring ring-green-300;
}
.blue {
  @apply !bg-sky-300/50 dark:!bg-sky-300/40 md:hover:ring ring-sky-300;
}
.cyan {
  @apply !bg-cyan-300/50 dark:!bg-cyan-300/40 md:hover:ring ring-cyan-300;
}
.purple {
  @apply !bg-purple-300/50 dark:!bg-purple-300/40 md:hover:ring ring-purple-300;
}
</style>
