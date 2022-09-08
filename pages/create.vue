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
    @delete-question="deleteQuestion"
    @duplicate-question="duplicateQuestion"
  >
    <div
      class="flex flex-col gap-3 h-[calc(100vh-calc(60px+24px))] overflow-auto"
    >
      <input-question
        class="flex-none"
        :currentQuesiton="currentQuesiton"
        :dataQuestion="renderQuestion"
        @save-input-question="saveInputQuestion"
      />

      <input-image
        class="min-h-max max-h-56 flex-none md:flex-1"
        :currentQuesiton="currentQuesiton"
        :dataQuestion="renderQuestion"
        @save-input-image="saveInputImage"
        @delete-image="deleteImage"
      />

      <div class="flex-none md:flex-1">
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
      propDialog: false,
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
            time: 3000,
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
  watch: {
    quizData: {
      handler(newValue, oldValue) {
        if (newValue === oldValue) {
          window.addEventListener('beforeunload', (e) => {
            e.preventDefault()
            e.returnValue = ''
          })
        }
      },
      deep: true,
    },
  },
  methods: {
    addQuestion() {
      this.quizData.questions.push({
        question: '',
        image: '',
        time: 1000,
        type: 'single',
        answer: {
          options: [
            {
              option: '',
              isCorrect: false,
            },
            {
              option: '',
              isCorrect: false,
            },
            {
              option: '',
              isCorrect: false,
            },
            {
              option: '',
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
    deleteQuestion(index) {
      if (this.currentQuesiton === index) {
        if (index > 0) {
          this.activeItem(this.currentQuesiton - 1)
          this.quizData.questions.splice(index, 1)
        } else if (this.renderTotalQuestion > 1 && index == 0) {
          this.quizData.questions.splice(index, 1)
        } else {
          this.quizData.questions.splice(index, 1)
          this.addQuestion()
        }
      } else if (this.currentQuesiton > index) {
        this.activeItem(this.currentQuesiton - 1)
        this.quizData.questions.splice(index, 1)
      } else if (this.currentQuesiton < index) {
        this.activeItem(this.currentQuesiton)
        this.quizData.questions.splice(index, 1)
      }
    },
    duplicateQuestion(index) {
      let newQuestion = structuredClone(this.quizData.questions[index])
      this.quizData.questions.push(newQuestion)
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
    renderQuestionType() {
      return this.quizData.questions[this.currentQuesiton].type
    },
  },
  mounted() {
    this.$forceUpdate()
  },
  created() {},
}
</script>

<style></style>
