<template>
  <v-data-table
    class="elevation-0 drop-shadow-sm !rounded-lg"
    mobile-breakpoint="0"
    :headers="headers"
    :items="quizzes"
    :items-per-page="10"
  >
    <template #top>
      <v-toolbar-title class="p-3 flex items-center flex-wrap gap-x-5">
        <span class="font-semibold h-9">Quiz list</span>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
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
      search: '',
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

:deep(.v-data-table__mobile-row) {
  @apply first:justify-start;
}

/* :deep(table > thead > tr > th:nth-child(4)) {
  @apply whitespace-nowrap;
}
:deep(tr > .text-end) {
  @apply hidden sm:table-cell;
} */

:deep(td),
:deep(th) {
  @apply !px-3;
}
:deep(thead) {
  @apply overflow-scroll;
}
:deep(tr > .text-start) {
  @apply whitespace-nowrap;
}

.v-data-table {
  background-color: var(--v-background-base) !important;
  @apply p-2;
}
.v-text-field {
  padding-top: 0px;
  margin-top: 0px;
}
</style>
