<template>
  <div
    class="w-full group rounded-lg ring-1 background ring-black ring-opacity-10 p-4 flex flex-col md:flex-row gap-4 relative"
  >
    <v-img
      :src="quizTemplate.image"
      max-width="144"
      max-height="96"
      min-width="144"
      min-height="96"
      contain
      class="self-center"
    />
    <div class="flex flex-col gap-4">
      <div class="flex w-full">
        <div class="text-h5">
          <span class="font-bold line-clamp-1">{{ quizTemplate.title }}</span>
        </div>
        <v-spacer></v-spacer>
        <div
          class="absolute top-2 right-2 group-hover:visible group-hover:opacity-100 group-hover:w-auto group-hover:h-auto lg:opacity-0 lg:invisible transition-all"
        >
          <v-btn icon center @click="editQuizTemplate">
            <v-icon>$vuetify.icons.edit</v-icon>
          </v-btn>
          <v-btn icon center @click="deleteQuizTemplate">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
      <!-- <v-card-subtitle class="h-24 overflow-auto scrollbar">
          quiz description
      </v-card-subtitle>-->
      <div class="flex items-center justify-between w-full flex-wrap gap-4">
        <!-- <div class="px-3 py-1 rounded-full">10 items</div> -->
        <!-- <v-chip color="secondary" class="!hover:bg-secondary">10 items</v-chip> -->
        <span class="whitespace-nowrap self-end">Edit: {{ quizTemplate.lastUpdated }}</span>
        <div class="inline-flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          <v-btn color="white" class="w-full sm:w-auto" disabled>Assign</v-btn>
          <v-btn color="primary" class="w-full sm:w-auto" @click="startQuiz">Start</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TeacherService from '~/services/TeacherService'

export default {
  props: {
    quizTemplate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pincode: '',
    }
  },
  methods: {
    deleteQuizTemplate() {
      TeacherService.deleteQuizTemplate(this.quizTemplate.id).then(() => {
        this.$emit('delete-quiz-template', this.quizTemplate.id)
      })
    },
    editQuizTemplate() {
      this.$store.commit('setIsEditMode', true)
      this.$store.commit('isEditMode', true)
      this.$router.push({
        name: 'create-quizTemplateId',
        params: { quizTemplateId: this.quizTemplate.id },
      })
    },
    startQuiz() {
      TeacherService.createQuiz({
        teacherId: localStorage.getItem('userId'),
        quizTemplateId: this.quizTemplate.id,
        studentList: [],
      }).then((res) => {
        console.log(res.data);
        this.$router.push({
          name: 'lobby-quizId',
          params: { quizId: res.data.id }, 
        })
      })
    },
  },
  created() {},
}
</script>
