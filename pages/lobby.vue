<template>
  <layout-quiz>
    <div class="space-y-3 xl:space-y-5">
      <v-card
        flat
        class="primary_shade rounded-lg p-3 !max-w-6xl mx-auto overflow-hidden drop-shadow-md"
      >
        <div class="md:flex">
          <!-- <div class="flex"> -->
          <!-- <div class=" md:w-36"> -->
          <v-img
            class="rounded-lg primary w-full h-auto mx-auto"
            src="https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/58a86ea4d03753509afe13a6.png?alt=media&token=83dd9af3-5163-4695-81fd-c1d105ea184e"
            max-height="150px"
            max-width="150px"
          ></v-img>
          <!-- </div> -->
          <div>
            <v-card-title>Test title of quiz</v-card-title>
            <v-card-text
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              maxime recusandae libero magnam maiores ratione est voluptatem
              dicta aliquid? Consequuntur asperiores illo voluptas eos? Corporis
              facere maiores alias! Amet, quibusdam?</v-card-text
            >
          </div>
          <!-- </div> -->
          <div class="flex md:flex-col items-end flex-wrap justify-between">
            <v-card-subtitle class="whitespace-nowrap text-end font-semibold"
              >Questions (20)
            </v-card-subtitle>
            <div
              class="whitespace-nowrap inline-flex px-4 pb-4 gap-x-3 items-end md:justify-end"
            >
              <v-img
                class="rounded-full primary"
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

      <div class="flex flex-wrap gap-3 justify-center items-center">
        <div
          v-for="item in mockUser"
          :key="item"
          class="background_card drop-shadow-md h-16 w-full sm:w-80 rounded-lg items-center p-2 gap-x-2 inline-flex"
        >
          <v-avatar size="46">
            <v-icon x-large v-if="!user">mdi-account-circle</v-icon>
          </v-avatar>
          <div class="line-clamp-2 w-full">{{ item }}</div>
        </div>
      </div>
    </div>
  </layout-quiz>
</template>

<script>
import LayoutQuiz from '~/layouts/layoutQuiz.vue'
export default {
  layout: 'layoutFree',
  components: { LayoutQuiz },
  data() {
    return {
      mockUser: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
