<template>
  <div class="space-y-3 xl:space-y-5 max-w-6xl mx-auto">
    <v-card
      v-if="userRole == 'TEACHER'"
      flat
      class="primary_shade rounded-lg p-3 overflow-hidden drop-shadow-md space-y-3"
    >
      <div class="flex justify-between flex-wrap">
        <div class="inline-flex flex-wrap p-3 gap-3">
          <v-img
            class="rounded-lg primary w-full h-auto"
            :src="summaryData?.quizData?.image"
            max-height="60px"
            max-width="60px"
          />
          <div class="font-semibold">
            <div class="text-H2">{{ summaryData?.quizData?.title }}</div>
            <div>Questions ({{ summaryData?.quizData?.totalQuestion }})</div>
          </div>
          <div>
            <v-chip
              label
              outlined
              v-for="tag in summaryData?.quizData?.tags"
              :key="tag"
              class="shadow-sm mr-2"
              >{{ tag }}</v-chip
            >
          </div>
        </div>
        <div class="flex-wrap inline-flex gap-x-3 p-3 self-end h-fit">
          <!-- <span class="h-1 w-1 bg-gray-500 rounded-xl self-center" /> -->
          <div>Update: {{ summaryData?.quizData?.lastUpdated }}</div>
        </div>
      </div>
    </v-card>

    <v-card
      v-else
      flat
      class="primary_shade rounded-lg p-3 !max-w-6xl mx-auto overflow-hidden drop-shadow-md"
    >
      <div class="md:flex">
        <v-img
          class="rounded-lg primary w-full h-auto mx-auto"
          :src="summaryData?.quizData?.image"
          max-height="150px"
          max-width="150px"
        ></v-img>
        <div>
          <v-card-title>{{ summaryData?.quizData?.title }}</v-card-title>
          <v-card-text>{{ summaryData?.quizData?.description }}</v-card-text>
          <div class="mx-3">
            <v-chip
              label
              outlined
              v-for="tag in summaryData?.quizData?.tags"
              :key="tag"
              class="shadow-sm mr-2"
              >{{ tag }}</v-chip
            >
          </div>
        </div>
        <div class="flex md:flex-col items-end flex-wrap justify-between">
          <v-card-subtitle class="whitespace-nowrap text-end !font-semibold"
            >Questions ({{
              summaryData?.quizData?.totalQuestion
            }})</v-card-subtitle
          >
          <div
            class="whitespace-nowrap inline-flex px-4 pb-4 gap-x-3 items-end md:justify-end"
          >
            <v-img
              class="rounded-full primary"
              :src="summaryData?.quizData?.teacher?.imageUrl"
              max-height="48px"
              max-width="48px"
            />
            <div>
              <div>{{ summaryData?.quizData?.teacher?.displayName }}</div>
              <div>{{ summaryData?.quizData?.lastUpdated }}</div>
            </div>
          </div>
        </div>
      </div>
    </v-card>

    <lottie-player
      v-if="isWinner"
      autoplay
      src="https://assets5.lottiefiles.com/private_files/lf30_ujs3c7ok.json"
      style="width: 500px"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />

    <!-- <div class="flex md:flex-row flex-col-reverse gap-3"> -->

    <v-card
      flat
      class="rounded-lg p-3 overflow-hidden drop-shadow-md flex-1 h-fit"
    >
      <div class="flex flex-row items-center justify-center">
        <v-img
          class="rounded-full primary"
          :src="summaryData?.leaderboard?.winner?.image"
          max-height="65px"
          max-width="65px"
        />
        <v-card-title
          >The winner is
          {{ summaryData?.leaderboard?.winner?.displayName }}</v-card-title
        >
        <div>
          <lottie-player
            autoplay
            loop
            src="https://assets3.lottiefiles.com/packages/lf20_touohxv0.json"
            style="width: 100px"
          />
        </div>
      </div>
      <v-card-subtitle v-if="userRole == 'STUDENT'"
        >Your score {{ studentScore }}</v-card-subtitle
      >
      <v-card-text v-if="userRole == 'STUDENT'"
        >Number of correct answers
        {{ numberCorrectAnswers ? numberCorrectAnswers : 0 }}/{{
          summaryData?.quizData?.totalQuestion
        }}</v-card-text
      >
    </v-card>

    <the-leader-board
      :membersInClass="membersInClass"
      :currentStatus="'summary'"
      class="flex-1 w-full"
    />

    <div
      class="max-w-xl mx-auto background_card drop-shadow-md p-3 rounded-lg space-y-3"
    >
      <div class="flex justify-between">
        <span>Score: {0}/{00}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-lg font-semibold">Correct: {0}</span>
        <span>Incorrect: {0}</span>
      </div>
      <div
        id="question"
        class="p-2 flex flex-row-reverse items-start ring-1 ring-black/10 dark:ring-white/10 !rounded-lg overflow-hidden relative"
        v-for="(question, index) in quiz.questions"
        :key="`${question}-${index}`"
      >
        <div v-if="question.image" id="image" class="inline-flex">
          <v-img
            contain
            content-class="ring-1 ring-black/10 dark:ring-white/10 !rounded-md"
            class="self-center justify-self-center background_card transition-all duration-500 p-px rounded-md overflow-hidden w-14 h-14"
            :src="question.image"
          />
        </div>

        <div class="flex flex-col justify-start ml-2">
          <div class="text-lg">{{ index + 1 }}. {{ question.question }}</div>
          <v-divider class="my-2 mr-2" />
          <div
            id="choices"
            class="flex flex-col"
            v-for="(choice, i) in question.answer.options"
            :key="i"
          >
            <div id="choice" class="flex gap-2 items-start">
              <div class="w-3 h-3 py-1 inline-flex">
                <span class="w-3 h-3 rounded-full bg-lime-500 mt-0.5" />
              </div>
              <span>{{ choice.option }}</span>
              <v-spacer />
              <div v-if="choice.selected">{{ choice.selected }}%</div>
            </div>
          </div>
        </div>

        <div class="absolute top-0 bottom-0 left-0 bg-white w-2"></div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import TheLeaderBoard from '~/components/quiz/TheLeaderBoard.vue'
