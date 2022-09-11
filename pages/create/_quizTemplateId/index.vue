<template>
  <layout-create
    :quizTitle="quizData.title"
    :totalQuestion="renderTotalQuestion"
    :dataQuestion="renderAllQuestion"
    :currentQuesiton="currentQuesiton"
    @active-item="activeItem"
    @add-question="addQuestion"
    @change-ordering="changeOrdering"
    @change-quiz-type="changeQuizType"
    @change-time-limit="chanceTimeLimit"
    @delete-question="deleteQuestion"
    @duplicate-question="duplicateQuestion"
    @save-quiz-template="saveQuizTemplate"
  >
    <div
      class="flex flex-col gap-3 h-[calc(100vh-calc(60px+24px))] scrollbar overflow-auto md:overflow-visible px-1 px-lg-1"
    >
      <input-question
        class="flex-none"
        :currentQuesiton="currentQuesiton"
        :dataQuestion="renderQuestion"
        @save-input-question="saveInputQuestion"
      />

      <input-image
        class="flex-none md:flex-1"
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
import layoutCreate from '~/layouts/LayoutCreate.vue'
import TeacherService from '~/services/TeacherService'

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
        id: '',
        teacherId: '',
        title: '',
        image: '',
        tags: [],
        description: '',
        questions: [
          {
            question: '',
            image: '',
            time: 3000,
            type: 'single',
            answer: {
              options: [
                {
                  option: '',
                  isCorrect: true,
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
      let defaultData = {
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
      }
      this.quizData.questions.push(defaultData)
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
      this.quizData.questions[this.currentQuesiton].image = data.previewImage
      this.quizData.questions[this.currentQuesiton].fileImage = data.fileImage
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

    resetQuizTemplate() {
      let defaultData = {
        title: '',
        description: '',
        tags: [],
        image:
          'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/Studiz_logo.svg?alt=media&token=2cce045c-f6ba-4275-a81d-656343885abc',
        questions: [],
        lastUpdated: '',
      }
      this.$store.commit('setQuizTemplate', defaultData)
    },

    createQuizTemplateAndUploadImages() {
      if (this.$store.getters.isEditMode) {
        TeacherService.updateQuizTemplate(
          this.$route.params.quizTemplateId,
          this.$store.getters.quizTemplate
        )
          .then((res) => {
            if (res.status == 200) {
              this.$store.commit('TOGGLE_LOADING', false)
              this.$router.push('/library')
            }
            return res.data
          })
          .then(async (res) => {
            let questions = await this.$store.getters.quizTemplate.questions
            for (let i = 0; i < questions.length; i++) {
              const item = questions[i]
              if (item.fileImage) {
                await TeacherService.updateImageQuestion(
                  res.data.id,
                  i,
                  item.fileImage
                )
              }
            }
            this.resetQuizTemplate()
          })
      } else {
        TeacherService.createQuizTemplate(this.$store.getters.quizTemplate)
          .then((res) => {
            if (res.status == 200) {
              this.$router.push('/library')
            }
            return res.data
          })
          .then(async (res) => {
            let questions = await this.$store.getters.quizTemplate.questions
            for (let i = 0; i < questions.length; i++) {
              const item = questions[i]
              if (item.fileImage) {
                await TeacherService.updateImageQuestion(
                  res.data.id,
                  i,
                  item.fileImage
                )
              }
            }
            this.resetQuizTemplate()
          })
      }
    },

    async saveQuizTemplate() {
      this.$store.commit('TOGGLE_LOADING', true)
      let dateCreated = new Date()
      let dd = String(dateCreated.getDate()).padStart(2, '0')
      let mm = String(dateCreated.getMonth() + 1).padStart(2, '0')
      let yyyy = dateCreated.getFullYear()
      dateCreated = mm + '/' + dd + '/' + yyyy
      this.$store.commit('setTeacherId', this.$store.getters.userId)
      this.$store.commit('setQuizQuestions', this.quizData.questions)
      this.$store.commit('setLastUpdated', dateCreated)

      if (this.$store.getters.imageQuizFile) {
        TeacherService.uploadImage(this.$store.getters.imageQuizFile)
          .then((res) => {
            this.$store.commit('setQuizImage', res.data.imageUrl)
          })
          .then(() => {
            this.createQuizTemplateAndUploadImages()
          })
      } else {
        this.createQuizTemplateAndUploadImages()
      }
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
  created() {
    if (!(this.$route.params.quizTemplateId == 'new')) {
      TeacherService.getQuizTemplateById(
        this.$route.params.quizTemplateId
      ).then((res) => {
        this.quizData = res.data
        this.$store.commit('setIsEditMode', true)
        this.$store.commit('setQuizTemplate', res.data)
      })
    }
  },
  destroyed() {
    this.resetQuizTemplate()
    this.$store.commit('setIsEditMode', false)
  },
}
</script>

<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 8px 8px;
}

/* Handle */
.scrollbar::-webkit-scrollbar-thumb {
  background: var(--v-primary_shade-base);
  border-radius: 50px;
}

/* Handle on hover */
.scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--v-primary-base);
  border-radius: 50px;
}
</style>