<template>
  <div class="max-w-lg mx-auto">
    <v-stepper v-model="stepPage" rounded="lg" color="last_background">
      <v-stepper-header class="background">
        <v-stepper-step class="text-sm" :complete="stepPage > 1" step="1">Sign up</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step class="text-sm" :complete="stepPage > 2" step="2">Choose your role</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step class="text-sm" step="3">Create account</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items class="background px-2 py-8 px-md-10 pb-md-10 pt-md-5 -mt-2">
        <v-stepper-content step="1" class="px-0 py-0">
          <v-card color="background" flat>
            <p class="primary--text text-H1 text-center">Sign up</p>

            <script src="https://accounts.google.com/gsi/client" async defer></script>
            <div
              id="g_id_onload"
              data-client_id="YOUR_GOOGLE_CLIENT_ID"
              data-login_uri="https://your.domain/your_login_endpoint"
              data-auto_prompt="false"
            ></div>
            <div
              class="g_id_signin"
              data-type="standard"
              data-size="large"
              data-theme="outline"
              data-text="sign_in_with"
              data-shape="rectangular"
              data-logo_alignment="left"
            ></div>
            <div id="buttonDiv"></div>

            <div class="flex justify-center items-center my-5">
              <span class="border-b-4 w-full mx-4 dark:border-bg_disable"></span>
              <span class="text-H3 font-bold bg_disable--text">or</span>
              <span class="border-b-4 w-full mx-4 dark:border-bg_disable"></span>
            </div>

            <div>
              <v-form ref="form" lazy-validation @submit.prevent="submitEmail">
                <v-text-field
                  required
                  label="E-mail"
                  outlined
                  v-model.trim="data.email"
                  @keypress.enter="submitEmail"
                  :rules="[rules.required, rules.email, checkDuplicate]"
                ></v-text-field>
                <v-btn color="primary" height="60" block :loading="loading" type="submit" class>Next</v-btn>
                <div class="flex items-center mt-7">
                  <span>Have an account?</span>
                  <v-btn
                    outlined
                    color="secondary"
                    class="text-nor-btn ml-2 text-cap"
                    to="login"
                  >login</v-btn>
                </div>
              </v-form>
            </div>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2" class="px-0 py-0">
          <v-card color="background" flat>
            <p class="primary--text text-H1 text-center">I am a...</p>
            <div class="space-y-3 px-1">
              <div
                @click="data.role = 'teacher'"
                :class="[data.role== 'teacher'?'outlineselect':'']"
              >
                <v-btn block depressed height="100" color="primary">
                  <v-img
                    left
                    max-height="80"
                    max-width="80"
                    :src="require('../static/role_icon/teacher.svg')"
                  ></v-img>
                  <span class="text-H3 md:text-H2 text-cap ml-1 ml-md-5">teacher</span>
                </v-btn>
              </div>
              <div
                @click="data.role = 'student'"
                :class="[data.role== 'student'?'outlineselect':'']"
              >
                <v-btn block depressed height="100" color="primary">
                  <v-img
                    left
                    max-height="80"
                    max-width="80"
                    :src="require('../static/role_icon/student.svg')"
                  ></v-img>
                  <span class="text-H3 md:text-H2 text-cap ml-1 ml-md-5">student</span>
                </v-btn>
              </div>
            </div>
            <div class="mt-7 grid grid-cols-2 gap-3">
              <v-btn text @click="cancel" outlined height="56" block class="text-cap">cancel</v-btn>
              <v-btn
                color="primary"
                height="56"
                block
                :loading="loading"
                :disabled="data.role == null"
                @click="selectRole"
              >Next</v-btn>
            </div>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="3" class="px-0 py-0">
          <v-card color="background" flat>
            <v-btn text @click="stepPage = 2" class="mb-3">
              <v-icon left>mdi-arrow-left</v-icon>back
            </v-btn>
            <p class="primary--text text-H1 text-center">Create your account</p>
            <div>
              <v-form :ref="[passStep1?'form':'']" lazy-validation @submit.prevent="createAccount">
                <v-text-field
                  v-model.trim="data.fname"
                  :counter="10"
                  :rules="rules.nameRules"
                  label="First name"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  v-model.trim="data.lname"
                  :counter="10"
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
                  <v-btn text @click="cancel" outlined height="56" block class="text-cap">cancel</v-btn>
                  <v-btn
                    color="primary"
                    height="56"
                    block
                    :loading="loading"
                    type="submit"
                    :disabled="data.email==''"
                    class="text-H1"
                  >Create account</v-btn>
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
      passStep1: false,
      first_password: '',
      confirm_password: '',
      show_password1: false,
      show_password2: false,
      loading: false,
      stepPage: 1,
      rules: {
        required: (v) => !!v || 'Required.',
        min: (v) => v.length >= 5 || 'Min 5 characters',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 10) || 'Name must be less than 10 characters',
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
      if (this.$refs.form.validate()) {
        if (this.first_password == this.confirm_password) {
          this.data.password = this.confirm_password
          this.loading = true
          await new Promise((resolve) => setTimeout(resolve, 1000))
          this.loading = false
          console.log(this.data)
          this.$router.push('/')
        }
      }
    },
    async submitEmail() {
      if (this.$refs.form.validate()) {
        this.loading = true
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.loading = false
        this.passStep1 = true
        this.stepPage = 2
      }
    },

    async selectRole() {
      // this.loading = true
      // await new Promise((resolve) => setTimeout(resolve, 1000))
      // this.loading = false
      this.stepPage = 3
    },
    checkDuplicate(val) {
      /// write your api call and return the below statement if it already exist
      ///ให้ back check น่าจะเร็วกว่ามั้ง
      // if (val == 'jakkapong.q@mail.kmutt.ac.th') {
      //     return `Account "${val}" already exist, please login `
      // } else {
      return true
      // }
    },
    cancel() {
      this.stepPage = 1
      this.data.email = ''
      this.data.fname = ''
      this.data.lname = ''
      this.data.role = null
      this.data.first_password = ''
      this.data.confirm_password = ''
    },
  },
}
</script>

<style>
.outlineselect {
  @apply outline outline-offset-2 rounded-sm outline-ligh_tprimary dark:outline-dark_primary;
}
</style>
