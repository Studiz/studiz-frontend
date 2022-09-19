<template>
  <v-btn
    block
    height="44"
    class="transition-all"
    @click="addQuestion(questionType.value)"
  >
    <span class="font-semibold !text-base normal-case tracking-tight text-left">
      {{ questionType.text }}
    </span>
  </v-btn>
</template>

<script>
export default {
  props: {
    questionType: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addQuestion(value) {
      this.$emit('add-question', value)
    },
  },
}
</script>

<style scoped>
.theme--light.v-btn.v-btn--has-bg:hover {
  background-color: var(--v-primary-base) !important;
  color: #fff !important;
}
.theme--dark.v-btn--has-bg:hover {
  background-color: var(--v-primary-base) !important;
  color: #000 !important;
}
:deep(.v-btn__content) {
  @apply !justify-start;
}
</style>
