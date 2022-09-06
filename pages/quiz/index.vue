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

      <div
        class="flex-none md:flex-1 min-h-[256px] max-h-full max-w-full object-contain w-fit mx-auto"
      >
        <img class="object-contain object-center max-h-full" :src="image" />
        <!-- <div class="h-full w-full bg-red-50">fafasd</div> -->
      </div>
      <!-- drop-shadow-md -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 flex-none md:flex-1">
        <div
          v-for="(item, index) in 4"
          :key="item"
          class="min-h-[128px] rounded-lg drop-shadow-md hover:ring p-3"
          :class="[arrayChoiceColor[index]]"
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
          officia veniam iure hic facere! Magni amet aliquam quam quo autem
          tempore porro consectetur deserunt laborum, quidem dolorum quis nemo
          consequatur!
        </div>
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
      arrayChoiceColor: ['red', 'blue', 'green', 'yellow'],
      text: 'So I started to walk into the water. I wont lie to you boys, I was terrified. But I pressed on, and as I made my way past',
      image: 'https://random.responsiveimages.io/v1/docs',
    }
  },
}
</script>

<style scoped>
.red {
  @apply !bg-red-200;
}
.yellow {
  @apply !bg-yellow-200;
}
.green {
  @apply !bg-green-200;
}
.blue {
  @apply !bg-sky-200;
}
</style>
