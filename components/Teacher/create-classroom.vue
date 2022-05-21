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
      <v-card-title>
        <span class="text-H1">Create classroom</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation @submit.prevent="createClassroom">
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
              v-model="data.tag"
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
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      data: {
        name: '',
        description: '',
        tag: '',
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
        // tagRule: [(v) => v || 'This field is required'],
      },
    }
  },
  methods: {
    async createClassroom() {
      if (this.$refs.form.validate()) {
        console.log(this.data)
        this.loading = true
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.loading = false
        this.dialog = false
        this.$refs.form.reset()
      }
    },
    close() {
      this.dialog = false
      this.$refs.form.reset()
    },
  },
}
</script>

<style>
</style>