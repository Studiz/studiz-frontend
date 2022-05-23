<template>
  <div>
    <v-sheet class="pa-2 pa-md-5 mb-16 overflow-hidden background space-y-4" elevation="1" rounded="lg">
      <v-card flat color="background">
        <v-row>
          <v-col cols="12" md="6" class="d-flex items-center">
            <v-avatar color="primary" size="36px">
              <v-icon large color="white">mdi-account-circle</v-icon>
            </v-avatar>
            <v-card-title class="text-H1">user name</v-card-title>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="2" class="align-self-center">
            <v-btn to="signup" height="48" block color="secondary" outlined>sign up</v-btn>
          </v-col>
          <v-col cols="6" md="2" class="align-self-center">
            <v-btn to="login" height="48" block color="primary">login</v-btn>
          </v-col>
        </v-row>
      </v-card>

      <v-card flat color="background">
        <!-- <LightDarkMode /> -->
        <v-row>
          <v-col cols="12" class="d-flex items-center">
            <v-icon size="36px" color="primary">mdi-cog</v-icon>
            <v-card-title>setting</v-card-title>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
// import LightDarkMode from '~/components/navbar/light-dark-mode.vue'
export default {
  // components: { LightDarkMode },
}
</script>

<style>
</style>