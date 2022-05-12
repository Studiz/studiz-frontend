<template>
  <div class="max-w-lg mx-auto">
    <v-card flat color="background" class="drop-shadow-md rounded-xl p-3 md:p-5 lg:p-10 overflow-hidden md:mt-10">
      <form
        @submit.prevent=""
        class="bg_disable p-2 md:p-4 flex items-center rounded-lg"
      >
        <input
          id="pincode"
          name="pincode"
          type="tel"
          class="p-2 w-full h-60px rounded-lg focus:outline-none text-H3 md:text-H2 bg-white dark:bg-gray-500"
          minlength="6"
          maxlength="6"
          placeholder="Enter a join qiuz"
        />
        <v-btn
          hide-details
          inset
          height="60"
          color="primary"
          class="ml-4 rounded-lg"
        >
          join</v-btn
        >
      </form>
      <div class="flex justify-center items-center pt-4">
        <nuxt-link to="/signup" class="text-H3 font-bold secondary--text whitespace-nowrap"
          >Sign Up</nuxt-link
        >
        <span class="border-l-4 mx-4 h-10 bg_disable"></span>
        <nuxt-link to="/login" class="text-H3 font-bold secondary--text whitespace-nowrap"
          >Sign In</nuxt-link
        >
      </div>
    </v-card>
  </div>
</template>

<script>
export default {}
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
