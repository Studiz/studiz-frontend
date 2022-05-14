<template>
  <div class="max-w-lg mx-auto">
    <v-card
      flat
      color="background"
      class="drop-shadow-md rounded-xl p-3 md:p-5 lg:p-10 overflow-hidden md:mt-10"
    >
      <form
        @submit.prevent=""
        class="bg_disable p-2 md:p-4 flex flex-col md:flex-row items-center rounded-lg"
      >
        <input
          id="pincode"
          name="pincode"
          type="tel"
          class="p-2 w-full md:w-11/12 h-60px rounded-lg focus:outline-none text-H3 md:text-H2 bg-white dark:bg-dark_background"
          minlength="6"
          maxlength="6"
          placeholder="Enter a join qiuz"
          autocomplete="off"
          @keypress="filterNumber(event)"
        />
        <!-- <v-text-field
          required
          v-model="Pincode"
          solo
          oninput="if(Number(this.Pincode) > Number(this.max)) this.Pincode = this.max;"
          :rules="[rules.required, rules.min]"
          label="Pincode"
          type="tel"
          class="w-full md:w-1/12 rounded-lg"
        ></v-text-field> -->

        <v-btn
          hide-details
          inset
          height="60"
          color="primary"
          class="mt-2 mt-md-0 ml-md-4 w-full md:w-1/12 rounded-lg"
        >
          join</v-btn
        >
      </form>
      <div class="flex justify-center items-center pt-4">
        <nuxt-link
          to="/signup"
          class="text-H3 font-bold secondary--text whitespace-nowrap"
          >Sign Up</nuxt-link
        >
        <span class="border-l-4 mx-4 h-10 bg_disable"></span>
        <nuxt-link
          to="/login"
          class="text-H3 font-bold secondary--text whitespace-nowrap"
          >Sign In</nuxt-link
        >
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Pincode: '',
      max: 6,
      rules: {
        required: (v) => !!v || 'Required.',
        min: (v) => v.length >= 5 || 'Min 5 characters',
      },
    }
  },
  methods: {
    filterNumber(evt) {
      evt = evt ? evt : window.event
      let expect = evt.target.value.toString() + evt.key.toString()

      if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
        evt.preventDefault()
      } else {
        return true
      }
    },
  },
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
