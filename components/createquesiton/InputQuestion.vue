<template>
  <v-sheet
    rounded="lg"
    elevation="1"
    color="background_card"
    class="overflow-hidden pa-2 pa-md-3 h-28"
  >
    <v-form
      ref="form"
      lazy-validation
      @submit.prevent="saveNewQuestion"
      class="w-full flex items-center overflow-auto self-center max-h-20"
    >
      <v-textarea
        light
        solo
        flat
        auto-grow
        rows="1"
        label="Add answer"
        background-color="transparent"
        v-model.trim="newQuestion"
        :rules="rules.nameRules"
        :counter="120"
        @blur="saveNewQuestion"
      ></v-textarea>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  props: {
    quiestion: {
      type: String,
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
        required: (v) => !!v || 'Question is required.',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 120) ||
            'Question must be less than 120 characters',
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
      this.newQuestion = this.quiestion
    },
  },
  created() {
    this.mappingCurrentText()
    console.log(this.quiestion)
  },
}
</script>

<style></style>
