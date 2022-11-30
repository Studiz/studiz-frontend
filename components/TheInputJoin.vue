<template>
  <form
    @submit.prevent
    class="grid grid-flow-col grid-rows-2 gap-2 rounded-lg primary_shade md:grid-rows-1"
    :class="[this.$route.name == 'index-classrooms' ? 'p-2' : 'p-2 md:p-4']"
  >
    <input
      id="pincode"
      name="pincode"
      v-model="pincode"
      type="tel"
      class="w-full p-2 rounded-lg h-60px focus:outline-none text-H3 md:text-H2 background_card"
      :class="[
        this.$route.name == 'index-classrooms'
          ? 'col-span-12 md:col-span-9'
          : 'col-span-12 ',
      ]"
      minlength="6"
      maxlength="6"
      :placeholder="[
        this.$route.name == 'index-classrooms'
          ? 'Enter code to join classroom'
          : 'Enter code to join quiz',
      ]"
      autocomplete="off"
      @keypress="filterNumber()"
      @keypress.enter="join()"
    />

    <slot></slot>
    <v-btn
      hide-details
      inset
      height="60"
      color="primary"
      class="rounded-lg text-cap w-full col-span-12 md:col-span-6 px-0"
      :disabled="vaildPINCode"
      @click="join"
      >{{ this.$store.getters.user ? 'join' : 'join guest' }}</v-btn
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
      if (!this.vaildPINCode) {
        this.$emit('join-number', this.pincode)
      }
    },
  },
  computed: {
    vaildPINCode() {
      const checkPIN = /^[0-9]{6}$/
      if (checkPIN.test(this.pincode)) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>
