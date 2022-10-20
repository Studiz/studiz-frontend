<template>
  <div
    class="overflow-hidden pa-2 pa-md-3 !shadow-md min-h-[126px] max-h-32 rounded-lg background_card"
  >
    <v-form
      ref="form"
      lazy-validation
      @submit.prevent="saveNewQuestion"
      class="w-full min-h-[102px] max-h-20 h-fit overflow-auto scrollbar"
    >
      <v-textarea
        solo
        flat
        auto-grow
        rows="1"
        max-height="80px"
        label="Add question"
        background-color="transparent"
        v-model.trim="newQuestion"
        :rules="rules.nameRules"
        :counter="120"
        @change="saveNewQuestion"
        @keydown="checkKeyEnter"
      ></v-textarea>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    dataQuestion: {
      type: Object,
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
    dataQuestion() {
      this.mappingCurrentText()
    },
  },
  data() {
    return {
      rules: {
        required: (v) => !!v || 'Question is required.',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 120) ||
            'Question must be less than 120 characters',
          (v) => {
            if (/\r?\n|\r/g.test(v)) {
              return false || 'Enter key is not allowed'
            } else return true
          },
        ],
      },
      newQuestion: null,
    }
  },
  methods: {
    saveNewQuestion() {
      if (this.$refs.form.validate()) {
        this.$emit('save-input-question', this.newQuestion)
      }
    },
    mappingCurrentText() {
      this.newQuestion = this.dataQuestion.question
    },
    checkKeyEnter(e) {
      var key = e.keyCode || e.charCode
      if (key == 13) {
        e.preventDefault()
      }
    },
  },
  created() {
    this.mappingCurrentText()
  },
}
</script>

<style scoped>
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

:deep(.v-messages__message),
:deep(.v-counter) {
  @apply !text-sm  !text-opacity-0;
}
</style>
