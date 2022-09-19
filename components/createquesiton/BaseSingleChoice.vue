<template>
  <div class="flex flex-col h-full">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full h-full auto-rows-fr flex-1"
    >
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
        @change-correct-choice="$emit('change-correct-choice', $event)"
      />
    </div>
    <!-- <div class="text-center h-fit flex-none">
      <v-btn text><v-icon left>mdi-plus</v-icon> add choice</v-btn>
    </div> -->
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