<template>
  <div v-if="this.$store.getters.userRole == 'STUDENT'">
    <h1 class="text-H1">Join Quiz</h1>
    <div class="max-w-lg mx-auto mt-5">
      <Input-join @join-number="joinQuiz" />
    </div>
  </div>
</template>

<script>
import StudentService from '~/services/StudentService.js'

export default {
  created() {
    this.$store.getters.userRole == 'TEACHER' ? this.$router.push('/') : ''
  },
  methods: {
    joinQuiz(pinCode) {
      StudentService.joinQuiz(pinCode, {
        studentId: localStorage.getItem('userId'),
      })
        .then((res) => {
          console.log(res)
          this.$router.push({
            name: 'lobby-quizId',
            params: { quizId: res.data.quizId },
          })
        })
        .catch((err) => {
          alert(err.response.data)
          this.$router.push('/joinquiz')
        })
    },
  },
}
</script>
