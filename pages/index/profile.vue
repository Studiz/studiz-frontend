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
              class="text-cap relative"
              v-bind="attrs"
              v-on="on"
            >
              <lottie-player
                v-if="!imageProfile"
                autoplay
                loop
                mode="normal"
                src="https://assets4.lottiefiles.com/packages/lf20_qSkIccSXCE.json"
                style="width: 94px"
              />
              <v-img :src="imageProfile" v-else />
              <div
                class="absolute bottom-0 left-0 bg-black/50 w-full text-sm h-6"
              >
                <v-icon dark>mdi-camera</v-icon>
              </div>
            </v-avatar>
          </template>
          <v-card>
            <v-card-title>
              <span class="break-normal !self-center">Change Your image</span>
            </v-card-title>
            <v-avatar size="300" class="self-center m-5 shadow-md">
              <v-img :src="imagePreview" v-if="imagePreview" />
              <v-img :src="imageProfile" v-else-if="imageProfile" />
              <lottie-player
                v-else
                autoplay
                loop
                mode="normal"
                src="https://assets4.lottiefiles.com/packages/lf20_qSkIccSXCE.json"
                style="width: 320px"
              />
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
              <v-btn
                text
                color="primary"
                class="!capitalize"
                @click="closeImageUpload"
                >close</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="uploadImage"
                :loading="isloading"
                >confirm</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <div>
        <div class="flex items-center h-16 px-4">
          <div class="flex flex-col md:flex-row">
            <span class="w-40 font-semibold">Display name</span>
            <span class="font-normal">{{ displayName }}</span>
          </div>

          <base-dialog-condition
            @confirm="editInformation"
            colorBTN="primary"
            @open="openForm"
            :propDialog="propDialog"
          >
            <template #namebtn>
              <span class="hidden md:block md:pl-2">Edit</span>
            </template>
            <template #icon>
              <v-icon>mdi-pencil</v-icon>
            </template>
            <template #title>Change Your information</template>
            <template #contain>
              <v-form
                ref="form"
                class="pa-md-3"
                lazy-validation
                @submit.prevent="editInformation"
              >
                <v-container>
                  <v-text-field
                    label="Dsiplay name"
                    outlined
                    required
                    :rules="rules.nameRules"
                    :counter="50"
                    v-model="newDisplayName"
                  ></v-text-field>
                </v-container>
              </v-form>
            </template>
          </base-dialog-condition>
        </div>

        <v-divider />

        <div class="flex items-center h-16 px-4">
          <div class="flex flex-col md:flex-row">
            <span class="w-40 font-semibold">Name</span>
            <span class="font-normal">{{ name }}</span>
          </div>
          <base-dialog-condition
            @confirm="editInformation"
            colorBTN="primary"
            @open="openForm"
            :propDialog="propDialog"
          >
            <template #namebtn>
              <span class="hidden md:block md:pl-2">Edit</span>
            </template>
            <template #icon>
              <v-icon>mdi-pencil</v-icon>
            </template>
            <template #title>Change Your information</template>
            <template #contain>
              <v-form
                ref="form"
                class="pa-md-3"
                lazy-validation
                @submit.prevent="editInformation"
              >
                <v-container>
                  <v-text-field
                    label="First name"
                    outlined
                    required
                    :rules="rules.nameRules"
                    :counter="50"
                    v-model="newFirstName"
                  ></v-text-field>
                  <v-text-field
                    label="Last name"
                    outlined
                    required
                    :rules="rules.nameRules"
                    :counter="50"
                    v-model="newLastName"
                  ></v-text-field>
                </v-container>
              </v-form>
            </template>
          </base-dialog-condition>
        </div>

        <v-divider />

        <div class="flex items-center h-16 px-4">
          <div class="flex flex-col md:flex-row">
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
import TeacherService from '../../services/TeacherService.js'

export default {
  components: { BaseDialogCondition },
  head() {
    return {
      title: 'Profile',
    }
  },
  data() {
    return {
      rules: {
        required: (v) => !!v || 'Required.',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 50) ||
            'Classroom name must be less than 50 characters',
        ],
      },
      newDisplayName: '',
      newFirstName: '',
      newLastName: '',
      propDialog: true,
      fileImage: null,
      imagePreview: null,
      isOpenImageUpload: false,
      isloading: false,
    }
  },
  methods: {
    editInformation() {
      if (this.$refs.form.validate()) {
        this.$store.commit('TOGGLE_LOADING', true)
        let userUpdated = {
          id: this.$store.getters.userId,
          data: Object.assign({}, this.$store.getters.user),
        }
        userUpdated.data.displayName = this.newDisplayName
        userUpdated.data.firstName = this.newFirstName
        userUpdated.data.lastName = this.newLastName

        let service =
          this.$store.getters.userRole === 'TEACHER'
            ? TeacherService
            : StudentService

        service
          .updateProfile(this.$store.getters.userId, userUpdated.data)
          .then((res) => {
            userUpdated.data = res.data
            this.$store.commit('setUser', userUpdated)
            this.$store.commit('TOGGLE_LOADING', false)
            this.$store.commit('TOGGLE_ALERT', {
              type: 'success',
              message: 'Update information succeed',
            })
            this.propDialog = false
          })
          .catch((err) => {
            this.$store.commit('TOGGLE_LOADING', false)
            this.$store.commit('TOGGLE_ALERT', {
              type: 'error',
              message: err.response.message,
            })
            this.propDialog = false
          })
      }
    },
    openForm() {
      this.newDisplayName = this.displayName
      this.newFirstName = this.$store.getters.user.firstName
      this.newLastName = this.$store.getters.user.lastName
      // this.propDialog = true
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
      this.isloading = true
      this.$store.commit('TOGGLE_LOADING', true)

      let service =
        this.$store.getters.userRole === 'TEACHER'
          ? TeacherService
          : StudentService

      service
        .updateImageProfile(this.$store.getters.userId, data)
        .then((res) => {
          userUpdated.data = res.data
          this.$store.commit('setUser', userUpdated)
          this.$store.commit('TOGGLE_LOADING', false)
          this.$store.commit('TOGGLE_ALERT', {
            type: 'success',
            message: 'Update image succeed',
          })
          this.isloading = false
          this.closeImageUpload()
        })
        .catch((err) => {
          this.$store.commit('TOGGLE_LOADING', false)
          this.$store.commit('TOGGLE_ALERT', {
            type: 'error',
            message: 'Update image failed',
          })
          this.isloading = false
          this.closeImageUpload()
        })
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
    isStudnet() {
      return this.$store.getters.userRole === 'student'
    },
  },
}
</script>
<style></style>
