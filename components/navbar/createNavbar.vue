<template>
  <v-app-bar
    fixed
    app
    flat
    class="drop-shadow-md"
    height="60"
    dense
    clipped-left
    clipped-right
    color="background_card"
  >
    <div class="flex items-center justify-between gap-x-2">
      <v-btn
        height="50px"
        elevation="0"
        color="transparent"
        class="overflow-hidden"
        to="/"
      >
        <v-icon size="80">$vuetify.icons.Studiz_logo</v-icon>
      </v-btn>
      <v-form ref="form" lazy-validation @submit.prevent="editquizTitle">
        <v-container>
          <v-text-field
            v-model="newQuizTitle"
            @blur="editquizTitle"
            hide-details
            dense
            outlined
            required
            :rules="rules.nameRules"
            :counter="10"
          ></v-text-field>
        </v-container>
      </v-form>
      <v-spacer />
      <light-dark-mode class="!h-9 !w-9" />
      <v-btn outlined disabled>
        <v-icon left>mdi-eye-outline</v-icon>
        preview
      </v-btn>
      <v-divider vertical class="mx-2" />
      <v-btn outlined>exit</v-btn>
      <v-btn color="primary">save</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import lightDarkMode from './light-dark-mode.vue'
export default {
  components: { lightDarkMode },
  props: {
    quizTitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      newQuizTitle: '',
      rules: {
        required: (v) => !!v || 'Required.',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 10) ||
            'Classroom name must be less than 10 characters',
        ],
      },
    }
  },
  methods: {
    editquizTitle() {
      if (this.$refs.form.validate()) {
        this.$emit('edit-quiz-title', this.newQuizTitle)
      }
    },
  },
  mounted() {
    this.newQuizTitle = this.quizTitle == '' ? 'New quiz' : this.quizTitle
  },
}
</script>

<style></style>
