<template>
  <v-app>
    <!-- <Navbar /> -->
    <quiz-navbar />
    <v-main>
      <v-container>
        <v-card class="primary m-5 rounded-lg p-3">
          <div class="flex">
            <v-img
              src="https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/58a86ea4d03753509afe13a6.png?alt=media&token=83dd9af3-5163-4695-81fd-c1d105ea184e"
              max-height="150px"
              max-width="150px"
            ></v-img>
            <div>
              <v-card-title>Test title of quiz</v-card-title>
              <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam maxime recusandae libero magnam maiores ratione est voluptatem dicta aliquid? Consequuntur asperiores illo voluptas eos? Corporis facere maiores alias! Amet, quibusdam?</v-card-text>
            </div>
            <div class="flex flex-col content-between">
              <v-card-subtitle class="whitespace-nowrap">Questions (20)</v-card-subtitle>
              <div class="whitespace-nowrap flex">
                <v-img
                  src="https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/1661479781086_d8d9c4f9-859b-4afd-8837-2ebd237a35df.png?alt=media&token=4f5d8d8c-ab1f-4f40-b42e-2375f4a91661"
                  max-height="40px"
                  max-width="40px"
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import QuizNavbar from '~/components/navbar/quizNavbar.vue'
export default {
  layout: 'layoutFree',
  components: { QuizNavbar },
  data() {
    return {
      quiz: {},
    }
  },
}
</script>

<style></style>
