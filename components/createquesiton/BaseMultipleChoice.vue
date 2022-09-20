<template>
  <div class="flex flex-col h-full gap-3">
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
        :questionType="questionType"
        @save-input-text="$emit('save-input-text', $event)"
        @change-correct-choice="$emit('select-correct-choice', $event)"
        @unselect-correct-choice="$emit('unselect-correct-choice', $event)"
      />
    </div>
    <div
      v-if="renderQuestionAnswer.options.length < 6"
      class="text-center h-fit flex-none"
    >
      <v-btn height="24" text class="normal-case" @click="addOption">
        <v-icon left>mdi-plus</v-icon>
        <span class="normal-case">Add choice</span>
      </v-btn>
    </div>
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
    questionType: {
      type: String,
      required: true,
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
