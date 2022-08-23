<template>
  <div>
    <div class="d-flex justify-space-between">
      <h1 class="text-H1">
        Profile
        <v-chip class="capitalize">{{ userRole }}</v-chip>
      </h1>
    </div>

    <v-card flat class="background">
      <div class="justify-center my-5 d-flex">
        <v-avatar size="94" color="primary">
          <v-icon size="94" color="white" v-if="!imageProfile"
            >mdi-account-circle</v-icon
          >
          <v-img :src="imageProfile" v-else />
        </v-avatar>
      </div>
      <v-card-title primary-title class="space-y-3 d-block">
        <v-list two-line item>
          <v-list-item class="flex-wrap border-b-2 d-flex">
            <v-list-item-avatar class="!w-40 font-semibold text-left">
              <v-list-item-title>Display name</v-list-item-title>
            </v-list-item-avatar>
            <v-list-item-content class="font-normal">
              <v-list-item-title>{{ displayName }}</v-list-item-title>
            </v-list-item-content>
            <base-dialog-condition
              @confirm="editDisplayName"
              colorBTN="primary"
              btn2="primary"
              @open="openForm"
              :propDialog="propDialog"
            >
              <template #namebtn>edit</template>
              <template #icon>
                <v-icon left>mdi-pencil</v-icon>
              </template>
              <template #title>Change Your display name</template>
              <template #contain>
                <v-form
                  ref="form"
                  class="pa-md-3"
                  lazy-validation
                  @submit.prevent="editDisplayName"
                >
                  <v-container>
                    <v-text-field
                      label="Dsiplay name"
                      outlined
                      required
                      :rules="rules.nameRules"
                      :counter="10"
                      v-model="newDisplayName"
                    ></v-text-field>
                  </v-container>
                </v-form>
              </template>
            </base-dialog-condition>
          </v-list-item>
          <v-list-item class="border-b-2">
            <v-list-item-avatar class="!w-40 font-semibold text-left">
              <v-list-item-title>Name</v-list-item-title>
            </v-list-item-avatar>
            <v-list-item-content class="font-normal">
              <v-list-item-title>{{ name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar class="!w-40 font-semibold text-left">
              <v-list-item-title>Email</v-list-item-title>
            </v-list-item-avatar>
            <v-list-item-content class="font-normal">
              <v-list-item-title>{{ email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import BaseDialogCondition from '~/components/BaseDialogCondition.vue'
import StudentService from '../../services/StudentService.js'

export default {
  components: { BaseDialogCondition },
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
      newDisplayName: '',
      propDialog: true,
    }
  },
  methods: {
    editDisplayName() {
      if (this.$refs.form.validate()) {
        let userUpdated = {
          id: this.$store.getters.userId,
          data: Object.assign({}, this.$store.getters.user),
        }
        userUpdated.data.displayName = this.newDisplayName
        StudentService.updateProfile(
          this.$store.getters.userId,
          userUpdated.data
        ).then((res) => {
          console.log(res)
          userUpdated.data = res.data
          this.$store.commit('SET_USER', userUpdated)
          this.propDialog = false
        })
      }
    },
    openForm() {
      this.newDisplayName = this.displayName
      this.propDialog = true
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

<style></style>
