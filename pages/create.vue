<template>
  <layout-create
    :quizTitle="quizData.title"
    :totalQuestion="renderTotalQuestion"
    :dataQuestion="renderAllQuestion"
    :currentQuesiton="currentQuesiton"
    @active-item="activeItem"
    @add-question="addQuestion"
    @edit-quiz-title="editquizTitle"
  >
    <v-sheet
      rounded="lg"
      elevation="1"
      color="background_card"
      class="overflow-hidden pa-2 pa-md-5"
    >
      <span>
        {{ renderQuestion.question }}
      </span>
    </v-sheet>
  </layout-create>
</template>

<script>
import layoutCreate from '~/components/createquesiton/LayoutCreate.vue'
export default {
  components: { layoutCreate },
  layout: 'layoutFree',
  data() {
    return {
      drawer: true,
      currentQuesiton: 0,
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
            time: 10,
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
      })
    },
    editquizTitle(name) {
      this.quizData.title = name
    },
    activeItem(index) {
      this.currentQuesiton = index
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
