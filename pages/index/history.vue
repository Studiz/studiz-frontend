<template>
  <div>
    <div class="md:flex justify-between items-center space-y-2 md:space-y-0">
      <h1 class="text-H1">Quiz History</h1>
    </div>

    <v-divider class="my-5" />

    <div class="ring-1 ring-black ring-opacity-10 drop-shadow-sm rounded-lg">
      <v-data-table
        hide-default-footer
        mobile-breakpoint="600"
        class="elevation-0 !rounded-lg cursor-pointer"
        item-key="date"
        loading-text="Loading... Please wait"
        sort-by="date"
        :search="search"
        :sort-desc="true"
        :loading="isloading"
        :headers="headers"
        :items="itemQuizHistory"
        :page.sync="page"
        :items-per-page="itemsPerPage"
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
            ></v-text-field>
          </v-toolbar-title>
        </template>

        <!-- <template v-slot:item.startAt="{ item }">
          <base-time-to-text :time="item.startAt" />
          {{ formatDateForTimeAgo(item.startAt) }}
        </template> -->

        <template v-slot:item.image="{ item }">
          <v-img
            class="rounded-full"
            :src="item.image"
            :alt="item.name"
            max-width="40px"
            max-height="40px"
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
    isTeacher() {
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
          value: 'startAt',
        },
        {
          text: 'Image',
          sortable: false,
          value: 'image',
          width: '40px',
          align: 'center',
        },
        {
          text: 'Quiz name',
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
          value: 'totalQuestion',
          sortable: false,
          align: 'right',
        },
      ],

      itemQuizHistory: [
        {
          id: 1,
          image: 'https://picsum.photos/200/300',
          quizName: 'Quiz 1',
          class: 'Class 1',
          date: '2021-05-01 12:00:00',
          score: 10,
          avgScore: 3,
          total: 20,
        },
        {
          id: 2,
          image: 'https://picsum.photos/200/300',
          quizName: 'Quiz 2',
          class: 'Class 1',
          date: '2021-05-02 12:00:00',
          score: 15,
          avgScore: 8,
          total: 20,
        },
        {
          id: 3,
          image: 'https://picsum.photos/200/300',
          quizName: 'Quiz 3',
          class: 'Class 2',
          date: '2021-05-03 12:00:00',
          score: 20,
          avgScore: 20,
          total: 20,
        },
      ],
    }
  },
  methods: {
    hiddenScoreDependOnRole() {
      if (this.isTeacher) {
        this.headers.splice(4, 0, {
          text: 'AVG answer',
          value: 'avgAnswer',
          sortable: false,
          align: 'right',
          class: 'avg-score-column',
        })
      } else {
        this.headers.splice(4, 0, {
          text: 'Correct Answers',
          value: 'correctAnswers',
          sortable: false,
          align: 'right',
          class: 'score-column',
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
  },
  computed: {
    itemsPerPage() {
      return this.itemQuizHistory.length
    },
    isTeacher() {
      return this.$store.getters.userRole == 'TEACHER' ? true : false
    },
    renderItemQuizHistory() {
      return this.itemQuizHistory
    },
  },

  mounted() {
    this.hiddenScoreDependOnRole()

    if (this.$store.getters.userRole === 'TEACHER') {
      TeacherService.getQuizHistoryByTeacherId(localStorage.getItem('userId'))
        .then((res) => {
          this.itemQuizHistory = res.data.map((item) => {
            let sumAnswers = 0
            let memberInClass = item.members.length
            item.members.forEach((member) => {
              sumAnswers += member.quizData.filter(
                (data) => data.studentAnswer
              ).length
            })
            item.quizData.avgAnswer = sumAnswers / memberInClass
            item.quizData.startAt = this.fullFormatDate(item.quizData.startAt)
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
          this.itemQuizHistory = res.data.map((item) => {
            item.quizData.startAt = this.fullFormatDate(item.quizData.startAt)
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
}
</script>

<style lang="scss" scoped></style>
