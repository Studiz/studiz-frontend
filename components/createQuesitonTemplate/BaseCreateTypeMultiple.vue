<template>
  <div class="flex flex-col h-full gap-3">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full h-full auto-rows-fr flex-1"
    >
      <base-create-input-choice
        v-for="(item, index) in renderQuestionAnswer.options"
        :option="item.option"
        :isCorrect="item.isCorrect"
        :key="`${index}-${item}`"
        :index="index"
        :classColor="arrayChoiceColor[index]"
        :currentQuesiton="currentQuesiton"
        :indexOfOptional="indexOfOptional"
        :questionType="questionType"
        :disableDelete="renderQuestionAnswer.options.length <= 2"
        @save-input-text="$emit('save-input-text', $event)"
        @change-correct-choice="changeCorrectChoice"
        @unselect-correct-choice="unSelectCorrectChoice"
        @delete-option="$emit('delete-option', $event)"
      />
    </div>
    <div
      v-if="renderQuestionAnswer.options.length < 6"
      class="text-center h-fit flex-none"
    >
      <v-btn
        height="24"
        elevation="0"
        color="primary"
        class="normal-case shadow-md"
        @click="addOption"
      >
        <v-icon left>mdi-plus</v-icon>
        <span class="normal-case">Add choice</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import BaseCreateInputChoice from './BaseCreateInputChoice.vue'
export default {
  components: { BaseCreateInputChoice },
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
      arrayChoiceColor: ['red', 'blue', 'yellow', 'green', 'cyan', 'purple'],
    }
  },
  methods: {
    addOption() {
      this.$emit('add-option')
    },
    changeCorrectChoice(event) {
      this.$forceUpdate()
      this.$nuxt.$emit('force-update-thumbnail')
      this.$emit('select-correct-choice', event)
    },
    unSelectCorrectChoice(event) {
      this.$forceUpdate()
      this.$nuxt.$emit('force-update-thumbnail')
      this.$emit('unselect-correct-choice', event)
    },
  },
}
</script>

<style></style>
