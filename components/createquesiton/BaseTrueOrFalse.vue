<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full h-full auto-rows-fr">
    <input-choice
      class="h-full"
      v-for="(item, index) in MappingAnswerWithOption"
      :key="`${index}-${item}`"
      :option="item.option"
      :isCorrect="item.isCorrect"
      :index="index"
      :questionType="questionType"
      :classColor="arrayChoiceColor[index]"
      :currentQuesiton="currentQuesiton"
      @change-correct-choice="changeCorrectChoiceTrueFalse"
    />
  </div>
</template>

<script>
import InputChoice from './InputChoice.vue'
export default {
  components: { InputChoice },
  props: {
    renderQuestionAnswer: {
      type: Boolean | null,
      required: true,
    },
    currentQuesiton: {
      type: Number,
      required: true,
    },
    questionType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      arrayChoiceColor: ['red', 'blue'],
      options: [
        {
          option: 'True',
          isCorrect: false,
        },
        {
          option: 'False',
          isCorrect: false,
        },
      ],
    }
  },
  methods: {
    changeCorrectChoiceTrueFalse(index) {
      this.options.forEach((item, i) => {
        if (i === index) {
          item.isCorrect = true
        } else {
          item.isCorrect = false
        }
      })
      index === 0 ? (index = true) : (index = false)
      this.$emit('change-correct-choice', index)
    },
  },
  computed: {
    MappingAnswerWithOption() {
      if (this.renderQuestionAnswer !== null) {
        this.renderQuestionAnswer
          ? (this.options[0].isCorrect = true)
          : (this.options[1].isCorrect = true)
      } else {
        this.options.forEach((element) => {
          element.isCorrect = false
        })
      }
      return this.options
    },
  },
}
</script>

<style></style>
