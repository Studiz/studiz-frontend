<template>
  <layout-quiz>
    <div class="">
      <v-card class="primary m-5 rounded-lg p-3">
        <div class="lg:flex">
          <div class="flex">
            <v-img
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
            <v-card-subtitle class="whitespace-nowrap text-end"
              >Questions (20)
            </v-card-subtitle>
            <div
              class="whitespace-nowrap flex px-4 pb-4 gap-x-3 items-end justify-end"
            >
              <v-img
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

      <div
        class="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-11 mx-5 my-10 lg:grid-rows-4"
      >
        <div
          class="primary w-full h-16 rounded-lg flex items-center p-2 gap-x-2"
          v-for="i in 20"
          :key="i"
        >
          <v-avatar size="46">
            <v-icon x-large v-if="!user">mdi-account-circle</v-icon>
          </v-avatar>
          <div class="">Dispaly name</div>
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
      quiz: {},
    }
  },
}
</script>

<style></style>
