<template>
  <div>
    <div class="d-flex justify-space-between">
      <h1 class="text-H1">Profile</h1>
      <v-btn color="secondary" outlined class="align-self-center" disabled>
        <v-icon left>mdi-pencil</v-icon>edit
      </v-btn>
    </div>

    <v-card flat class="background">
      <div class="d-flex justify-center my-5">
        <v-avatar size="94" color="primary">
          <v-icon size="94" color="white" v-if="!imageProfile">mdi-account-circle</v-icon>
          <v-img :src="imageProfile" v-else />
        </v-avatar>
      </div>
      <v-card-title primary-title class="text-cap d-block">
        <p>Display name: {{displayName}}</p>
        <p>name: {{name}}</p>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    displayName() {
      return this.$store.getters.user
        ? this.$store.getters.user.displayName
          ? this.$store.getters.user.displayName
          : this.$store.getters.user.firstName
        : ''
    },
    name() {
      return this.$store.getters.user
        ? this.$store.getters.user.firstName +
            ' ' +
            this.$store.getters.user.lastName
        : ''
    },
    imageProfile() {
      return this.$store.getters.user ? this.$store.getters.user.imageUrl : ''
    },
  },
}
</script>

<style>
</style>