<template>
  <div>
    <div class="md:flex justify-between items-center space-y-2 md:space-y-0">
      <h1 class="text-H1">Quiz History</h1>

      <v-btn
        height="48"
        color="primary"
        class="text-cap w-full md:w-auto rounded-lg"
        :class="[showInput ? 'd-none d-md-block' : '']"
        @click="showInput = !showInput"
        :showInput="showInput"
        v-if="userRole === 'STUDENT'"
        >join classroom</v-btn
      >
    </div>

    <v-divider class="my-5" />
  </div>
</template>

<script>
export default {}
</script>

<style></style>
