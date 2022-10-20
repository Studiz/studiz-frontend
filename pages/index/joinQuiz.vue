<template>
  <div v-if="this.$store.getters.userRole == 'STUDENT'">
    <div class="flex">
      <h1 class="text-H1">Join Quiz</h1>
    </div>

    <v-divider class="my-5" />

    <div class="max-w-lg mx-auto mt-5">
      <the-input-join @join-number="joinQuiz" />
    </div>
  </div>
</template>

<script>
import TheInputJoin from '~/components/TheInputJoin.vue'
import StudentService from '~/services/StudentService.js'

export default {
  components: { TheInputJoin },
  created() {
    this.$store.getters.userRole == 'TEACHER' ? this.$router.push('/') : ''
  },
  methods: {
    joinQuiz(pinCode) {
      StudentService.joinQuiz(pinCode, {
        studentId: localStorage.getItem('userId'),
      })
        .then((res) => {
          this.$router.push({
            name: 'lobby-quizId',
            params: { quizId: res.data.quizId },
          })
        })
        .catch((err) => {
          this.$store.commit('TOGGLE_ALERT', {
            type: 'error',
            message: err.response.data,
          })
          this.$router.push('/joinquiz')
        })
    },
  },
}
</script>
