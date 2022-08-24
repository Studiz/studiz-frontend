<template>
  <div>
    <div class="d-flex justify-space-between">
      <h1 class="text-H1">
        Profile
        <v-chip class="capitalize">{{ userRole }}</v-chip>
      </h1>
    </div>

    <v-card flat class="background">
      <div class="justify-center d-flex">
        <v-dialog v-model="isOpenImageUpload" scrollable max-width="400px">
          <template v-slot:activator="{ on, attrs }">
            <v-avatar size="94" color="white" outlined class="text-cap" v-bind="attrs" v-on="on">
              <v-icon size="94" color="primary" v-if="!imageProfile">mdi-account-circle</v-icon>
              <v-img :src="imageProfile" v-else />
            </v-avatar>
          </template>
          <v-card>
            <v-card-title>
              <span class="break-normal !self-center">Change Your image</span>
            </v-card-title>
            <v-avatar size="300" class="self-center m-5 shadow-md">
              <v-icon color="white" v-if="!imageProfile">mdi-account-circle</v-icon>
              <v-img :src="imagePreview" v-else-if="imagePreview" />
              <v-img :src="imageProfile" v-else />
            </v-avatar>
            <v-file-input
              class="mx-5"
              accept="image/*"
              label="File input"
              filled
              prepend-icon="mdi-camera"
              @change="previewImage"
            ></v-file-input>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="closeImageUpload">close</v-btn>
              <v-btn class="primary" text @click="uploadImage" type="submit">confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
            <DialogCondition
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
            </DialogCondition>
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
import DialogCondition from '~/components/dialog-condition.vue'
import StudentService from '../../services/StudentService.js'

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
      newDisplayName: '',
      propDialog: true,
      fileImage: null,
      imagePreview: null,
      isOpenImageUpload: false,
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
    previewImage(payload) {
      this.fileImage = payload
      if (this.fileImage) {
        this.imagePreview = URL.createObjectURL(this.fileImage)
        URL.revokeObjectURL(this.fileImage)
      }
    },
    closeImageUpload() {
      this.isOpenImageUpload = false
      this.imagePreview = null
    },
    uploadImage() {
      let userUpdated = {
        id: this.$store.getters.userId,
        data: Object.assign({}, this.$store.getters.user),
      }
      let data = new FormData()
      data.append('studizImg', this.fileImage)
      StudentService.updateImageProfile(this.$store.getters.userId, data).then(
        (res) => {
          userUpdated.data = res.data
          this.$store.commit('SET_USER', userUpdated)
          this.closeImageUpload()
        }
      )
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
