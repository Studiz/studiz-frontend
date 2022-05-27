<template>
  <div>
    <div class="d-flex justify-space-between">
      <h1 class="text-H1">
        Profile
        <v-chip class="capitalize">{{userRole}}</v-chip>
      </h1>
    </div>

    <v-card flat class="background">
      <div class="d-flex justify-center my-5">
        <v-avatar size="94" color="primary">
          <v-icon size="94" color="white" v-if="!imageProfile">mdi-account-circle</v-icon>
          <v-img :src="imageProfile" v-else />
        </v-avatar>
      </div>
      <v-card-title primary-title class="d-block space-y-3">
        <div class="d-flex flex-wrap">
          <span>Display name: {{displayName}}</span>
          <v-spacer></v-spacer>
          <!-- <DialogCondition @confirm="editDsinplayname" colorBTN="primary" btn2="primary">
            <template #namebtn>edit</template>
            <template #icon>
              <v-icon left>mdi-pencil</v-icon>
            </template>
            <template #title>Change Your display name</template>
            <template #contain>
              <v-form ref="form" class="pa-md-3" lazy-validation @submit.prevent="createClassroom">
                <v-container>
                  <v-text-field
                    label="Dsiplay name"
                    outlined
                    required
                    :rules="rules.nameRules"
                    :counter="10"
                  ></v-text-field>
                </v-container>
              </v-form>
            </template>
          </DialogCondition>-->
        </div>
        <div>Name: {{name}}</div>
        <div>Email: {{email}}</div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import DialogCondition from '~/components/dialog-condition.vue'

export default {
  components: { DialogCondition },

  data() {
    return {
      rules: {
        required: (v) => !!v || 'Required.',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 10) ||
            'Classroom name must be less than 10 characters',
        ],
        descriptionRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 10) ||
            'DescriptionRules must be less than 10 characters',
        ],
      },
    }
  },
  methods: {
    editDsinplayname() {
      console.log('editDsinplayname')
    },
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