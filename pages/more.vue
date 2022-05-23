<template>
  <div>
    <v-sheet class="pa-2 pa-md-5 mb-16 overflow-hidden background" elevation="1" rounded="lg">
      <v-card flat color="background">
        <v-row>
          <v-col cols="12" md="6" class="d-flex items-center">
            <v-avatar color="primary" size="56px">
              <v-icon large color="white">mdi-account-circle</v-icon>
            </v-avatar>
            <v-card-title class="text-H1">user name</v-card-title>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="2" class="align-self-center">
            <v-btn to="signup" height="56" block color="secondary" outlined>sign up</v-btn>
          </v-col>
          <v-col cols="6" md="2" class="align-self-center">
            <v-btn to="login" height="56" block color="primary">login</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>