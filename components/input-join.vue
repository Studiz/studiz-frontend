<template>
  <form
    @submit.prevent=""
    class="bg_disable p-2 md:p-4 flex flex-col md:flex-row items-center rounded-lg"
  >
    <input
      id="pincode"
      name="pincode"
      v-model="pincode"
      type="tel"
      class="p-2 w-full md:w-11/12 h-60px rounded-lg focus:outline-none text-H3 md:text-H2 bg-white dark:bg-dark_background"
      minlength="6"
      maxlength="6"
      placeholder="Enter a join qiuz"
      autocomplete="off"
      @keypress="filterNumber(evt)"
    />
    <v-btn
      hide-details
      inset
      height="60"
      color="primary"
      class="mt-2 mt-md-0 ml-md-4 w-full md:w-1/12 rounded-lg"
      :disabled="pincode.length !== 6"
      @click="join"
    >
      join</v-btn
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      pincode: '',
    }
  },
  methods: {
    filterNumber(evt) {
      evt = evt ? evt : window.event
      let expect = evt.target.value.toString() + evt.key.toString()
      if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
        evt.preventDefault()
      } else {
        return
      }
    },
    join() {
      this.$emit('join-number', this.pincode)
    },
  },
}
</script>
