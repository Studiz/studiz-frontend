<template>
  <div>
    <div class="d-flex justify-space-between">
      <h1 class="text-H1">
        Profile
        <v-chip class="capitalize">{{ userRole }}</v-chip>
      </h1>
    </div>

    <v-card flat color="transparent">
      <div class="justify-center my-5 d-flex">
        <v-dialog v-model="isOpenImageUpload" scrollable max-width="400px">
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              size="94"
              color="white"
              outlined
              class="text-cap"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon size="94" color="primary" v-if="!imageProfile"
                >mdi-account-circle</v-icon
              >
              <v-img :src="imageProfile" v-else />
            </v-avatar>
          </template>
          <v-card>
            <v-card-title>
              <span class="break-normal !self-center">Change Your image</span>
            </v-card-title>
            <v-avatar size="300" class="self-center m-5 shadow-md">
              <v-img :src="imagePreview" v-if="imagePreview" />
              <v-img :src="imageProfile" v-else-if="imageProfile" />
              <v-icon color="white" v-else>mdi-account-circle</v-icon>
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
              <v-btn class="primary" text @click="uploadImage" type="submit"
                >confirm</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div>
        <div class="flex items-center h-16 px-4">
          <div class="flex flex-wrap items-center">
            <span class="w-40 font-semibold">Display name</span>
            <span class="font-normal">{{ displayName }}</span>
          </div>
          <!-- <v-spacer></v-spacer> -->
          <base-dialog-condition
            @confirm="editDisplayName"
            colorBTN="primary"
            btn2="primary"
            @open="openForm"
            :propDialog="propDialog"
          >
            <template #namebtn>Edit</template>
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
        </div>
        <v-divider />
        <div class="flex items-center h-16 px-4">
          <div class="flex flex-wrap items-center">
            <span class="w-40 font-semibold">Name</span>
            <span class="font-normal">{{ name }}</span>
          </div>
        </div>
        <v-divider />
        <div class="flex items-center h-16 px-4">
          <div class="flex flex-wrap items-center">
            <span class="w-40 font-semibold">Email</span>
            <span class="font-normal">{{ email }}</span>
          </div>
        </div>
      </div>
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
          this.$store.commit('setUser', userUpdated)
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
          this.$store.commit('setUser', userUpdated)
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
