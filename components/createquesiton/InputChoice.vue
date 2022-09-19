<template>
  <div
    class="p-2 rounded-lg flex transition-all shadow-md"
    :class="[
      renderCheckOptional ? classColor : 'bg-white dark:bg-opacity-40',
      quesitonType === 'true/false' ? 'h-full' : '',
    ]"
  >
    <div class="self-center cursor-pointer">
      <div v-if="renderCheckOptional">
        <div v-if="isCorrect" @click="unselectCorrectChoice">
          <v-icon
            color="white"
            class="p-2 bg-green-500/90 border-4 border-white rounded-full"
            >mdi-check-bold</v-icon
          >
        </div>
        <div
          v-else
          @click="changeCorrectChoice"
          class="p-2 bg-black/20 border-4 border-white rounded-full group"
        >
          <div class="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all">
            <v-icon color="white">mdi-check-bold</v-icon>
          </div>
        </div>
      </div>
      <div v-else class="w-12 h-12" />
    </div>

    <div
      v-if="quesitonType === 'true/false'"
      class="w-full h-fit text-center my-auto text-3xl"
    >
      <span>{{ newText }}</span>
    </div>
    <v-form
      v-else
      ref="form"
      lazy-validation
      @submit.prevent="saveNewText"
      class="min-h-[96px] max-h-40 h-fit w-full overflow-auto my-auto scrollbar"
    >
      <v-textarea
        solo
        flat
        auto-grow
        rows="1"
        class="!text-lg"
        background-color="transparent"
        v-model.trim="newText"
        :label="renderLableChoice"
        :rules="renderRules"
        :counter="120"
        @change="saveNewText"
        @input="saveNewText"
      ></v-textarea>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    classColor: {
      type: String,
      required: true,
    },
    option: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    currentQuesiton: {
      type: Number,
      required: true,
    },
    indexOfOptional: {
      type: Array,
      default: () => {
        return [2, 3]
      },
    },
    quesitonType: {
      type: String,
    },
  },
  watch: {
    currentQuesiton() {
      this.mappingCurrentText()
    },
    option() {
      this.mappingCurrentText()
    },
  },
  data() {
    return {
      rules: {
        required: (v) => !!v || 'Required.',
        choiceRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 120) ||
            'Classroom name must be less than 120 characters',
        ],
        ruleOptional: [
          (v) => {
            if (v)
              return (
                v.length <= 200 ||
                'Classroom name must be less than 120 characters'
              )
            else return true
          },
        ],
      },
      newText: null,
    }
  },
  methods: {
    saveNewText(event) {
      if (this.$refs.form.validate()) {
        this.$emit('save-input-text', {
          index: this.index,
          text: this.newText,
        })
      }
    },
    changeCorrectChoice() {
      this.$emit('change-correct-choice', this.index)
    },
    unselectCorrectChoice() {
      this.$emit('unselect-correct-choice', this.index)
    },
    mappingCurrentText() {
      this.newText = this.option
    },
  },
  computed: {
    renderLableChoice() {
      const isOptional = this.indexOfOptional.includes(this.index)
      if (isOptional) {
        return `Add answer (Optional)`
      } else return `Add answer `
    },
    renderRules() {
      const isOptional = this.indexOfOptional.includes(this.index)
      if (isOptional) {
        return this.rules.ruleOptional
      } else return this.rules.choiceRules
    },
    renderCheckOptional() {
      const isOptional = this.indexOfOptional.includes(this.index)
      if (!isOptional || this.option !== '') {
        return true
      } else return false
    },
  },
  created() {
    this.mappingCurrentText()
  },
}
</script>

<style scoped>
.red {
  @apply !bg-red-300/50 dark:!bg-red-300/40;
}
.yellow {
  @apply !bg-yellow-300/50 dark:!bg-yellow-300/40;
}
.green {
  @apply !bg-green-300/50 dark:!bg-green-300/40;
}
.blue {
  @apply !bg-sky-300/50 dark:!bg-sky-300/40;
}
:deep(.v-messages__message),
:deep(.v-counter) {
  @apply !text-sm;
}
:deep(.v-label) {
  @apply !text-base;
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
  background: var(--v-primary_shade-base);
  border-radius: 50px;
}
</style>
