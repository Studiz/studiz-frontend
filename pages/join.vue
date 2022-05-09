<template>
  <div class="max-w-lg mx-auto">
    <v-card flat class="drop-shadow-md rounded-xl p-10">
      <form
        @submit.prevent=""
        class="text_disable p-4 flex items-center rounded-lg"
      >
        <input
          id="pincode"
          name="pincode"
          type="tel"
          class="bg-white p-2 w-full h-60px rounded-lg focus:outline-none text-H3 md:text-H2 "
          minlength="10"
          maxlength="10"
          pattern="\d*"
          placeholder="Enter a join qiuz code"
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
        <nuxt-link to="/signup" class="text-H3 font-bold">Sign Up</nuxt-link>
        <span class="border-l-4 mx-4 h-10 text_disable"></span>
        <nuxt-link to="/signin" class="text-H3 font-bold">Sign In</nuxt-link>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
