<template>
  <div class="max-w-lg mx-auto">
    <v-card
      flat
      color="background"
      class="drop-shadow-md rounded-xl p-3 md:p-5 lg:p-10 overflow-hidden md:mt-10"
    >
      <Input-join @join-number="joinnumber" />
      <div class="flex justify-center items-center pt-4">
        <nuxt-link to="/signup" class="text-H3 font-bold secondary--text whitespace-nowrap">Sign Up</nuxt-link>
        <span class="border-l-4 mx-4 h-10 bg_disable"></span>
        <nuxt-link to="/login" class="text-H3 font-bold secondary--text whitespace-nowrap">Sign In</nuxt-link>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        joinnumber(num) {
            console.log(num)
        },
    },
}
</script>
