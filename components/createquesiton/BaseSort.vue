<template>
  <div class="flex flex-col h-full gap-3">
    <div class="grid grid-cols-1 gap-3 w-full h-full auto-rows-fr flex-1">
      <draggable
        v-bind="dragOptions"
        v-model="newDataQuestion"
        @end="changeOrdering"
        handle=".handle"
      >
        <transition-group
          type="transition"
          class="gap-2 flex flex-col overflow-auto scrollbar py-1 py-lg-0"
        >
          <input-choice
            v-for="(item, index) in newDataQuestion"
            :option="item.option"
            :key="`${index}-${item}`"
            :index="index"
            :classColor="arrayChoiceColor[index]"
            :currentQuesiton="currentQuesiton"
            :indexOfOptional="indexOfOptional"
            :questionType="questionType"
            :disableDelete="newDataQuestion.length <= 3"
            @save-input-text="$emit('save-input-text', $event)"
            @delete-option="$emit('delete-option', $event)"
          />
        </transition-group>
      </draggable>
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
import draggable from 'vuedraggable'
import InputChoice from './InputChoice.vue'
export default {
  components: { draggable, InputChoice },
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
  watch: {
    renderQuestionAnswer: {
      handler: function (newVal, oldVal) {
        // this.newDataQuestion = newVal.options
        this.mappingDataQuestion()
      },
      deep: true,
    },
  },
  data() {
    return {
      dragOptions: {
        animation: 200,
        disabled: false,
        ghostClass: 'ghost',
      },
      newDataQuestion: {},
      arrayChoiceColor: ['red', 'blue', 'yellow', 'green', 'cyan', 'purple'],
    }
  },
  methods: {
    addOption() {
      this.$emit('add-option', this.questionType)
    },
    changeOrdering() {
      this.newDataQuestion.forEach((item, index) => {
        item.index = index
      })
      this.$emit('change-option-ordering', this.newDataQuestion)
    },
    mappingDataQuestion() {
      this.newDataQuestion = this.renderQuestionAnswer.options
    },
  },
  created() {
    this.mappingDataQuestion()
  },
}
</script>

<style scoped>
.ghost {
  opacity: 0.2;
}
</style>
