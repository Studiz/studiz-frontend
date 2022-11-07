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

          <v-radio-group v-model="data.color">
            <v-radio
              off-icon=""
              on-icon="mdi-checkbox-marked-circle"
              v-for="color in colors"
              :key="color.label"
              color="white"
              :value="color.label"
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
            color: 'light blue',
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
        color: 'light blue',
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
        {
          id: 'color1',
          label: 'red',
          hexCode: 'f44336',
          classColor: 'bg-red-600',
        },
        {
          id: 'color2',
          label: 'pink',
          hexCode: 'e91e63',
          classColor: 'from-pink-200 to-indigo-400',
        },
        {
          id: 'color3',
          label: 'purple',
          hexCode: '9c27b0',
          classColor: 'bg-purple-600',
        },
        {
          id: 'color5',
          label: 'indigo',
          hexCode: '3f51b5',
          classColor: 'bg-indigo-600',
        },
        {
          id: 'color6',
          label: 'blue',
          hexCode: '2196f3',
          classColor: 'bg-blue-600',
        },
        {
          id: 'color7',
          label: 'light blue',
          hexCode: '03a9f4',
          classColor: ' from-cyan-500 to-blue-500',
        },
        {
          id: 'color8',
          label: 'cyan',
          hexCode: '00bcd4',
          classColor: 'bg-cyan-600',
        },
        {
          id: 'color9',
          label: 'teal',
          hexCode: '009688',
          classColor: 'bg-teal-600',
        },
        {
          id: 'color10',
          label: 'green',
          hexCode: '4caf50',
          classColor: 'bg-green-600',
        },
        {
          id: 'color13',
          label: 'yellow',
          hexCode: 'ffeb3b',
          classColor: 'bg-yellow-600',
        },
        {
          id: 'color14',
          label: 'amber',
          hexCode: 'ffc107',
          classColor: 'bg-amber-600',
        },
        {
          id: 'color15',
          label: 'orange',
          hexCode: 'ff9800',
          classColor: 'bg-orange-600',
        },
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
