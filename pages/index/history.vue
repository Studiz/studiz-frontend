<template>
  <div>
    <div class="md:flex justify-between items-center space-y-2 md:space-y-0">
      <h1 class="text-H1">Quiz History</h1>
    </div>

    <v-divider class="my-5" />

    <div class="ring-1 ring-black ring-opacity-10 drop-shadow-sm rounded-lg">
      <v-data-table
        mobile-breakpoint="600"
        class="elevation-0 !rounded-lg"
        item-key="startAtTimestamp"
        loading-text="Loading... Please wait"
        sort-by="startAtTimestamp"
        :search="search"
        :sort-desc="true"
        :loading="isloading"
        :headers="headers"
        :items="itemQuizHistory"
        :page.sync="page"
        :items-per-page="10"
        @click:row="clickRow"
      >
        <template #top
          ><v-toolbar-title class="pb-3 px-3">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              type="text"
            ></v-text-field>
          </v-toolbar-title>
        </template>

        <template v-slot:item.startAtTimestamp="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                {{ item.startAtAgo }}
              </span>
            </template>
            <span> {{ item.startAt }}</span>
          </v-tooltip>
        </template>

        <template v-slot:item.image="{ item }">
          <v-img
            contain
            class="rounded-full background_card w-10 h-10"
            :src="item.image"
            :alt="item.name"
          ></v-img>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import BaseTimeToText from '~/components/BaseTimeToText.vue'
import StudentService from '~/services/StudentService.js'
import TeacherService from '~/services/TeacherService.js'
import dateFormat from '~/plugins/date-format'

export default {
  mixins: [dateFormat],
  components: { BaseTimeToText },
  head() {
    return {
      title: 'Quiz History',
    }
  },
  watch: {
    haveRole() {
      this.loadData()
    },
    itemsLength() {
      this.hiddenScoreDependOnRole()
    },
  },
  data() {
    return {
      page: 1,
      search: '',
      isloading: false,
      headers: [
        {
          text: 'Date',
          value: 'startAtTimestamp',
          filterable: false,
        },
        {
          text: 'Image',
          sortable: false,
          value: 'image',
          width: '40px',
          align: 'center',
        },
        {
          text: 'Quiz title',
          value: 'title',
        },
        {
          text: 'Class room',
          value: 'classroomName',
        },
        // {
        //   text: 'Score',
        //   value: 'score',
        //   sortable: false,
        //   align: 'right',
        //   class: 'score-column',
        // },
        // {
        //   text: 'AVG score',
        //   value: 'avgScore',
        //   sortable: false,
        //   align: 'right',
        //   class: 'avg-score-column',
        // },
        {
          text: 'Total',
          value: 'numberQuestions',
          sortable: false,
          align: 'right',
        },
      ],

      itemQuizHistory: [],
    }
  },
  methods: {
    hiddenScoreDependOnRole() {
      if (this.isTeacher) {
        this.headers.splice(4, 0, {
          text: 'AVG answer',
          value: 'avgCorrectAnswers',
          sortable: false,
          align: 'right',
          class: 'avg-score-column',
          width: 100,
        })
      } else {
        this.headers.splice(4, 0, {
          text: 'Correct Answers',
          value: 'correctAnswers',
          sortable: false,
          align: 'right',
          class: 'score-column',
          width: 100,
        })
      }
    },
    clickRow(item) {
      this.$router.push({
        name: 'summary-quizId',
        params: {
          quizId: item.quizId,
        },
      })
    },
    loadData() {
      if (this.$store.getters.userRole === 'TEACHER') {
        TeacherService.getQuizHistoryByTeacherId(localStorage.getItem('userId'))
          .then((res) => {
            this.isloading = false
            this.itemQuizHistory = res.data.map((item) => {
              item.quizData.startAt = item.quizData.startAt
              item.quizData.startAtTimestamp = Date.parse(
                this.formatDateForParse(item.quizData.startAt)
              )
              item.quizData.startAtAgo = this.timeToWords(
                this.formatDateForParse(item.quizData.startAt)
              )
              item.quizData.quizId = item.quizId
              return item.quizData
            })
          })
          .catch((err) => {
            this.itemQuizHistory = []
            console.log(err)
          })
      } else {
        StudentService.getQuizHistoryByStudentUid(localStorage.getItem('uid'))
          .then((res) => {
            this.isloading = false
            this.itemQuizHistory = res.data.map((item) => {
              item.quizData.startAt = item.quizData.startAt
              item.quizData.startAtTimestamp = Date.parse(
                this.formatDateForParse(item.quizData.startAt)
              )
              item.quizData.startAtAgo = this.timeToWords(
                this.formatDateForParse(item.quizData.startAt)
              )
              item.quizData.correctAnswers = item.members[
                item.members.findIndex((member) => {
                  return member.user.uid === localStorage.getItem('uid')
                })
              ].quizData.filter((question) => question.studentAnswer).length
              item.quizData.quizId = item.quizId
              return item.quizData
            })
          })
          .catch((err) => {
            this.itemQuizHistory = []
            console.log(err)
          })
      }
    },
  },
  computed: {
    itemsLength() {
      return this.itemQuizHistory.length
    },
    isTeacher() {
      return this.$store.getters.userRole == 'TEACHER' ? true : false
    },
    haveRole() {
      return this.$store.getters.userRole !== '' ? true : false
    },
    renderItemQuizHistory() {
      return this.itemQuizHistory
    },
  },

  mounted() {
    this.isloading = true
  },
  created() {
    this.loadData()
  },
}
</script>

<style scoped>
:deep(div.v-data-table__wrapper
    > table
    > tbody
    > tr
    > td.text-right:nth-child(5)) {
  @apply truncate !w-24;
}

.v-data-table {
  background-color: var(--v-background-base) !important;
  @apply p-2;
}
:deep(tbody > tr) {
  @apply cursor-pointer;
}
</style>
