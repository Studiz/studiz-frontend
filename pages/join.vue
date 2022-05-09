<template>
  <div class="max-w-lg mx-auto">
    <v-card flat class="drop-shadow-md rounded-xl p-10">
      <form
        @submit.prevent=""
        class="text_disable p-4 flex items-center rounded-lg"
      >
        <!-- <v-text-field
          label="Main input"
          :rules="rules"
          hide-details="auto"
          background-color="background"
        ></v-text-field> -->
        <input
          id="pincode"
          name="pincode"
          type="tel"
          class="bg-white p-2 w-full h-60px rounded-lg"
          minlength="10"
          maxlength="10"
          pattern="\d*"
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
      <nuxt-link to="/signup" class="text-2xl">Sign Up</nuxt-link>
      <nuxt-link to="/signin" class="text-2xl">Sign In</nuxt-link>
    </v-card>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
