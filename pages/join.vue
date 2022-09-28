<template>
  <div class="max-w-lg mx-auto">
    <div class="justify-center my-8 d-flex">
      <v-icon size="150">$vuetify.icons.Studiz_logo</v-icon>
      <!-- <div class="h-[150px] w-[150px] inline-flex items-center">
        <v-img src="/studiz-logo.png" max-width="150" max-height="150" />
      </div>-->
    </div>
    <v-card
      flat
      color="background_card"
      class="p-3 overflow-hidden drop-shadow-md rounded-xl md:p-5 lg:p-10"
    >
      <Input-join @join-number="joinnumber" />
      <v-dialog v-model="isOpenForm" scrollable :persistent="true" max-width="500px">
        <v-card class="h-fit">
          <v-card-title>
            <span class="break-normal">Enter your display name</span>
          </v-card-title>
          <v-form ref="form" class="pa-md-3" lazy-validation @submit.prevent="enterDisplayName">
            <v-container>
              <v-text-field
                label="Dsiplay name"
                outlined
                required
                :rules="rules.nameRules"
                :counter="10"
                v-model="displayName"
              ></v-text-field>
            </v-container>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeForm">close</v-btn>
            <v-btn text @click="enterDisplayName" type="submit">confirm</v-btn>
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
            <v-btn height="56" block outlined color="secondary" class="text-cap">Sign Up</v-btn>
          </nuxt-link>
          <span class="h-10 mx-3"></span>
          <nuxt-link
            to="/login"
            class="w-full font-bold text-center text-H3 secondary--text whitespace-nowrap"
          >
            <v-btn height="56" block color="primary" class="text-cap">login</v-btn>
          </nuxt-link>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import StudentService from '~/services/StudentService.js'

export default {
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
      localStorage.setItem('displayName', this.displayName)
      StudentService.joinQuiz(this.pinCode).then((res) => {
        this.$router.push({
          name: 'lobby-quizId',
          params: { quizId: res.data.quizId, displayName: this.displayName },
        })
      })
    },
  },
  computed: {
    isGuest() {
      return this.$store.getters.user ? false : true
    },
  },
}
</script>

<style lang="scss" scoped></style>
