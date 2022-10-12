<template>
  <div
    v-if="questionImage !== ''"
    class="flex-none md:flex-1 min-h-0 h-56 lg:max-h-72 items-center"
  >
    <v-img
      contain
      class="max-h-full drop-shadow-md self-center"
      :src="questionImage"
    >
      <slot></slot>
    </v-img>
  </div>
</template>

<script>
export default {
  props: {
    questionImage: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
