<template>
  <v-btn
    block
    height="44"
    elevation="0"
    color="primary_shade"
    class="transition-all"
    @click="addQuestion(questionType.value)"
    :disabled="mappingDisabledindex"
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
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      disabledIndex: [3, 4],
    }
  },
  methods: {
    addQuestion(value) {
      this.$emit('add-question', value)
    },
  },
  computed: {
    mappingDisabledindex() {
      return this.disabledIndex.includes(this.index)
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
  color: #fff !important;
}
:deep(.v-btn__content) {
  @apply !justify-start;
}
</style>
