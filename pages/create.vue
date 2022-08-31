<template>
  <layout-create
    :quizTitle="quizData.title"
    :totalQuestion="renderTotalQuestion"
    :dataQuestion="renderAllQuestion"
    :currentQuesiton="currentQuesiton"
    @active-item="activeItem"
    @add-question="addQuestion"
    @edit-quiz-title="editquizTitle"
    @change-ordering="changeOrdering"
    @change-quiz-type="changeQuizType"
    @change-time-limit="chanceTimeLimit"
  >
    <v-sheet
      rounded="lg"
      elevation="1"
      color="background_card"
      class="overflow-hidden pa-2 pa-md-5 h-[calc(10vh-12px)]"
    >
      <span>
        {{ renderQuestion.question }}
        <!-- {{ quizData }} -->
      </span>
    </v-sheet>

    <div class="h-[calc(60vh-calc(12px+12px+60px))]"></div>

    <!-- <v-sheet
      rounded="lg"
      elevation="1"
      color="background_card"
      class="overflow-hidden pa-2 pa-md-5"
    > -->
    <div class="h-[30vh]">
      <base-singlechoice v-if="renderQuestion.type === 'single'" />
    </div>
    <!-- </v-sheet> -->
  </layout-create>
</template>

<script>
import BaseSinglechoice from '~/components/createquesiton/BaseSinglechoice.vue'
import InputChoice from '~/components/createquesiton/InputChoice.vue'
import layoutCreate from '~/components/createquesiton/LayoutCreate.vue'
export default {
  components: { layoutCreate, InputChoice, BaseSinglechoice },
  layout: 'layoutFree',
  data() {
    return {
      drawer: true,
      currentQuesiton: 1,
      quizData: {
        id: 'xxxxxx',
        teacherId: 'xxxxxx',
        title: 'xxxxxxtitle',
        image: 'xxxxxx',
        tags: ['xxxxxx', 'xxxxxx'],
        description: 'xxxxxx',
        questions: [
          {
            question: 'question1',
            image: 'xxxxxx',
            time: 1000,
            type: 'single',
            answer: {
              options: [
                {
                  option: 'xxxxxx',
                  isCorrect: true,
                },
                {
                  option: 'xxxxxx',
                  isCorrect: false,
                },
                {
                  option: 'xxxxxx',
                  isCorrect: false,
                },
                {
                  option: 'xxxxxx',
                  isCorrect: false,
                },
              ],
            },
          },
          {
            question: 'question2',
            image: 'xxxxxx',
            time: 1000,
            type: 'multiple',
            answer: {
              options: [
                {
                  option: 'xxxxxx',
                  isCorrect: true,
                },
                {
                  option: 'xxxxxx',
                  isCorrect: false,
                },
                {
                  option: 'xxxxxx',
                  isCorrect: false,
                },
                {
                  option: 'xxxxxx',
                  isCorrect: false,
                },
              ],
            },
          },
        ],
      },
    }
  },
  methods: {
    addQuestion() {
      this.quizData.questions.push({
        question: 'question' + Math.floor(Math.random() * 100),
        image: 'xxxxxx',
        time: 10,
        type: 'multiple',
        answer: {
          options: [
            {
              option: 'xxxxxx',
              isCorrect: true,
            },
            {
              option: 'xxxxxx',
              isCorrect: false,
            },
            {
              option: 'xxxxxx',
              isCorrect: false,
            },
            {
              option: 'xxxxxx',
              isCorrect: false,
            },
          ],
        },
      })
    },
    editquizTitle(name) {
      this.quizData.title = name
    },
    activeItem(index) {
      this.currentQuesiton = index
    },
    changeOrdering(data) {
      this.quizData.questions = data
    },
    changeQuizType(type) {
      this.quizData.questions[this.currentQuesiton].type = type
    },
    chanceTimeLimit(time) {
      this.quizData.questions[this.currentQuesiton].time = time
    },
  },
  computed: {
    renderQuestion() {
      return this.quizData.questions[this.currentQuesiton]
    },
    renderTotalQuestion() {
      return this.quizData.questions.length
    },
    renderAllQuestion() {
      return this.quizData.questions
    },
  },
  created() {},
}
</script>

<style></style>
