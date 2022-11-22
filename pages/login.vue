<template>
  <div class="max-w-lg mx-auto">
    <v-card
      class="w-screen px-3 py-5 px-md-10 py-md-10 space-y-8"
      color="background_card"
    >
      <div class="text-center primary--text text-H1">Login</div>

      <div id="firebaseui-auth-container"></div>

      <div class="flex gap-5 items-center justify-center my-5">
        <v-divider />
        <span class="font-bold text-H3 bg_disable--text">or</span>
        <v-divider />
      </div>

      <div>
        <v-form ref="form" lazy-validation @submit.prevent="submit">
          <v-text-field
            required
            type="email"
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
            >Login</v-btn
          >
          <div class="flex items-center mt-7">
            <span>Don’t have an account?</span>
            <v-btn outlined color="secondary" class="ml-2 text-cap" to="signup"
              >Sign up</v-btn
            >
          </div>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
import userService from '../services/UserService.js'
export default {
  head() {
    return {
      title: 'Login',
    }
  },
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
              this.$store.commit('setUser', res.data)
              localStorage.setItem('userId', res.data.id)
              localStorage.setItem('accessToken', accessToken)
              localStorage.setItem('uid', res.data.data.uid)
              this.loading = false
              this.$router.push('/classrooms')
            })
          })
          .catch((err) => {
            console.log(err);
            this.$store.commit('TOGGLE_ALERT', {
              type: 'error',
              message: "Invalid email or password",
            })
            this.loading = false
          })
      }
    },

    // async loginWithEmail() {
    //   return await this.$fire.auth.signInWithEmailAndPassword(
    //     this.email,
    //     this.password
    //   )
    // },
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  mounted() {
    const firebaseui = require('firebaseui')

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fire.auth)

    let config = {
      signInFlow: 'popup',
      signInOptions: [this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID],
      signInSuccessUrl: '/classrooms',
      callbacks: {
        signInSuccessWithAuthResult(res) {
          let user = res.user
          let accessToken = res.user._delegate.accessToken
          userService
            .signInGetProfile(accessToken)
            .then((res) => {
              // localStorage.setItem('user', JSON.stringify(res.data))
              localStorage.setItem('accessToken', accessToken)
              localStorage.setItem('userId', res.data.id)
              localStorage.setItem('uid', res.data.data.uid)
              window.location.href = '/classrooms'
            })
            .catch(() => {
              localStorage.setItem('googleAccountSignUp', JSON.stringify(user))
              window.location.href = '/signup'
            })
        },
      },
    }

    ui.start('#firebaseui-auth-container', config)
  },
}
</script>

<style scoped>
:deep(.firebaseui-idp-list) {
  @apply w-full px-0;
}
:deep(.firebaseui-idp-button) {
  @apply flex flex-wrap overflow-hidden items-center gap-x-5 gap-y-3 w-full rounded-md ring-1 ring-light_primary hover:ring-2 p-4 justify-center transition-all !bg-transparent;
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
