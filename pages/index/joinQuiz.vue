<template>
  <div v-if="this.$store.getters.userRole == 'STUDENT'">
    <h1 class="text-H1">Join Quiz</h1>
    <div class="max-w-lg mx-auto mt-5">
      <Input-join />
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.getters.userRole == 'TEACHER' ? this.$router.push('/') : ''
  },
}
</script>
