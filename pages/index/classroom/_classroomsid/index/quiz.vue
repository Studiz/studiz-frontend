<template>
  <v-data-table
    class="elevation-0 drop-shadow-sm !rounded-lg"
    mobile-breakpoint="0"
    :headers="headers"
    :items="quizzes"
    :items-per-page="10"
  >
    <template #top>
      <v-toolbar-title class="font-semibold p-3 flex items-center h-9">
        <span>Quiz list</span>
        <v-spacer />
      </v-toolbar-title>
    </template>
  </v-data-table>
</template>

<script>
import ClassroomService from '~/services/ClassroomService'
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

<style scoped>
.v-data-table {
  background-color: var(--v-background-base) !important;
  @apply p-2;
}
</style>
