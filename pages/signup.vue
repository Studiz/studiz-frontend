<template>
  <div class="max-w-lg mx-auto">
    <v-stepper v-model="stepPage" rounded="lg">
      <v-stepper-header class="background_card" v-if="!isGoogleAccount">
        <v-stepper-step class="text-sm" :complete="stepPage > 1" step="1"
          >Sign up</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step class="text-sm" :complete="stepPage > 2" step="2"
          >Choose your role</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step class="text-sm" step="3">Create account</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items
        class="px-2 py-8 -mt-2 background_card px-md-10 pb-md-10 pt-md-5"
      >
        <v-stepper-content step="1" class="px-0 py-0">
          <v-card color="background_card" flat class="space-y-8">
            <div class="text-center primary--text text-H1">Sign up</div>
            <div id="firebaseui-auth-container"></div>

            <div class="flex gap-5 items-center justify-center my-5">
              <v-divider />
              <span class="font-bold text-H3 bg_disable--text">or</span>
              <v-divider />
            </div>

            <div>
              <v-form ref="form" lazy-validation @submit.prevent="submitEmail">
                <v-text-field
                  required
                  label="E-mail"
                  outlined
                  v-model.trim="data.email"
                  @keypress.enter="submitEmail"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
                <v-btn
                  color="primary"
                  height="60"
                  block
                  :loading="loading"
                  type="submit"
                  class
                  >Next</v-btn
                >
                <div class="secondary--text">
                  {{ textError === '' ? '' : textError }}
                </div>
                <div class="flex items-center mt-7">
                  <span>Have an account?</span>
                  <v-btn
                    outlined
                    color="secondary"
                    class="ml-2 text-nor-btn text-cap"
                    to="login"
                    >login</v-btn
                  >
                </div>
              </v-form>
            </div>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2" class="px-0 py-0">
          <v-card color="background_card" flat>
            <p class="text-center primary--text text-H1">I am a...</p>
            <div class="px-1 space-y-3">
              <div
                @click="data.role = 'teacher'"
                :class="[data.role == 'teacher' ? 'outlineselect' : '']"
              >
                <v-btn block depressed height="100" color="primary_shade">
                  <v-img
                    left
                    max-height="80"
                    max-width="80"
                    :src="require('../static/role_icon/teacher.svg')"
                  ></v-img>
                  <span class="ml-1 text-H3 md:text-H2 text-cap ml-md-5"
                    >teacher</span
                  >
                </v-btn>
              </div>
              <div
                @click="data.role = 'student'"
                :class="[data.role == 'student' ? 'outlineselect' : '']"
              >
                <v-btn block depressed height="100" color="primary_shade">
                  <v-img
                    left
                    max-height="80"
                    max-width="80"
                    :src="require('../static/role_icon/student.svg')"
                  ></v-img>
                  <span class="ml-1 text-H3 md:text-H2 text-cap ml-md-5"
                    >student</span
                  >
                </v-btn>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-7">
              <v-btn
                text
                @click="cancel"
                outlined
                height="56"
                block
                class="text-cap"
                >cancel</v-btn
              >
              <v-btn
                color="primary"
                height="56"
                block
                :loading="loading"
                :disabled="data.role == null"
                @click="
                  isGoogleAccount ? signUpWithGoogleAccount() : selectRole()
                "
                >{{ isGoogleAccount ? 'Confirm' : 'Next' }}</v-btn
              >
            </div>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="3" class="px-0 py-0">
          <v-card color="background_card" flat>
            <v-btn text @click="stepPage = 2" class="mb-3">
              <v-icon left>mdi-arrow-left</v-icon>back
            </v-btn>
            <p class="text-center primary--text text-H1">Create your account</p>
            <div v-if="!isGoogleAccount">
              <v-form
                ref="form2"
                lazy-validation
                @submit.prevent="createAccount"
              >
                <v-text-field
                  v-model.trim="data.fname"
                  :counter="30"
                  :rules="rules.nameRules"
                  label="First name"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  v-model.trim="data.lname"
                  :counter="30"
                  :rules="rules.nameRules"
                  label="Last name"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  required
                  v-model="first_password"
                  outlined
                  :append-icon="show_password1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show_password1 ? 'text' : 'password'"
                  label="Password"
                  @click:append="show_password1 = !show_password1"
                ></v-text-field>
                <v-text-field
                  required
                  v-model="confirm_password"
                  outlined
                  :append-icon="show_password2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="rules.confirmPass"
                  :type="show_password2 ? 'text' : 'password'"
                  label="Confirm Password"
                  @click:append="show_password2 = !show_password2"
                ></v-text-field>
                <div class="grid grid-cols-2 gap-3">
                  <v-btn
                    text
                    @click="cancel"
                    outlined
                    height="56"
                    block
                    class="text-cap"
                    >cancel</v-btn
                  >
                  <v-btn
                    color="primary"
                    height="56"
                    block
                    :loading="loading"
                    type="submit"
                    :disabled="data.email == ''"
                    class="text-H1"
                    >Create account</v-btn
                  >
                </div>
              </v-form>
            </div>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import userService from '../services/UserService.js'
