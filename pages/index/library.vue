<template>
  <div v-if="this.$store.getters.userRole == 'TEACHER'">
    <div class="items-center justify-between space-y-2 md:flex md:space-y-0">
      <h1 class="text-H1">My library</h1>
      <v-btn
        height="50"
        color="primary"
        class="text-cap w-full md:w-auto rounded-lg"
        :to="{
          name: 'create-quizTemplateId',
          params: { quizTemplateId: 'new' },
        }"
      >Create</v-btn>
    </div>
    <v-divider class="my-5"></v-divider>
    <quiz-template-list
      v-for="quizTemplate in quizTemplates"
      :quizTemplate="quizTemplate"
      :key="quizTemplate.id"
      @delete-quiz-template="deleteQuizTemplate"
    />
  </div>
</template>

<script>
import BaseDialogCondition from '~/components/BaseDialogCondition.vue'
import QuizTemplateList from '~/components/Teacher/quizTemplateList.vue'
import TeacherService from '~/services/TeacherService'

export default {
  components: { BaseDialogCondition, QuizTemplateList },
  data() {
    return {
      rules: {
        required: (v) => !!v || 'Required.',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 10) ||
            'Classroom name must be less than 10 characters',
        ],
        descriptionRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 10) ||
            'DescriptionRules must be less than 10 characters',
        ],
      },
      quizTemplates: [],
    }
  },
  methods: {
    deleteQuizTemplate(id) {
      this.quizTemplates = this.quizTemplates.filter(
        (quizTemplate) => quizTemplate.id !== id
      )
    },
  },
  created() {
    TeacherService.getQuizTemplate(localStorage.getItem('userId')).then(
      (res) => {
        this.quizTemplates = res.data
      }
    )
  },
}
</script>

<style scoped>
:deep(.btn-dialog-style) {
  @apply w-full md:w-auto;
}
</style>
