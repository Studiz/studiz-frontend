<template>
  <layout-quiz>
    <div class="space-y-3 xl:space-y-5">
      <v-card
        v-if="userRole == 'TEACHER'"
        flat
        class="primary_shade rounded-lg p-3 !max-w-6xl mx-auto overflow-hidden drop-shadow-md space-y-3"
      >
        <div class="flex items-start justify-center gap-3">
          <div class="inline-flex flex-col">
            <span>GAME PIN:</span>
            <span class="!text-6xl !font-bold select-all">123456</span>
          </div>
          <v-btn icon class="self-center" disabled>
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </div>
        <div class="flex justify-between flex-wrap">
          <div class="inline-flex flex-wrap p-3 gap-3">
            <v-img
              class="rounded-lg primary w-full h-auto"
              :src="quizData.image"
              max-height="60px"
              max-width="60px"
            />
            <div class="font-semibold">
              <div class="text-H2">{{quizData.title}}</div>
              <div>Questions ({{totalQuestion}})</div>
            </div>
          </div>
          <div class="flex-wrap inline-flex gap-x-3 p-3 self-end h-fit">
            <!-- <span class="h-1 w-1 bg-gray-500 rounded-xl self-center" /> -->
            <div>Update: {{quizData.lastUpdated}}</div>
          </div>
        </div>
      </v-card>

      <v-card
        v-else
        flat
        class="primary_shade rounded-lg p-3 !max-w-6xl mx-auto overflow-hidden drop-shadow-md"
      >
        <div class="md:flex">
          <v-img
            class="rounded-lg primary w-full h-auto mx-auto"
            :src="quizData.image"
            max-height="150px"
            max-width="150px"
          ></v-img>
          <div>
            <v-card-title>{{quizData.title}}</v-card-title>
            <v-card-text>{{quizData.description}}</v-card-text>
          </div>
          <div class="flex md:flex-col items-end flex-wrap justify-between">
            <v-card-subtitle
              class="whitespace-nowrap text-end !font-semibold"
            >Questions ({{totalQuestion}})</v-card-subtitle>
            <div class="whitespace-nowrap inline-flex px-4 pb-4 gap-x-3 items-end md:justify-end">
              <v-img
                class="rounded-full primary"
                src="https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/1661479781086_d8d9c4f9-859b-4afd-8837-2ebd237a35df.png?alt=media&token=4f5d8d8c-ab1f-4f40-b42e-2375f4a91661"
                max-height="48px"
                max-width="48px"
              ></v-img>
              <div>
                <div>Teacher</div>
                <div>{{quizData.lastUpdated}}</div>
              </div>
            </div>
          </div>
        </div>
      </v-card>

      <div class="flex flex-wrap gap-3 justify-center items-center">
        <div
          v-for="item in mockUser"
          :key="item"
          class="group background_card drop-shadow-md h-16 w-full sm:w-80 rounded-lg items-center p-2 gap-x-2 inline-flex transition-all"
        >
          <v-avatar size="46">
            <v-icon x-large v-if="!user">mdi-account-circle</v-icon>
          </v-avatar>
          <div class="line-clamp-2 w-full">{{ item }}</div>
          <v-btn
            v-if="userRole == 'TEACHER'"
            color="erroraaa"
            text
            small
            class="group-hover:visible group-hover:w-auto group-hover:h-auto invisible w-0 h-0"
          >leave</v-btn>
        </div>
      </div>
    </div>
  </layout-quiz>
</template>

<script>
import LayoutQuiz from '~/layouts/layoutQuiz.vue'
import TeacherService from '~/services/TeacherService'

export default {
  layout: 'layoutFree',
  components: { LayoutQuiz },
  data() {
    return {
      mockUser: [
        'Student 1',
        'Student 2',
        'Student 3',
        'Student 4',
        'Student 5',
        'Student 6',
        'Student 7',
        'Student 8',
        'Student 9',
        'Student 10',
        'Student 11',
        'Student 12',
        'Student 13',
        'Student 14',
        'Student 15',
      ],
      quizData: {},
    }
  },
  methods: {},
  computed: {
    userRole() {
      return this.$store.getters.userRole
    },
    totalQuestion() {
      return this.quizData.questions ? this.quizData.questions.length : 0
    },
  },
  created() {
    TeacherService.getQuizTemplateById(this.$route.params.quizId).then(
      (res) => {
        this.quizData = res.data
      }
    )
  },
}
</script>

<style lang="scss" scoped></style>
