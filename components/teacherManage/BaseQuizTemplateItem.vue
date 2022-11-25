<template>
  <div
    class="w-full group rounded-lg ring-1 background ring-black ring-opacity-10 p-4 flex flex-col md:flex-row gap-4 relative"
  >
    <v-img
      :src="quizTemplate.image"
      max-width="144"
      max-height="96"
      min-width="144"
      min-height="96"
      contain
      class="self-center background_card rounded-md"
    />
    <div class="flex flex-col gap-4">
      <div class="flex flex-wrap w-full gap-2">
        <div class="text-h5 font-bold line-clamp-1">
          {{ quizTemplate.title }}
        </div>

        <v-chip v-for="tag in quizTemplate?.tags" :key="tag">{{ tag }}</v-chip>
        <v-spacer></v-spacer>
        <div
          class="absolute top-2 inline-flex gap-2 right-2 group-hover:visible group-hover:opacity-100 group-hover:w-auto group-hover:h-auto lg:opacity-0 lg:invisible transition-all"
        >
          <div class="ring-1 ring-black ring-opacity-10 rounded-full">
            <v-btn
              fab
              small
              class="background_card elevation-0"
              @click="editQuizTemplate"
            >
              <v-icon>$vuetify.icons.edit</v-icon>
            </v-btn>
          </div>

          <v-dialog v-model="dialogDelete" width="400">
            <template v-slot:activator="{ on, attrs }">
              <div
                v-bind="attrs"
                v-on="on"
                class="ring-1 ring-black ring-opacity-10 rounded-full"
              >
                <v-btn fab small class="background_card elevation-0">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
            <v-card>
              <v-card-title>
                <span class="break-normal">Delete quiz</span>
              </v-card-title>
              <v-card-text>Are you sure to delete this quiz? </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  text
                  class="!capitalize"
                  color="primary"
                  @click="dialogDelete = false"
                  >cancel
                </v-btn>
                <v-btn
                  text
                  type="submit"
                  color="error"
                  elevation="0"
                  @click="deleteQuizTemplate"
                  >delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <!-- <v-card-subtitle class="h-24 overflow-auto scrollbar">
          quiz description
      </v-card-subtitle>-->
      <div class="flex items-center justify-between w-full flex-wrap gap-4">
        <!-- <div class="px-3 py-1 rounded-full">10 items</div> -->
        <!-- <v-chip color="secondary" class="!hover:bg-secondary">10 items</v-chip> -->
        <span class="whitespace-nowrap self-end inline-flex gap-x-2"
          >Edit:
          <base-time-to-text :time="quizTemplate.lastUpdated" />
        </span>
        <div class="inline-flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          <!-- <v-btn color="white" class="w-full sm:w-auto" disabled>Assign</v-btn> -->

          <v-dialog v-model="dialogStartQuiz" width="400">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                class="w-full sm:w-auto"
                v-bind="attrs"
                v-on="on"
              >
                <span>Start</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5">Start quiz with ...?</v-card-title>

              <v-card-text class="space-y-2">
                <v-dialog
                  scrollable
                  v-model="dialogStartQuizWithClassroom"
                  width="400"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      block
                      height="44"
                      elevation="0"
                      color="primary_shade"
                      class="px-0 quiz-btn"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span
                        class="normal-case text-center w-full font-semibold"
                      >
                        Quiz with classroom</span
                      >
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h5 !break-normal"
                      >Select class to start quiz</v-card-title
                    >
                    <v-card-text class="space-y-2">
                      <v-btn
                        v-for="classroom in this.$store.getters.classRooms"
                        :key="classroom.id"
                        block
                        height="44"
                        elevation="0"
                        color="primary_shade"
                        class="px-0 quiz-btn"
                        @click="startQuiz(classroom.id)"
                      >
                        <span
                          class="normal-case text-center w-full font-semibold"
                        >
                          {{ classroom.name }}</span
                        >
                      </v-btn>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        color="primary"
                        text
                        @click="dialogStartQuizWithClassroom = false"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn
                  block
                  height="44"
                  elevation="0"
                  color="primary_shade"
                  class="px-0 quiz-btn"
                  @click="startQuiz"
                >
                  <span class="normal-case text-center w-full font-semibold">
                    Quiz without classroom</span
                  >
                </v-btn>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text @click="dialogStartQuiz = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TeacherService from '~/services/TeacherService'
import BaseTimeToText from '../BaseTimeToText.vue'

export default {
  components: { BaseTimeToText },
  props: {
    quizTemplate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pincode: '',
      dialogStartQuiz: false,
      dialogStartQuizWithClassroom: false,
      dialogDelete: false,
    }
  },
  methods: {
    deleteQuizTemplate() {
      this.$store.commit('TOGGLE_LOADING', true)
      TeacherService.deleteQuizTemplate(this.quizTemplate.id)
        .then(() => {
          this.$emit('delete-quiz-template', this.quizTemplate.id)
          this.$store.commit('TOGGLE_LOADING', false)
          this.$store.commit('TOGGLE_ALERT', {
            type: 'success',
            message: 'Delete quiz template succeed',
          })
        })
        .catch((err) => {
          this.$store.commit('TOGGLE_LOADING', false)
          this.$store.commit('TOGGLE_ALERT', {
            type: 'error',
            message: err.response.message,
          })
        })
      this.dialogDelete = false
    },
    editQuizTemplate() {
      this.$store.commit('setIsEditMode', true)
      this.$store.commit('isEditMode', true)
      this.$router.push({
        name: 'create-quizTemplateId',
        params: { quizTemplateId: this.quizTemplate.id },
      })
    },
    startQuiz(classroomId) {
      let startAt = new Date()
      startAt = startAt.toLocaleString('en-GB')

      this.$store.commit('TOGGLE_LOADING', true)
      TeacherService.createQuiz({
        teacherId: localStorage.getItem('userId'),
        quizTemplateId: this.quizTemplate.id,
        classroomId: typeof classroomId === 'string' ? classroomId : null,
        studentList: [],
        startAt: startAt,
      })
        .then((res) => {
          this.$router.push({
            name: 'lobby-quizId',
            params: { quizId: res.data.id },
          })
          this.$store.commit('TOGGLE_LOADING', false)
          this.$store.commit('TOGGLE_ALERT', {
            type: 'success',
            message: 'Quiz created',
          })
        })
        .catch((err) => {
          this.$store.commit('TOGGLE_LOADING', false)
          this.$store.commit('TOGGLE_ALERT', {
            type: 'error',
            message: err.response.message,
          })
        })
    },
  },
  created() {},
}
</script>

<style scoped>
.quiz-btn.theme--light.v-btn.v-btn--has-bg:hover {
  background-color: var(--v-primary-base) !important;
  color: #fff !important;
}
.quiz-btn.theme--dark.v-btn--has-bg:hover {
  background-color: var(--v-primary-base) !important;
  color: #fff !important;
}
</style>
