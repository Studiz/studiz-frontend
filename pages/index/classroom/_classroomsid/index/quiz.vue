<template>
  <v-data-table
    class="elevation-0 !rounded-lg"
    mobile-breakpoint="0"
    :headers="headers"
    :items="quizHistories"
    :page.sync="page"
    :items-per-page="5"
    @click:row="clickRow"
    :search="search"
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

    <template v-slot:item.startAt="{ item }">
      <base-time-to-text :time="item.startAt" />
    </template>

    <template v-slot:item.image="{ item }">
      <v-img
        contain
        class="rounded-full background_card w-10 h-10"
        :src="item.image"
        :alt="item.title"
      ></v-img>
    </template>

    <template v-slot:item.winnerImage="{ item }">
      <v-list-item-avatar color="primary" size="30px">
        <v-img :src="item.winnerImage" :alt="item.winnerName" />
      </v-list-item-avatar>
    </template>
  </v-data-table>
</template>

<script>
import BaseTimeToText from '~/components/BaseTimeToText.vue'
export default {
  components: { BaseTimeToText },
  head() {
    return {
      titleTemplate: '%s - Quiz',
    }
  },
  watch: {
    itemsLength() {
      this.showScoreDependOnRole()
    },
  },
  data() {
    return {
      quizzes: [],
      headers: [
        {
          text: 'Date',
          align: 'start',
          value: 'startAt',
        },
        {
          text: 'Image',
          sortable: false,
          value: 'image',
          width: '40px',
          align: 'center',
        },
        { text: 'Quiz title', value: 'title', align: 'start' },
        {
          text: 'Participants',
          value: 'numberOfParticipants',
          align: 'center',
          width: '40px',
          sortable: false,
        },
        {
          text: '',
          sortable: false,
          value: 'winnerImage',
          width: '40px',
          align: 'center',
        },
        {
          text: 'Winner',
          align: 'start',
          value: 'winnerName',
        },
        {
          text: 'Total',
          value: 'numberQuestions',
          sortable: false,
          align: 'end',
        },
      ],
      page: 1,
      search: '',
    }
  },
  methods: {
    clickRow(item) {
      this.$router.push({
        name: 'summary-quizId',
        params: {
          quizId: item.quizId,
        },
      })
    },
    showScoreDependOnRole() {
      if (this.isTeacher) {
        this.headers.splice(6, 0, {
          text: 'AVG correct',
          value: 'avgCorrectAnswers',
          sortable: false,
          align: 'right',
          class: 'avg-score-column',
          width: 100,
        })
      } else {
        this.headers.splice(6, 0, {
          text: 'Correct Answers',
          value: 'correctAnswers',
          sortable: false,
          align: 'right',
          class: 'score-column',
          width: 100,
        })
      }
    },
  },
  computed: {
    quizHistories() {
      return this.$store.getters.quizHistories.map((quizHistory) => {
        return {
          quizId: quizHistory.quizId,
          startAt: quizHistory.quizData.startAt,
          image: quizHistory.quizData.image,
          title: quizHistory.quizData.title,
          numberOfParticipants: quizHistory.leaderboard.members.length,
          winnerImage: quizHistory.leaderboard.winner.image,
          winnerName: quizHistory.leaderboard.winner.displayName,
          correctAnswers: quizHistory?.members?.find(
            (member) => member.user.uid === localStorage.getItem('uid')
          ).numberCorrectAnswers,
          avgCorrectAnswers: quizHistory.quizData.avgCorrectAnswers,
          numberQuestions: quizHistory.quizData.numberQuestions,
        }
      })
    },
    itemsLength() {
      return this.quizHistories.length
    },
    isTeacher() {
      return this.$store.getters.userRole == 'TEACHER' ? true : false
    },
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    if (from.name === 'index-classrooms') {
      history.replaceState({}, '', '/classrooms')
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'index-classroom-classroomsid-index-member') {
      next()
    }
    next()
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
