<template>
  <!-- :key="currentQuesiton" -->
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
    <input-question
      class="h-[calc(15vh)]"
      :currentQuesiton="currentQuesiton"
      :quiestion="renderQuestion.question"
      @save-input-question="saveInputQuestion"
    />

    <input-image
      class="h-[calc(45vh-calc(24px+60px))] py-3"
      :currentQuesiton="currentQuesiton"
      :image="renderQuestion.image"
      @save-input-image="saveInputImage"
      @delete-image="deleteImage"
    />

    <div class="h-[calc(40vh-24px)]">
      <base-single-choice
        v-if="renderQuestion.type === 'single'"
        :renderQuestionAnswer="renderQuestionAnswer"
        :currentQuesiton="currentQuesiton"
        @change-correct-choice="changeCorrectChoice"
        @save-input-text="saveInputText"
      />
      <base-multiple-choice
        v-if="renderQuestion.type === 'multiple'"
        :currentQuesiton="currentQuesiton"
        :renderQuestionAnswer="renderQuestionAnswer"
        @save-input-text="saveInputText"
        @select-correct-choice="selectCorrectChoice"
        @unselect-correct-choice="selectCorrectChoice"
      />
    </div>
  </layout-create>
</template>

<script>
import BaseMultipleChoice from '~/components/createquesiton/BaseMultipleChoice.vue'
import BaseSingleChoice from '~/components/createquesiton/BaseSingleChoice.vue'
import InputChoice from '~/components/createquesiton/InputChoice.vue'
import InputImage from '~/components/createquesiton/InputImage.vue'
import InputQuestion from '~/components/createquesiton/InputQuestion.vue'
import layoutCreate from '~/components/createquesiton/LayoutCreate.vue'
export default {
  components: {
    layoutCreate,
    InputChoice,
    BaseSingleChoice,
    BaseMultipleChoice,
    InputQuestion,
    InputImage,
  },
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
            image: 'https://random.responsiveimages.io/v1/docs',
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
            image: '',
            time: 120000,
            type: 'multiple',
            answer: {
              options: [
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
      if (
        this.quizData.questions[this.currentQuesiton].type == 'multiple' &&
        type == 'single'
      ) {
        this.quizData.questions[this.currentQuesiton].type = type
        this.quizData.questions[this.currentQuesiton].answer.options.forEach(
          (item) => {
            item.isCorrect = false
          }
        )
      } else {
        this.quizData.questions[this.currentQuesiton].type = type
      }
    },
    chanceTimeLimit(time) {
      this.quizData.questions[this.currentQuesiton].time = time
    },
    changeCorrectChoice(data) {
      this.quizData.questions[this.currentQuesiton].answer.options.forEach(
        (element, index) => {
          element.isCorrect = index === data ? true : false
        }
      )
    },
    selectCorrectChoice(data) {
      const countCorrect = this.quizData.questions[
        this.currentQuesiton
      ].answer.options.filter((element) => element.isCorrect).length
      if (
        this.quizData.questions[this.currentQuesiton].answer.options[data]
          .isCorrect === true &&
        countCorrect > 1
      ) {
        this.quizData.questions[this.currentQuesiton].answer.options[
          data
        ].isCorrect = false
      } else {
        this.quizData.questions[this.currentQuesiton].answer.options[
          data
        ].isCorrect = true
      }
    },
    saveInputText(data) {
      this.quizData.questions[this.currentQuesiton].answer.options[
        data.index
      ].option = data.text
    },
    saveInputQuestion(data) {
      this.quizData.questions[this.currentQuesiton].question = data
    },
    saveInputImage(data) {
      this.quizData.questions[this.currentQuesiton].image = data
    },
    deleteImage() {
      this.quizData.questions[this.currentQuesiton].image = ''
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
    renderQuestionAnswer() {
      return this.quizData.questions[this.currentQuesiton].answer
    },
  },
  mounted() {
    this.$forceUpdate()
  },
  created() {},
}
</script>

<style></style>
