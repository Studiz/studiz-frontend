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
      class="flex flex-col gap-3 h-[calc(100vh-calc(60px+24px))] scrollbar px-1 px-lg-1 pb-2"
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

      <div
        class="md:flex-1"
        :class="[renderQuestionType === 'true/false' ? 'flex-1' : 'flex-none']"
      >
        <base-single-choice
          v-if="renderQuestionType === 'single'"
          :currentQuesiton="currentQuesiton"
          :renderQuestionAnswer="renderQuestionAnswer"
          :indexOfOptional="indexOfOptional"
          :questionType="renderQuestionType"
          @change-correct-choice="changeCorrectChoice"
          @save-input-text="saveInputText"
          @add-option="addOption"
          @delete-option="deleteOption"
        />
        <base-multiple-choice
          v-if="renderQuestionType === 'multiple'"
          :currentQuesiton="currentQuesiton"
          :renderQuestionAnswer="renderQuestionAnswer"
          :indexOfOptional="indexOfOptional"
          :questionType="renderQuestionType"
          @save-input-text="saveInputText"
          @select-correct-choice="selectCorrectChoice"
          @unselect-correct-choice="selectCorrectChoice"
          @add-option="addOption"
          @delete-option="deleteOption"
        />
        <base-true-or-false
          v-if="renderQuestionType === 'true/false'"
          :currentQuesiton="currentQuesiton"
          :renderQuestionAnswer="renderQuestionAnswer"
          :questionType="renderQuestionType"
          @change-correct-choice="changeCorrectChoiceTrueFalse"
        />
        <base-poll
          v-if="renderQuestionType === 'poll'"
          :currentQuesiton="currentQuesiton"
          :renderQuestionAnswer="renderQuestionAnswer"
          :questionType="renderQuestionType"
          :indexOfOptional="indexOfOptional"
          @save-input-text="saveInputText"
          @add-option="addOption"
          @delete-option="deleteOption"
        />
        <base-sort
          v-if="renderQuestionType === 'sort'"
          :currentQuesiton="currentQuesiton"
          :renderQuestionAnswer="renderQuestionAnswer"
          :questionType="renderQuestionType"
          :indexOfOptional="indexOfOptional"
          @save-input-text="saveInputText"
          @add-option="addOption"
          @delete-option="deleteOption"
          @change-option-ordering="changeOptionOrdering"
        />
      </div>
    </div>
  </layout-create>
</template>

