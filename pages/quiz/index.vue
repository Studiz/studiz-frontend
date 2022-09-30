<template>
  <layout-quiz>
    <div class="h-[calc(100vh-calc(24px+60px))] flex flex-col gap-y-3">
      <v-sheet
        rounded="lg"
        elevation="0"
        color="background_card"
        class="overflow-hidden pa-2 pa-md-3 drop-shadow-md text-lg md:text-2xl lg:text-4xl xl:text-5xl leading-relaxed flex-none"
        >{{ text }}</v-sheet
      >

      <div class="flex-none md:flex-1 min-h-[14rem] max-h-72 xl:max-h-96">
        <v-img contain class="max-h-full drop-shadow-md" :src="image" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 flex-none md:flex-1">
        <button
          v-for="(item, index) in 5"
          :key="item"
          :class="[arrayChoiceColor[index]]"
          class="min-h-[84px] max-h-40 rounded-lg drop-shadow-md p-4 flex items-center"
        >
          <span class="h-fit text-lg md:text-xl leading-relaxed text-left">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
            officia veniam iure hic facere! Magni
          </span>
        </button>
      </div>
    </div>
  </layout-quiz>
</template>

<script>
import layoutQuiz from '~/layouts/layoutQuiz.vue'
export default {
  components: { layoutQuiz },
  layout: 'layoutFree',
  data() {
    return {
      arrayChoiceColor: ['red', 'blue', 'yellow', 'green', 'cyan', 'purple'],
      text: 'So I started to walk into the water. I wont lie to you boys, I was terrified. But I pressed on, and as I made my way past',
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

.scrollbar {
  @apply overflow-auto;
}
.scrollbar::-webkit-scrollbar {
  width: 5px;
}
.scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 8px 8px;
}
.scrollbar::-webkit-scrollbar-thumb {
  background: var(--v-primary-base);
  border-radius: 50px;
}
.scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--v-primary-base);
  border-radius: 50px;
}
</style>
