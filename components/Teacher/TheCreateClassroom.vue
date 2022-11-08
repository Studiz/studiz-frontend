<template>
  <v-dialog v-model="dialog" persistent max-width="600px" :key="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        class="w-full rounded-lg text-cap md:w-auto"
        height="48"
        v-bind="attrs"
        v-on="on"
        >create classroom
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="px-3 px-md-5">
        <span class="break-normal text-H1">
          <span v-if="idModeEdit == true">Edit </span>
          <span v-else>Create </span>
          classroom</span
        >
      </v-card-title>
      <v-form
        ref="form"
        class="pa-md-3"
        lazy-validation
        @submit.prevent="createClassroom"
      >
        <v-container>
          <v-text-field
            label="Classroom name"
            outlined
            required
            v-model="data.name"
            :rules="rules.nameRules"
            :counter="30"
          ></v-text-field>
          <v-text-field
            label="Description"
            outlined
            v-model="data.description"
            :rules="rules.descriptionRules"
            :counter="100"
          ></v-text-field>
          <v-autocomplete
            :items="[
              'Reading',
              'Writing',
              'Coding',
              'Art',
              'Music',
              'Chemistry',
              'Physics',
              'Science',
              'Biology',
              'Mathematics',
              'Health and hygeine',
              'Other',
            ]"
            label="Choose relevant subject"
            :rules="[rules.required]"
            v-model="data.relevantSubjects"
            multiple
            outlined
            chips
          ></v-autocomplete>

          <div>Theme colors</div>
          <v-radio-group v-model="data.color" class="w-[500px] mx-auto">
            <v-radio
              off-icon=""
              on-icon="mdi-checkbox-marked-circle"
              v-for="color in colors"
              :key="color.classColor"
              color="white"
              :value="color.classColor"
              :class="color.classColor"
              class="bg-gradient-to-r"
            >
            </v-radio>
            <!-- :label="color.label" -->
          </v-radio-group>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" class="!capitalize" @click="close"
            >Close</v-btn
          >
          <v-btn
            v-if="idModeEdit == true"
            text
            color="primary"
            :loading="loading"
            @click="editClassroom"
            >edit</v-btn
          >
          <v-btn v-else text type="submit" color="primary" :loading="loading"
            >create</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import UserService from '~/services/UserService'
import TeacherService from '../../services/TeacherService'
export default {
  props: {
    idModeEdit: {
      type: Boolean,
      default: false,
    },
    classroomObj: {
      type: Object,
    },
  },
  watch: {
    idModeEdit: {
      handler: function (val) {
        this.dialog = val
        this.mappingData()
        if (val == false) {
          this.data = {
            name: '',
            description: '',
            relevantSubjects: '',
            color: 'from-cyan-500 to-blue-500',
          }
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
      data: {
        name: '',
        description: '',
        relevantSubjects: '',
        color: 'from-cyan-500 to-blue-500',
      },
      rules: {
        required: (v) => !!v || 'Required.',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 30) ||
            'Classroom name must be less than 30 characters',
        ],
        descriptionRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 100) ||
            'Description must be less than 100 characters',
        ],
      },
      colors: [
        { classColor: 'from-[#db2777] to-[#4f46e5]' },
        { classColor: 'from-[#6d51a5] to-[#e4a7c5]' },
        { classColor: 'from-[#f492f0] to-[#a18dce]' },
        { classColor: 'from-[#30c5d2] to-[#471069]' },
        { classColor: 'from-[#06b6d4] to-[#2563eb]' },
        { classColor: 'from-[#45B649] to-[#036ED9]' },
        { classColor: 'from-[#16a085] to-[#f4d03f]' },
        { classColor: 'from-[#ec8c69] to-[#ed6ea0]' },
        { classColor: 'from-[#f86ca7] to-[#FF8818]' }, //
        { classColor: 'from-[#ff7e5f] to-[#feb47b]' },
        { classColor: 'from-[#FFA62E] to-[#EA4D2C]' },
        { classColor: 'from-[#616161] to-[#9bc5c3]' }, //
      ],
    }
  },
  methods: {
    async createClassroom() {
      if (this.$refs.form.validate() && !this.idModeEdit) {
        let data = Object.assign({}, this.data)
        data.teacherId = this.$store.getters.userId
        this.loading = true
        TeacherService.createClassroom(data)
          .then((res) => {
            TeacherService.generatePinCode(res.data.id).then(() => {
              UserService.signInGetProfile(localStorage.getItem('accessToken'))
                .then((res) => {
                  this.$store.commit('setUser', res.data)
                  this.loading = false
                  this.$store.commit('TOGGLE_ALERT', {
                    type: 'success',
                    message: 'Created classroom successfully',
                  })
                  this.close()
                })
                .catch((err) => {
                  this.close()
                  this.$store.commit('TOGGLE_ALERT', {
                    type: 'error',
                    message: err.response.message,
                  })
                })
            })
          })
          .catch((err) => {
            this.close()
            this.$store.commit('TOGGLE_ALERT', {
              type: 'error',
              message: err.response.message,
            })
          })
      }
    },

    editClassroom() {
      if (this.$refs.form.validate() && this.idModeEdit) {
        console.log('edit')
        // edit classroom here
      }
    },
    resetData() {
      this.data = {
        name: '',
        description: '',
        relevantSubjects: '',
        color: '',
      }
    },
    close() {
      this.dialog = false
      this.data.name = ''
      this.data.description = ''
      this.data.relevantSubjects = ''
      this.data.color = ''
      this.$emit('close-dialog')
    },
    mappingData() {
      this.data.name = this.classroomObj.name
      this.data.description = this.classroomObj.description
      this.data.relevantSubjects = this.classroomObj.relevantSubjects
      this.data.color = this.classroomObj.color
    },
  },
}
</script>

<style scoped>
:deep(.v-input--selection-controls__ripple) {
  @apply sm:w-[82px] sm:left-[-36px] rounded-md;
}
:deep(.v-input--selection-controls__input) {
  @apply !mx-0;
}
:deep(.v-radio) {
  @apply flex-col justify-center items-center w-[41px] sm:w-[100px] h-[41px] !m-0 rounded-md;
}
:deep(.v-input--radio-group__input) {
  @apply !flex-row flex-wrap justify-center items-center gap-3;
}
</style>
