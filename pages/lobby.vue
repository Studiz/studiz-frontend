<template>
  <layout-quiz>
    <div>
      <v-card class="primary m-5 rounded-lg p-3">
        <div class="lg:flex">
          <div class="flex">
            <v-img
              class="rounded-lg primary_shade"
              src="https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/58a86ea4d03753509afe13a6.png?alt=media&token=83dd9af3-5163-4695-81fd-c1d105ea184e"
              max-height="150px"
              max-width="150px"
            ></v-img>
            <div>
              <v-card-title>Test title of quiz</v-card-title>
              <v-card-text
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                maxime recusandae libero magnam maiores ratione est voluptatem
                dicta aliquid? Consequuntur asperiores illo voluptas eos?
                Corporis facere maiores alias! Amet, quibusdam?</v-card-text
              >
            </div>
          </div>
          <div class="flex lg:flex-col items-end">
            <v-card-subtitle class="whitespace-nowrap text-end font-semibold"
              >Questions (20)
            </v-card-subtitle>
            <div
              class="whitespace-nowrap flex px-4 pb-4 gap-x-3 items-end justify-end"
            >
              <v-img
                class="rounded-full primary_shade"
                src="https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/1661479781086_d8d9c4f9-859b-4afd-8837-2ebd237a35df.png?alt=media&token=4f5d8d8c-ab1f-4f40-b42e-2375f4a91661"
                max-height="48px"
                max-width="48px"
              ></v-img>
              <div>
                <span>Teacherzzzzz</span>
                <br />
                <span>09-05-2020</span>
              </div>
            </div>
          </div>
        </div>
      </v-card>

      <div class="relative">
        <VueSlickCarousel
          ref="carousel"
          v-bind="settings"
          @afterChange="changeSlide"
        >
          <div
            class="!grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-4"
            v-for="item in mockUser"
            :key="item"
          >
            <div
              class="px-5 py-5"
              v-for="(item, index) in item"
              :key="`${item}-${index}`"
            >
              <div
                class="primary w-full h-16 rounded-lg flex items-center p-2 gap-x-2"
              >
                <v-avatar size="46">
                  <v-icon x-large v-if="!user">mdi-account-circle</v-icon>
                </v-avatar>
                <div class="line-clamp-2">{{ item }}</div>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
        <v-btn color="primary" icon @click="prevSlide" class="btn -left-10"
          >back</v-btn
        >
        <v-btn color="primary" icon @click="nextSlide" class="btn -right-10"
          >next</v-btn
        >
        <div class="flex justify-center gap-x-2">
          <div
            v-for="(item, index) in mockUser.length"
            :key="item"
            class="w-[12px] h-[12px] rounded-full transition-all cursor-pointer"
            :class="[currentIndex === index ? 'primary' : 'primary_shade']"
            @click="pagination(index)"
          ></div>
        </div>
      </div>
    </div>
  </layout-quiz>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import LayoutQuiz from '~/layouts/layoutQuiz.vue'
export default {
  layout: 'layoutFree',
  components: { LayoutQuiz, VueSlickCarousel },
  data() {
    return {
      currentIndex: 0,
      quiz: {},
      settings: {
        centerPadding: '0px',
        arrows: false,
        dots: false,
        focusOnSelect: false,
        infinite: false,
        speed: 500,
        dotsClass: 'slick-dots custom-dot-class',
        slidesToScroll: 1,
        slidesToShow: 1,
        touchMove: true,
      },
      mockUser: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        [17, 18],
      ],
    }
  },
  methods: {
    nextSlide() {
      if (this.$refs.carousel) {
        this.$refs.carousel.next()
      }
    },
    prevSlide() {
      if (this.$refs.carousel) {
        this.$refs.carousel.prev()
      }
    },
    changeSlide(num) {
      this.currentIndex = num
    },
    pagination(num) {
      this.currentIndex = num
      this.$refs.carousel.goTo(num)
    },
  },
}
</script>

<style lang="scss" scoped>
.btn {
  @apply absolute top-1/2 transform -translate-y-1/2;
}
</style>
