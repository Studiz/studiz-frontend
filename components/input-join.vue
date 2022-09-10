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
    />
    <!-- <div class="w-full md:w-2/12"> -->
    <slot></slot>
    <v-btn
      hide-details
      inset
      height="60"
      color="primary"
      class="rounded-lg text-cap"
      :class="[
        this.$route.name == 'index-classrooms'
          ? 'w-full col-span-6 md:col-span-3'
          : 'w-full col-span-12',
      ]"
      :disabled="pincode.length !== 6"
      @click="join"
      >{{ this.$store.getters.user ? 'join' : 'join guest' }}</v-btn
    >

    <!-- </div> -->
  </form>
</template>

<script>
export default {
  props: {
    showInput: {
      type: Boolean,
    },
  },
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
      console.log(this.$nuxt.$route.name)
    },
  },
  components: {
    // isGuest() {
    //   return this.$store.getters.user ? false : true
    // },
  },
}
</script>
