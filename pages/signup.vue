<template>
  <div class="max-w-lg mx-auto">
    <v-stepper v-model="e1" class="transparent">
      <v-stepper-header>
        <v-stepper-step class="px-0 text-sm" :complete="e1 > 1" step="1">Sign up</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step class="px-0 text-sm" :complete="e1 > 2" step="2">Choose your role</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step class="px-0 text-sm" step="3">Create an account</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items class="background rounded-lg px-5 py-8 px-md-10 py-md-10">
        <v-stepper-content step="1" class="px-0 py-0">
          <v-card color="background">
            <p class="text-secondary text-H1 font-bold text-center">Sign up</p>

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
              <v-form ref="form" lazy-validation @submit.prevent="submit">
                <v-text-field
                  required
                  label="E-mail"
                  outlined
                  v-model.trim="email"
                  @keypress.enter="submit"
                  :rules="[rules.required, rules.email, checkDuplicate]"
                ></v-text-field>
                <v-btn
                  color="primary"
                  height="60"
                  block
                  :loading="loading"
                  type="submit"
                  class="fontbold"
                >Next</v-btn>
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
        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
          <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
          <v-btn color="primary" @click="e1 = 1">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            show: false,
            rules: {
                email: (v) => {
                    const pattern =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(v) || 'Invalid e-mail.'
                },
            },
            loading: false,
            e1: 1,
        }
    },
    methods: {
        async submit() {
            if (this.$refs.form.validate()) {
                this.loading = true
                await new Promise((resolve) => setTimeout(resolve, 3000))
                this.loading = false

                this.e1 = 2
                // this.$router.push('/')
            }
        },
        checkDuplicate(val) {
            // write your api call and return the below statement if it already exist
            //ให้ back check น่าจะเร็วกว่ามั้ง
            if (val == 'jakkapong.q@mail.kmutt.ac.th') {
                return `Account "${val}" already exist, please login `
            } else {
                return true
            }
        },
    },
}
</script>

<style></style>
