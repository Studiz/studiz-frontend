<template>
  <div class="max-w-lg mx-auto">
    <div class="justify-center my-8 d-flex">
      <!-- <v-icon size="150">$vuetify.icons.Studiz_logo</v-icon> -->
      <div class="h-[150px] w-[150px] inline-flex items-center">
        <v-img src="/studiz-logo.png" max-width="150" max-height="150" />
      </div>
    </div>
    <v-card
      flat
      color="background_card"
      class="p-3 overflow-hidden drop-shadow-md rounded-xl md:p-5 lg:p-10"
    >
      <Input-join @join-number="joinnumber" />
      <div class="text-center">
        <div class="flex items-center justify-center my-3">
          <v-divider></v-divider>
          <span class="px-3 font-bold text-H3 bg_disable--text">or</span>
          <v-divider></v-divider>
        </div>

        <div class="flex items-center">
          <nuxt-link
            to="/signup"
            class="w-full font-bold text-center text-H3 secondary--text whitespace-nowrap"
          >
            <v-btn height="56" block outlined color="secondary" class="text-cap"
              >Sign Up</v-btn
            >
          </nuxt-link>
          <span class="h-10 mx-3"></span>
          <nuxt-link
            to="/login"
            class="w-full font-bold text-center text-H3 secondary--text whitespace-nowrap"
          >
            <v-btn height="56" block color="primary" class="text-cap"
              >login</v-btn
            >
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

<style lang="scss" scoped></style>
