<template>
  <div
    class="flex flex-col gap-3 flex-1"
    :class="[renderIsTeacherRole ? '' : 'pb-[72px] md:pb-0']"
  >
    <div class="flex flex-col md:flex-row gap-3">
      <base-question-image
        class=""
        typeQuestions="sort"
        :questionImage="renderQuestionImage"
        :numberOfAnswer="numberOfAnswer"
      />

      <div class="grid grid-cols-1 gap-3 flex-1 h-full w-full auto-cols-fr">
        <draggable
          v-bind="dragOptions"
          v-model="choices"
          @end="changeOrdering"
          handle=".handle"
        >
          <transition-group
            type="transition"
            class="gap-3 flex flex-col h-full auto-cols-fr"
          >
            <base-question-choice
              v-for="(item, i) in choices"
              :key="`${i}-${item}`"
              :index="i"
              :item="item"
              :arrayChoiceColor="arrayChoiceColor"
              @selectAnswer="selectAnswer"
              typeQuestions="sort"
            />
          </transition-group>
        </draggable>
      </div>
    </div>

    <div
      v-if="!renderIsTeacherRole"
      class="inline-flex justify-center fixed bottom-0 left-0 md:relative p-3 md:p-0 w-full background"
    >
      <v-btn
        color="primary"
        height="56"
        class="w-full md:w-64 !px-5 rounded-md transition-all"
      >
        <span class="normal-case font-semibold">Summit</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import BaseQuestionChoice from './BaseQuestionChoice.vue'
import BaseQuestionImage from './BaseQuestionImage.vue'
export default {
  components: { draggable, BaseQuestionImage, BaseQuestionChoice },
  props: {
    question: {
      type: Object,
      required: true,
    },
    backendAnswer: {
      type: Number | null,
      required: true,
    },
    numberOfAnswer: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    backendAnswer() {
      this.renderBackendAnswer()
    },
  },
  data() {
    return {
      dragOptions: {
        animation: 200,
        disabled: false,
        ghostClass: 'ghost',
      },
      arrayChoiceColor: ['red', 'blue', 'yellow', 'green', 'cyan', 'purple'],
      isTimeExpired: false,
      isStepShowAnswer: false,
      selectedChoice: {},
      choices: [],
    }
  },
  methods: {
    changeOrdering() {
      // this.choices.forEach((item, index) => {
      //   item.index = index
      // })
      // this.$emit('change-option-ordering', this.choices)
    },
    selectAnswer(item, index) {
      if (
        !this.isTimeExpired &&
        Object.keys(this.selectedChoice).length === 0
      ) {
        item.isSelect = true
        this.selectedChoice = { item, index }
        this.$emit('select-choice', this.selectedChoice)
        this.choices.forEach((item) => {
          if (item.isSelect == false) {
            item.status = 'choice-blur'
          }
        })
      }
    },
    renderBackendAnswer() {
      this.isStepShowAnswer = true
      if (Object.keys(this.selectedChoice).length === 0) {
        this.choices.forEach((item, index) => {
          if (index === this.backendAnswer) {
            item.isCorrect = 'correct'
          } else {
            item.isCorrect = 'incorrect'
          }
        })
      } else {
        if (this.selectedChoice.index === this.backendAnswer) {
          this.selectedChoice.item.isCorrect = 'correct'
        } else {
          this.selectedChoice.item.isCorrect = 'incorrect'
        }
        console.log(this.backendAnswer)
        setTimeout(() => {
          this.choices.forEach((item, index) => {
            if (this.backendAnswer === index) {
              item.isCorrect = 'correct'
            } else item.status = 'choice-blur'
          })
        }, 500)
      }
    },
  },
  computed: {
    // renderQuestion() {
    //   return this.choices
    // },
    addStatusForEachChoice() {
      return this.question.answer.options.map((item) => {
        return {
          ...item,
          status: 'choice-blank', // choice-[blank / blur]
          isSelect: false, // [true / false]
          isCorrect: '', // [ '' / 'correct' / 'incorrect']
        }
      })
    },
    renderQuestionImage() {
      return this.question.image
    },
    renderIsTeacherRole() {
      return this.$store.getters.userRole === 'TEACHER' ? true : false
    },
  },
  created() {
    this.$nuxt.$on('time-expired', (prop) => {
      this.isTimeExpired = prop
    })
    this.choices = this.addStatusForEachChoice
  },
  destroyed() {
    this.$nuxt.$off('time-expired')
  },
}
</script>

<style scoped>
.ghost {
  opacity: 0.2;
}
</style>
