<template>
  <div class="max-w-lg mx-auto">
    <v-card class="px-3 py-5 px-md-10 py-md-10 w-screen" color="background">
      <p class="primary--text text-H1 text-center">Login</p>
      <div id='firebaseui-auth-container'></div>

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
            :rules="[rules.required, rules.email]"
          ></v-text-field>
          <v-text-field
            required
            v-model="password"
            outlined
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            label="Password"
            @click:append="show = !show"
          ></v-text-field>
          <v-btn
            color="primary"
            height="56"
            block
            :loading="loading"
            type="submit"
            class="text-cap"
            >Login</v-btn>
          <div class="flex items-center mt-7">
            <span>Don’t have an account?</span>
            <v-btn outlined color="secondary" class="ml-2 text-cap" to="signup">Sign up</v-btn>
          </div>
        </v-form>
      </div>
    </v-card>
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
        required: (v) => !!v || 'Required.',
        min: (v) => v.length >= 5 || 'Min 5 characters',
        email: (v) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Invalid e-mail.'
        },
      },
      loading: false,
    }
  },
  methods: {
    async submit() {
      // this.loginWithGoogle()
      if (this.$refs.form.validate()) {
        this.loading = true
        await new Promise((resolve) => setTimeout(resolve, 3000))
        this.loading = false
        // this.$route.push('/')
      }
    },
    login() {
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          this.loading = false
          console.log(res);
          // this.$route.push('/')
        })
    },
    loginWithGoogle() {
      this.$fire.auth
        .signInWithPopup(this.$fire.googleProvider)
        .then((userCred) => {
          console.log(userCred)
          this.loading = false
          this.$route.push('/')
        })
    },
  },
  mounted() {
    const firebaseui = require('firebaseui')
    require('firebaseui/dist/firebaseui.css')

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fire.auth)

    const config = {
      signInOptions: [
        this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: '/',
      callbacks: {
        signInSuccessWithAuthResult() {
          console.log('Successfully signed in')
          window.location = '/'
        },
      },
    }

    ui.start('#firebaseui-auth-container', config)
  },
}
</script>

<style></style>
