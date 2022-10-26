<template>
  <div>
    <div class="md:flex justify-between items-center space-y-2 md:space-y-0">
      <h1 class="text-H1">Quiz History</h1>
    </div>

    <v-divider class="my-5" />

    <div class="ring-1 ring-black ring-opacity-10 drop-shadow-sm rounded-lg">
      <v-data-table
        hide-default-footer
        mobile-breakpoint="600px"
        class="elevation-0 !rounded-lg"
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

        <template v-slot:item.date="{ item }">
          <base-time-to-text :time="item.date" />
        </template>

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
export default {
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
          value: 'date',
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
          value: 'quizName',
        },
        {
          text: 'Class room',
          value: 'class',
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
          value: 'total',
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
          text: 'AVG score',
          value: 'avgScore',
          sortable: false,
          align: 'right',
          class: 'avg-score-column',
        })
      } else if (this.isStudent) {
        this.headers.splice(5, 0, {
          text: 'Score',
          value: 'score',
          sortable: false,
          align: 'right',
          class: 'score-column',
        })
      }
    },
    clickRow(item) {
      console.log(item)
    },
  },
  computed: {
    itemsPerPage() {
      return this.itemQuizHistory.length
    },
    isTeacher() {
      return this.$store.getters.userRole == 'TEACHER' ? true : false
    },
  },

  mounted() {
    this.hiddenScoreDependOnRole()
  },
}
</script>

<style lang="scss" scoped></style>
