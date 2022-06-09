<template>
  <div class="max-w-lg mx-auto">
    <div class="d-flex justify-center my-8">
      <v-icon size="150">$vuetify.icons.Studiz_logo</v-icon>
    </div>
    <v-card
      flat
      color="background"
      class="drop-shadow-md rounded-xl p-3 md:p-5 lg:p-10 overflow-hidden"
    >
      <Input-join @join-number="joinnumber" />
      <div class="text-center">
        <div class="flex justify-center items-center my-3">
          <v-divider></v-divider>
          <span class="text-H3 font-bold bg_disable--text px-3">or</span>
          <v-divider></v-divider>
        </div>

        <div class="flex items-center">
          <nuxt-link
            to="/signup"
            class="text-H3 font-bold secondary--text whitespace-nowrap text-center w-full"
          >
            <v-btn height="56" block outlined color="secondary" class="text-cap">Sign Up</v-btn>
          </nuxt-link>
          <span class="mx-3 h-10"></span>
          <nuxt-link
            to="/login"
            class="text-H3 font-bold secondary--text whitespace-nowrap text-center w-full"
          >
            <v-btn height="56" block color="primary" class="text-cap">login</v-btn>
          </nuxt-link>
        </div>
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
