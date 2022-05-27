<template>
  <div>
    <div class="d-flex justify-space-between">
      <h1 class="text-H1">
        Profile
        <v-chip class="capitalize">{{userRole}}</v-chip>
      </h1>
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
      <v-card-title primary-title class="d-block">
        <p>Display name: {{displayName}}</p>
        <p>Name: {{name}}</p>
        <p>Email: {{email}}</p>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      your: {
        Uid: 'JAk2lLX5qLUBnzdUpyUA7SubrGE3',
        ImageUrl:
          'Https://Lh3.Googleusercontent.Com/A-/AOh14Gih0FnwhK1tydzZ4IyeRuE5amWuSJ1_nnA-3mjuNS4=S96-C',
        FirstName: 'HerCuLes',
        LastName: 'C',
        DisplayName: '',
        Email: 'Qjakkapong@Gmail.Com',
        Classrooms: [
          {
            Id: 'AwHUMYLxUwwjk7bRLv5X',
            Name: 'Uooo',
            Description: 'Asddd',
            Teacher: {
              Email: 'Teacher@Mail.Kmutt.Ac.Th',
              FirstName: 'John',
              DisplayName: 'Teacherzz',
              ImageUrl: 'Https://Api.Lorem.Space/Image/Face?Hash=47449',
              LastName: 'Cena',
            },
            Color: '',
          },
        ],
        Role: 'STUDENT',
      },
    }
  },
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
    userRole() {
      return this.$store.getters.userRole
    },
    email() {
      return this.$store.getters.userEmail
    },
  },
}
</script>

<style>
</style>