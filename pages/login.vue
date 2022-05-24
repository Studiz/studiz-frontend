<template>
  <div class="max-w-lg mx-auto">
    <v-card class="px-3 py-5 px-md-10 py-md-10 w-screen" color="background">
      <p class="primary--text text-H1 text-center">Login</p>

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

        <div class="flex justify-center items-center my-5">
          <span class="border-b-4 w-full mx-4 dark:border-bg_disable"></span>
          <span class="text-H3 font-bold bg_disable--text">or</span>
          <span class="border-b-4 w-full mx-4 dark:border-bg_disable"></span>
        </div>
        <div id="firebaseui-auth-container"></div>
      </div>
    </v-card>
  </div>
</template>

<script>
import userService from '../services/UserService.js'
export default {
  data() {
    return {
      email: '',
      password: '',
      show: false,
      rules: {
        required: (v) => !!v || 'Required.',
        min: (v) => v.length >= 6 || 'Min 6 characters',
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
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$fire.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then((res) => {
            let accessToken = res.user._delegate.accessToken
            userService.signInGetProfile(accessToken).then((res) => {
              this.$store.commit('SET_USER', res.data)
              localStorage.setItem('user', JSON.stringify(res.data))
              localStorage.setItem('accessToken', accessToken)
              this.loading = false
              this.$router.push('/classrooms')
            })
          })
          .catch((err) => {
            alert(err)
            this.loading = false
          })
      }
    },

    async loginWithEmail() {
      return await this.$fire.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      )
    },
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  mounted() {
    const firebaseui = require('firebaseui')
    require('firebaseui/dist/firebaseui.css')

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fire.auth)

    let config = {
      signInOptions: [this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID],
      signInSuccessUrl: '/classrooms',
      callbacks: {
        signInSuccessWithAuthResult(res) {
          let accessToken = res.user._delegate.accessToken
          userService.signInGetProfile(accessToken).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data))
            localStorage.setItem('accessToken', accessToken)
            window.location.href = '/classrooms'
          })
        },
      },
    }

    ui.start('#firebaseui-auth-container', config)
  },
}
</script>

<style></style>
