<template>
  <div class="grid grid-cols-2 gap-3">
    <input-choice
      classColor="red"
      :index="0"
      @save-input-text="saveInputText"
    />
    <input-choice
      classColor="yellow"
      :index="1"
      @save-input-text="saveInputText"
    />
    <input-choice
      classColor="green"
      :index="2"
      @save-input-text="saveInputText"
    />
    <input-choice
      classColor="blue"
      :index="3"
      @save-input-text="saveInputText"
    />
  </div>
</template>

<script>
import InputChoice from './InputChoice.vue'
export default {
  components: { InputChoice },
  data() {
    return {}
  },
  methods: {
    saveInputText(data) {
      console.log('saveInputText')
    },
  },
}
</script>

<style></style>