<script>
import BaseMultipleChoice from '~/components/createquesiton/BaseMultipleChoice.vue'
import BasePoll from '~/components/createquesiton/BasePoll.vue'
import BaseSingleChoice from '~/components/createquesiton/BaseSingleChoice.vue'
import BaseSort from '~/components/createquesiton/BaseSort.vue'
import BaseTrueOrFalse from '~/components/createquesiton/BaseTrueOrFalse.vue'
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
    BaseTrueOrFalse,
    BasePoll,
    BaseSort,
  },
  layout: 'layoutFree',
  head() {
    return {
      title: this.quizData.title === '' ? 'Question' : this.quizData.title,
      titleTemplate: '%s - Create Quiz',
    }
  },
  data() {
    return {
      drawer: true,
      currentQuesiton: 0,
      propDialog: false,
      quizData: {
        id: '',
        teacher: '',
        title: '',
        image: '',
        tags: [],
        description: '',
        questions: [
          {
            question: '',
            image: '',
            time: 15000,
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
      indexOfOptional: [],
      listType: ['single', 'multiple', 'true/false', 'poll', 'sort'],
      optionTypePoll: {
        options: [
          {
            option: '',
            selected: 0,
          },
          {
            option: '',
            selected: 0,
          },
        ],
      },
      optionTypeSingleAndMulit: {
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
      optionTypeSort: {
        options: [
          {
            option: '',
            index: 0,
          },
          {
            option: '',
            index: 1,
          },
          {
            option: '',
            index: 2,
          },
        ],
      },
      leavePageHandler: null,
    }
  },
  watch: {
    quizData: {
      handler(newValue, oldValue) {
        if (newValue === oldValue) {
          this.leavePageHandler = (e) => {
            e.preventDefault()
            e.returnValue = ''
          }
          window.addEventListener('beforeunload', this.leavePageHandler)
        }
      },
      deep: true,
    },
  },
  methods: {
    addQuestion(type) {
      let defaultData = {
        question: '',
        image: '',
        time: 15000,
        type: type,
        answer: null,
      }
      if (type === 'single' || type === 'multiple') {
        defaultData.answer = structuredClone(this.optionTypeSingleAndMulit)
      } else if (type === 'true/false') {
        defaultData.answer = null
      } else if (type === 'poll') {
        defaultData.answer = structuredClone(this.optionTypePoll)
      } else if (type === 'sort') {
        defaultData.answer = structuredClone(this.optionTypeSort)
      }
      this.quizData.questions.push(defaultData)
      this.activeItem(this.quizData.questions.length - 1)
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
      if (this.renderQuestionType === 'true/false') {
        this.quizData.questions[this.currentQuesiton].answer = structuredClone(
          this.optionTypeSingleAndMulit
        )
        if (type === 'multiple' || type === 'single') {
          this.quizData.questions[this.currentQuesiton].answer =
            structuredClone(this.optionTypeSingleAndMulit)
        }
        if (type === 'poll') {
          this.quizData.questions[this.currentQuesiton].answer =
            structuredClone(this.optionTypePoll)
        }
        if (type === 'sort') {
          this.quizData.questions[this.currentQuesiton].answer =
            structuredClone(this.optionTypeSort)
        }
      }

      if (this.renderQuestionType === 'multiple' && type === 'single') {
        this.quizData.questions[this.currentQuesiton].answer.options.forEach(
          (item) => {
            item.isCorrect = false
          }
        )
      }

      if (this.renderQuestionType === 'single' && type === 'multiple') {
      } else if (type === 'multiple' || type === 'single') {
        this.quizData.questions[this.currentQuesiton].answer.options.forEach(
          (item) => {
            item['isCorrect'] = false
            delete item.selected
            delete item.index
          }
        )
      }

      if (type === 'true/false') {
        this.quizData.questions[this.currentQuesiton].answer = null
      }

      if (type === 'sort') {
        this.quizData.questions[this.currentQuesiton].answer.options.forEach(
          (item, index) => {
            item['index'] = index
            delete item.isCorrect
            delete item.selected
          }
        )
      }

      if (type === 'poll') {
        this.quizData.questions[this.currentQuesiton].answer.options.forEach(
          (item) => {
            item['selected'] = 0
            delete item.isCorrect
            delete item.index
          }
        )
      }

      // change type question
      this.quizData.questions[this.currentQuesiton].type = type
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
    changeCorrectChoiceOptional(data) {
      this.quizData.questions[this.currentQuesiton].answer.options.forEach(
        (element, index) => {
          if (index == data) {
            element.isCorrect = false
          }
        }
      )
    },
    selectCorrectChoice(data) {
      if (this.indexOfOptional.includes(data.index) && data.text === '') {
        this.changeCorrectChoiceOptional(data.index)
      }
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
    changeCorrectChoiceTrueFalse(data) {
      this.quizData.questions[this.currentQuesiton].answer = data
    },
    changeOptionOrdering(data) {
      this.quizData.questions[this.currentQuesiton].answer.options = data
    },
    saveInputText(data) {
      if (this.indexOfOptional.includes(data.index) && data.text === '') {
        this.changeCorrectChoiceOptional(data.index)
      }
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
    addOption(type) {
      let itemOption = {
        option: '',
        isCorrect: false,
      }

      if (type === 'sort') {
        itemOption = {
          option: '',
          index:
            this.quizData.questions[this.currentQuesiton].answer.options.length,
        }
      }
      if (type === 'poll') {
        itemOption = {
          option: '',
          selected: 0,
        }
      }

      this.quizData.questions[this.currentQuesiton].answer.options.push(
        structuredClone(itemOption)
      )
    },
    deleteOption(index) {
      this.quizData.questions[this.currentQuesiton].answer.options.splice(
        index,
        1
      )
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
      this.quizData.questions.splice(index, 0, newQuestion)
      this.activeItem(index + 1)
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
            return res.data
          })
          .then(async (res) => {
            let questions = await this.$store.getters.quizTemplate.questions
            let questionsForCheck = structuredClone(questions)
            let hasImages = questionsForCheck.some(
              (question) => question?.fileImage?.name
            )
            if (hasImages) {
              for (let i = 0; i < questions.length; i++) {
                questionsForCheck = questionsForCheck.slice(i + 1)
                hasImages = questionsForCheck.some(
                  (question) => question?.fileImage?.name
                )
                const item = questions[i]
                if (item.fileImage.name) {
                  await TeacherService.updateImageQuestion(
                    this.$route.params.quizTemplateId,
                    i,
                    item.fileImage
                  ).then((res) => {
                    if (res.status == 200) {
                      if (!hasImages) {
                        this.$store.commit('TOGGLE_ALERT', {
                          type: 'success',
                          message: 'Successfully updated quiz template.',
                        })
                        this.$store.commit('TOGGLE_LOADING', false)
                        window.removeEventListener(
                          'beforeunload',
                          this.leavePageHandler
                        )
                        this.$router.push('/library')
                      }
                    }
                  })
                }
              }
            } else {
              this.$store.commit('TOGGLE_ALERT', {
                type: 'success',
                message: 'Successfully updated quiz template.',
              })
              this.$store.commit('TOGGLE_LOADING', false)
              window.removeEventListener('beforeunload', this.leavePageHandler)
              this.$router.push('/library')
            }
            this.resetQuizTemplate()
          })
          .catch((err) => {
            this.$store.commit('TOGGLE_LOADING', false)
            this.$store.commit('TOGGLE_ALERT', {
              type: 'error',
              message: err.response.message,
            })
          })
      } else {
        TeacherService.createQuizTemplate(this.$store.getters.quizTemplate)
          .then((res) => {
            return res.data
          })
          .then(async (res) => {
            let questions = await this.$store.getters.quizTemplate.questions
            let questionsForCheck = structuredClone(questions)
            let hasImages = questionsForCheck.some(
              (question) => question?.fileImage?.name
            )
            if (hasImages) {
              for (let i = 0; i < questions.length; i++) {
                questionsForCheck = questionsForCheck.slice(i + 1)
                hasImages = questionsForCheck.some(
                  (question) => question?.fileImage?.name
                )
                const item = questions[i]
                if (item.fileImage.name) {
                  await TeacherService.updateImageQuestion(
                    res.data.id,
                    i,
                    item.fileImage
                  ).then((res) => {
                    if (res.status == 200) {
                      if (!hasImages) {
                        this.$store.commit('TOGGLE_ALERT', {
                          type: 'success',
                          message: 'Successfully created quiz template.',
                        })
                        this.$store.commit('TOGGLE_LOADING', false)
                        window.removeEventListener(
                          'beforeunload',
                          this.leavePageHandler
                        )
                        this.$router.push('/library')
                      }
                    }
                  })
                }
              }
            } else {
              this.$store.commit('TOGGLE_ALERT', {
                type: 'success',
                message: 'Successfully created quiz template.',
              })
              this.$store.commit('TOGGLE_LOADING', false)
              window.removeEventListener('beforeunload', this.leavePageHandler)
              this.$router.push('/library')
            }

            this.resetQuizTemplate()
          })
          .catch((err) => {
            this.$store.commit('TOGGLE_LOADING', false)
            this.$store.commit('TOGGLE_ALERT', {
              type: 'error',
              message: err.response.message,
            })
          })
      }
    },

    async saveQuizTemplate() {
      this.$store.commit('TOGGLE_LOADING', true)
      let dateCreated = new Date()
      // let dd = String(dateCreated.getDate()).padStart(2, '0')
      // let mm = String(dateCreated.getMonth() + 1).padStart(2, '0')
      // let yyyy = dateCreated.getFullYear()
      // dateCreated = mm + '/' + dd + '/' + yyyy
      dateCreated = dateCreated.toLocaleString('en-GB')

      let teacher = structuredClone(this.$store.getters.user)
      teacher = {
        teacherId: this.$store.getters.userId,
        displayName: teacher.displayName,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        imageUrl: teacher.imageUrl,
      }

      this.$store.commit('setTeacher', teacher)
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
    this.$store.commit('TOGGLE_LOADING', true)
    if (!(this.$route.params.quizTemplateId == 'new')) {
      TeacherService.getQuizTemplateById(
        this.$route.params.quizTemplateId
      ).then((res) => {
        this.quizData = res.data
        this.$store.commit('setIsEditMode', true)
        this.$store.commit('setQuizTemplate', res.data)
        this.$store.commit('TOGGLE_LOADING', false)
      })
    } else this.$store.commit('TOGGLE_LOADING', false)
  },
  destroyed() {
    this.resetQuizTemplate()
    this.$store.commit('setIsEditMode', false)
  },
}
</script>

<style scoped>
.scrollbar {
  @apply overflow-auto;
}
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
  background: var(--v-primary-base);
  border-radius: 50px;
}

/* Handle on hover */
.scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--v-primary-base);
  border-radius: 50px;
}
</style>