import QuizService from '~/services/QuizService'
import socket from '~/plugins/socket.io'

export default {
  components: { TheLeaderBoard },
  data() {
    return {
      summaryData: {},
      membersInClass: [
        // {
        //   displayName: 'John Doe',
        //   image: 'https://picsum.photos/200',
        //   score: 0,
        // },
        // {
        //   displayName: 'John Doe',
        //   image: '',
        //   score: 0,
        // },
        // {
        //   displayName: 'John Doe',
        //   image: 'https://picsum.photos/200',
        //   score: 0,
        // },
        // {
        //   displayName: 'John Doe',
        //   image: 'https://picsum.photos/200',
        //   score: 0,
        // },
      ],
      quiz: {
        description: 'dfwafdadwa',
        questions: [
          {
            type: 'single',
            answer: {
              options: [
                {
                  option: 'dawdad',
                  isCorrect: false,
                },
                {
                  isCorrect: true,
                  option: 'dwaadwadwa',
                },
                {
                  isCorrect: false,
                  option: 'dawdwa',
                },
                {
                  option: 'dawdwad',
                  isCorrect: false,
                },
              ],
            },
            time: 10000,
            question: 'fdawfwaf',
            image: '',
          },
          {
            answer: {
              options: [
                {
                  option: 'dwadw',
                  isCorrect: false,
                },
                {
                  isCorrect: true,
                  option: 'dawdwad',
                },
                {
                  option: 'dawddwad',
                  isCorrect: false,
                },
                {
                  option: 'ddawdwa',
                  isCorrect: false,
                },
              ],
            },
            type: 'multiple',
            numAnswers: 1,
            time: 10000,
            question: 'dawdadwa',
            image: '',
          },
          {
            question: 'Who',
            type: 'true/false',
            answer: false,
            time: 5000,
            fileImage: {},
            image:
              'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/1666703105548_eula8.jpg?alt=media&token=1bf9a1b7-149d-428f-9565-eb4ddd212fc3',
          },
          {
            time: 15000,
            answer: {
              options: [
                {
                  option: 'asfsda',
                  selected: 0,
                },
                {
                  option: 'fasfsf',
                  selected: 0,
                },
              ],
            },
            image: '',
            type: 'poll',
            question: 'asfadsfads',
          },
          {
            type: 'sort',
            question: 'afadsfadsf',
            answer: {
              options: [
                {
                  index: 0,
                  option: 'fasfdsdf',
                  selected: 20,
                },
                {
                  option: 'asdfsd',
                  index: 1,
                  selected: 30,
                },
                {
                  option: 'afsdfasdf',
                  index: 2,
                  selected: 50,
                },
              ],
            },
            time: 15000,
            image: '',
          },
        ],
        tags: ['Music'],
        teacher: {
          teacherId: '56iqyWsODtR57lsaxyHo',
          imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/1664356348723_pen.png?alt=media&token=82a0f97e-87d4-487a-96da-19b982494067',
          firstName: 'John',
          displayName: 'Jann ka ',
          lastName: 'Cena',
        },
        lastUpdated: '26/10/2022, 21:01:53',
        createAt: '25/10/2022, 13:05:05',
        title: 'teads',
        image:
          'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/Studiz_logo.svg?alt=media&token=2cce045c-f6ba-4275-a81d-656343885abc',
      },
    }
  },
  methods: {
    leaveRoom() {
      if (confirm('Do you want to leave the room?')) {
        socket.emit('leave-lobby', {
          quizId: this.$route.params.quizId,
          memberId: localStorage.getItem('memberId'),
        })
        localStorage.removeItem('memberId')
        this.$router.push('/')
      }
    },
    endGame() {
      socket.emit('end-game', {
        quizId: this.$route.params.quizId,
      })
    },
    addOptionInTrueFalseQuestion() {
      this.quiz.questions.map((question) => {
        if (question.type === 'true/false') {
          question.answer = {
            options: [
              {
                option: 'True',
                isCorrect: false,
              },
              {
                option: 'False',
                isCorrect: false,
              },
            ],
          }
        }
      })
    },
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole
    },
    student() {
      return this.summaryData?.members?.find((member) => {
        return member.user?.uid === this.$store.getters.user?.uid
      })
    },
    studentScore() {
      return this.student?.totalScore
    },
    numberCorrectAnswers() {
      return this.student?.quizData?.filter((quiz) => {
        return quiz.studentAnswer
      }).length
    },
    isWinner() {
      return this.$route.params.winnerId
        ? this.$route.params.winnerId === localStorage.getItem('memberId')
        : false
    },
  },
  destroyed() {
    // if (confirm('Do you want to leave the room?')) {
    //   socket.disconnect()
    // }
  },
  mounted() {
    // this.membersInClass = this.$route.params.summaryData?.leaderboard.members

    socket.on('move-to-home', () => {
      this.$store.commit('TOGGLE_ALERT', {
        type: 'info',
        message: 'The quiz has been ended by the teacher',
      })
      this.$router.push('/')
      localStorage.removeItem('memberId')
    })

    this.addOptionInTrueFalseQuestion()
  },
  created() {
    QuizService.getQuizHistoryByQuizId(this.$route.params.quizId).then(
      (res) => {
        this.summaryData = res.data
        console.log(this.summaryData?.leaderboard?.members)
        this.membersInClass = this.summaryData?.leaderboard?.members
        console.log('Param', this.$route.params.winnerId)
        console.log(localStorage.getItem('memberId'))
      }
    )
  },
}
</script>

<style lang="scss" scoped></style>
