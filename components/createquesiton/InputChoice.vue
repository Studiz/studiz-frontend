<template>
  <div class="p-2 rounded-lg flex transition-all shadow-md" :class="classColor">
    <div class="self-center cursor-pointer">
      <div v-if="isCorrect" @click="unselectCorrectChoice">
        <v-icon
          color="white"
          class="p-2 bg-green-400 border-4 border-white rounded-full"
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

    <v-form
      ref="form"
      lazy-validation
      @submit.prevent="saveNewText"
      class="h-[128px] w-full flex items-center overflow-auto self-center"
    >
      <v-textarea
        solo
        flat
        auto-grow
        rows="1"
        label="Add answer"
        background-color="transparent"
        v-model.trim="newText"
        :rules="rules.nameRules"
        :counter="120"
        @blur="saveNewText"
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
      default: 'blue',
    },
    option: {
      type: String,
      default: '',
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    currentQuesiton: {
      type: Number,
      required: true,
    },
  },
  watch: {
    currentQuesiton() {
      this.mappingCurrentText()
    },
  },
  data() {
    return {
      rules: {
        required: (v) => !!v || 'Required.',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 120) ||
            'Classroom name must be less than 120 characters',
        ],
      },
      newText: null,
    }
  },
  methods: {
    saveNewText() {
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
  created() {
    this.mappingCurrentText()
  },
}
</script>

<style scoped>
.red {
  @apply !bg-red-300/50;
}
.yellow {
  @apply !bg-yellow-300/50;
}
.green {
  @apply !bg-green-300/50;
}
.blue {
  @apply !bg-sky-300/50;
}
</style>
