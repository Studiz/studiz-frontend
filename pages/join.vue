<template>
  <div class="max-w-lg mx-auto">
    <div class="justify-center my-8 d-flex">
      <div
        class="absolute left-1/2 right-auto bottom-3 top-auto transform sm:transform-none -translate-x-1/2 sm:bottom-auto sm:top-24 sm:left-auto sm:right-6 md:right-16 transition-all w-[40vh] sm:w-[30vh]"
      >
        <lottie-player
          class="custon-lottie-star"
          autoplay
          loop
          src="https://assets8.lottiefiles.com/packages/lf20_GFBjYS.json"
        />
      </div>

      <div
        class="absolute bottom-24 left-1/2 sm:left-16 sm:bottom-20 transition-all w-[20vh] sm:w-[36vh] rotate-45"
      >
        <lottie-player
          autoplay
          class="custon-lottie-rocket"
          loop
          src="https://assets4.lottiefiles.com/packages/lf20_xiussssy.json"
        />
      </div>

      <v-icon size="150">$vuetify.icons.Studiz_logo</v-icon>
    </div>
    <v-card
      flat
      color="background_card"
      class="p-3 overflow-hidden drop-shadow-md rounded-xl md:p-5 lg:p-10"
    >
      <the-input-join @join-number="joinnumber" />

      <v-dialog
        v-model="isOpenForm"
        scrollable
        :persistent="true"
        max-width="500px"
      >
        <v-card class="h-fit">
          <v-card-title>
            <span class="break-normal">Enter your display name</span>
          </v-card-title>
          <v-form
            ref="form"
            class="pa-md-3"
            lazy-validation
            @submit.prevent="enterDisplayName"
          >
            <v-container>
              <v-text-field
                label="Dsiplay name"
                outlined
                required
                :rules="rules.nameRules"
                :counter="30"
                v-model="displayName"
              ></v-text-field>
            </v-container>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" class="!capitalize" @click="closeForm"
              >close
            </v-btn>
            <v-btn text color="primary" @click="enterDisplayName" type="submit"
              >confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="text-center" v-if="isGuest">
        <div class="flex items-center justify-center my-3">
          <v-divider></v-divider>
          <span class="px-3 font-bold text-H3 bg_disable--text">or</span>
          <v-divider></v-divider>
        </div>

        <div class="flex items-center">
          <nuxt-link
            to="/signup"
            class="w-full font-bold text-center text-H3 secondary--text whitespace-nowrap"
          >
            <v-btn height="56" block outlined color="secondary" class="text-cap"
              >Sign Up</v-btn
            >
          </nuxt-link>
          <span class="h-10 mx-3"></span>
          <nuxt-link
            to="/login"
            class="w-full font-bold text-center text-H3 secondary--text whitespace-nowrap"
          >
            <v-btn height="56" block color="primary" class="text-cap"
              >login</v-btn
            >
          </nuxt-link>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import TheInputJoin from '~/components/TheInputJoin.vue'
import StudentService from '~/services/StudentService.js'

export default {
  components: { TheInputJoin },
  head() {
    return {
      title: 'Join quiz',
      meta: [
        {
          'http-equiv': 'Content-Security-Policy',
          content: 'upgrade-insecure-requests',
        },
      ],
    }
  },
  data() {
    return {
      rules: {
        required: (v) => !!v || 'Required.',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 30) ||
            'Classroom name must be less than 30 characters',
        ],
      },
      isOpenForm: false,
      displayName: '',
      pinCode: '',
    }
  },
  methods: {
    joinnumber(num) {
      this.isOpenForm = true
      this.pinCode = num
    },
    closeForm() {
      this.isOpenForm = false
      this.displayName = ''
    },
    enterDisplayName() {
      if (this.$refs.form.validate()) {
        localStorage.setItem('displayName', this.displayName)
        StudentService.joinQuiz(this.pinCode)
          .then((res) => {
            this.$router.push({
              name: 'lobby-quizId',
              params: {
                quizId: res.data.quizId,
                displayName: this.displayName,
              },
            })
          })
          .catch((err) => {
            this.$store.commit('TOGGLE_ALERT', {
              type: 'error',
              message: err.response.data,
            })
            this.$router.push('/')
          })
      }
    },
  },
  computed: {
    isGuest() {
      return this.$store.getters.user ? false : true
    },
  },
  mounted() {
    localStorage.removeItem('memberId')
    localStorage.removeItem('displayName')
  },
}
</script>

<style scoped>
.custon-lottie-star
  > div#animation-container
  > div#animation
  > svg
  > g
  > g:nth-child(4)
  > rect {
  @apply !fill-red-600;
}

:deep(#__lottie_element_98) {
  @apply !fill-red-600;
}
</style>
