<template>
  <v-data-table :headers="headers" :items="quizzes" :items-per-page="5" class="elevation-1"></v-data-table>
</template>

<script>
import ClassroomService from '../../../../../services/ClassroomService'
export default {
  data() {
    return {
      quizzes: [],
      headers: [
        {
          text: 'Date',
          align: 'start',
          value: 'date',
        },
        { text: 'Title', value: 'title' },
        { text: 'Participants', align: 'end', value: 'numberOfParticipants' },
      ],
    }
  },
  methods: {
    loadData() {
      ClassroomService.getClassroom(this.$route.params.classroomsid).then(
        (res) => {
          this.$store.commit('setClassroom', res.data)
          this.quizzes = this.$store.getters.quizzes
        }
      )
    },
  },
  created() {
    this.loadData()
  },
}
</script>

<style></style>