export default {
  data() {
    return {
      data: {
        email: '',
        fname: '',
        lname: '',
        role: null,
        password: '',
      },
      textError: '',
      first_password: '',
      confirm_password: '',
      show_password1: false,
      show_password2: false,
      loading: false,
      isGoogleAccount: false,
      stepPage: 1,
      rules: {
        required: (v) => !!v || 'Required.',
        min: (v) => (v && v.length >= 6) || 'Min 6 characters',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 30) || 'Name must be less than 30 characters',
        ],
        email: (v) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Invalid e-mail.'
        },
        confirmPass: [
          (v) => !!v || 'Required.',
          (v) => v === this.first_password || 'Passwords do not match',
        ],
      },
    }
  },
  methods: {
    async createAccount() {
      if (this.$refs.form2.validate()) {
        if (this.first_password == this.confirm_password) {
          this.data.password = this.confirm_password
          this.loading = true
          let data = {
            email: this.data.email,
            fname: this.data.fname,
            lname: this.data.lname,
            role: this.data.role,
            password: this.data.password,
          }
          const sign = require('jwt-encode')
          const secret = 'secret'
          const dataToken = sign(data, secret)
          if (data.role == 'teacher') {
            userService.signUpTeacherWithEmail(dataToken).then((res) => {
              localStorage.setItem('accessToken', res.data)
              this.signInGetProfile(res.data)
            })
          } else {
            userService.signUpStudentWithEmail(dataToken).then((res) => {
              localStorage.setItem('accessToken', res.data)
              this.signInGetProfile(res.data)
            })
          }
        }
      }
    },
    async submitEmail() {
      if (this.$refs.form.validate()) {
        this.loading = true
        await userService
          .checkDuplicateEmail(this.data.email)
          .then((res) => {
            if (res.status === 200) {
              this.loading = false
              this.stepPage = 2
              this.textError = ''
            }
          })
          .catch((err) => {
            let mail = this.data.email
            // alert(err.response.data) Account "${val}" already exist, please login
            this.textError = `Account "${mail}" already exists, please login`
            this.loading = false
          })
      }
    },
    signInGetProfile(data) {
      return userService.signInGetProfile(data).then((res) => {
        this.$store.commit('setUser', res.data)
        this.loading = false
        this.$router.push('/')
      })
    },
    async selectRole() {
      // this.loading = true
      // await new Promise((resolve) => setTimeout(resolve, 1000))
      // this.loading = false
      this.stepPage = 3
    },
    signUpWithGoogleAccount() {
      let userData = JSON.parse(localStorage.getItem('googleAccountSignUp'))
      let fullName = userData.displayName.split(' ')
      let data = {
        email: userData.email,
        fname: fullName[0],
        lname: fullName[1],
        role: this.data.role,
        imageUrl: userData.photoURL,
        uid: userData.uid,
      }
      const sign = require('jwt-encode')
      const secret = 'secret'
      const dataToken = sign(data, secret)
      if (data.role == 'teacher') {
        userService.signUpTeacherWithGoogle(dataToken).then((res) => {
          localStorage.setItem(
            'accessToken',
            JSON.parse(localStorage.getItem('googleAccountSignUp'))
              .stsTokenManager.accessToken
          )
          this.signInGetProfile(localStorage.getItem('accessToken')).then(
            () => {
              localStorage.clear('googleAccountSignUp')
            }
          )
        })
      } else {
        userService.signUpStudentWithGoogle(dataToken).then((res) => {
          localStorage.setItem(
            'accessToken',
            JSON.parse(localStorage.getItem('googleAccountSignUp'))
              .stsTokenManager.accessToken
          )
          this.signInGetProfile(localStorage.getItem('accessToken')).then(
            () => {
              localStorage.clear('googleAccountSignUp')
            }
          )
        })
      }
    },
    cancel() {
      if (localStorage.getItem('googleAccountSignUp')) {
      } else {
        this.$refs.form.reset()
        this.$refs.form2.reset()
      }
      this.data.role = null
      this.stepPage = 1
    },
  },
  mounted() {
    const firebaseui = require('firebaseui')
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fire.auth)
    const config = {
      signInOptions: [this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult(res) {
          let user = res.user
          userService
            .checkDuplicateEmail(res.user._delegate.email)
            .then((res) => {
              if (res.status === 200) {
                localStorage.setItem(
                  'googleAccountSignUp',
                  JSON.stringify(user)
                )
                window.location.reload()
              }
            })
            .catch((err) => {
              alert(err.response.data)
              'googleAccountSignUp', JSON.stringify(false)
            })
        },
      },
    }
    ui.start('#firebaseui-auth-container', config)
  },
  created() {
    if (localStorage.getItem('googleAccountSignUp')) {
      this.isGoogleAccount = true
      this.stepPage = 2
    }
  },
  destroyed() {
    localStorage.removeItem('googleAccountSignUp')
  },
}
</script>

<style scoped>
.outlineselect {
  @apply outline outline-offset-2 rounded-sm outline-light_primary dark:outline-dark_primary;
}
:deep(.firebaseui-idp-list) {
  @apply w-full px-0;
}
:deep(.firebaseui-idp-button) {
  @apply flex flex-wrap overflow-hidden items-center gap-x-5 gap-y-3 w-full rounded-md ring-1 ring-light_primary hover:ring-2 p-3 justify-center transition-all !bg-transparent;
}
:deep(.firebaseui-idp-text-long) {
  @apply font-medium whitespace-nowrap;
}
:deep(.firebaseui-idp-icon-wrapper) {
  @apply w-6 h-6;
}
:deep(.firebaseui-idp-icon) {
  @apply w-full w-full;
}
:deep(.firebaseui-idp-text-short) {
  @apply hidden;
}
</style>
