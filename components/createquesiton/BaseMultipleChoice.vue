<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full h-full auto-rows-fr">
    <input-choice
      v-for="(item, index) in renderQuestionAnswer.options"
      :option="item.option"
      :isCorrect="item.isCorrect"
      :key="`${index}-${item}`"
      :index="index"
      :classColor="arrayChoiceColor[index]"
      :currentQuesiton="currentQuesiton"
      :indexOfOptional="indexOfOptional"
      @save-input-text="$emit('save-input-text', $event)"
      @change-correct-choice="$emit('select-correct-choice', $event)"
      @unselect-correct-choice="$emit('unselect-correct-choice', $event)"
    />
  </div>
</template>

<script>
import InputChoice from './InputChoice.vue'
export default {
  components: { InputChoice },
  props: {
    renderQuestionAnswer: {
      type: Object,
      required: true,
    },
    currentQuesiton: {
      type: Number,
      required: true,
    },
    indexOfOptional: {
      type: Array,
    },
  },
  data() {
    return {
      arrayChoiceColor: ['red', 'blue', 'green', 'yellow'],
    }
  },
}
</script>

<style></style>
