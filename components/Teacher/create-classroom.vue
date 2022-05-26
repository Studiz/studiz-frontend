<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        class="text-cap w-full md:w-auto rounded-lg text-"
        height="50"
        v-bind="attrs"
        v-on="on"
      >create classroom</v-btn>
    </template>
    <v-card>
      <v-card-title class="px-3 px-md-5">
        <span class="break-normal text-H1">Create classroom</span>
      </v-card-title>
      <v-form ref="form" class="pa-md-3" lazy-validation @submit.prevent="createClassroom">
        <v-container>
          <v-text-field
            label="Classroom name"
            outlined
            required
            v-model="data.name"
            :rules="rules.nameRules"
            :counter="10"
          ></v-text-field>
          <v-text-field
            label="Description"
            outlined
            v-model="data.description"
            :rules="rules.descriptionRules"
            :counter="10"
          ></v-text-field>
          <v-autocomplete
            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
            label="Choose relevant subject"
            :rules="[rules.required]"
            v-model="data.relevantSubjects"
            multiple
            outlined
            chips
          ></v-autocomplete>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text class="text-cap" @click="close">Close</v-btn>
          <v-btn type="submit" color="primary" :loading="loading">create</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import UserService from '~/services/UserService'
import TeacherService from '../../services/TeacherService'
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      data: {
        name: '',
        description: '',
        relevantSubjects: '',
        color: '',
      },
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
        // relevantSubjectsRule: [(v) => v || 'This field is required'],
      },
    }
  },
  methods: {
    async createClassroom() {
      if (this.$refs.form.validate()) {
        let data = Object.assign({}, this.data)
        data.teacherId = this.$store.getters.userId
        this.loading = true
        TeacherService.createClassroom(data).then((res) => {
          TeacherService.generatePinCode(res.data.id).then(() => {
            UserService.signInGetProfile(
              localStorage.getItem('accessToken')
            ).then((res) => {
              this.$store.commit('SET_USER', res.data)
              this.loading = false
              this.close()
            })
          })
        })
      }
    },
    close() {
      this.dialog = false
      this.data.name = ''
      this.data.description = ''
      this.data.relevantSubjects = ''
    },
  },
}
</script>

<style>
</style>