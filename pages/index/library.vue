<template>
  <div v-if="this.$store.getters.userRole == 'TEACHER'">
    <h1 class="text-H1">My library</h1>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>