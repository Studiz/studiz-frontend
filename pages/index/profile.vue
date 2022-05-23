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
          <v-icon size="94" color="white">mdi-account-circle</v-icon>
          <!-- <v-img src="https://api.lorem.space/image/face?hash=92310" /> -->
        </v-avatar>
      </div>
      <v-card-title primary-title class="text-cap d-block">
        <p>Dsiplay name:</p>
        <p>name:</p>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>