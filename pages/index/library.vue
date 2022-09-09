<template>
  <div v-if="this.$store.getters.userRole == 'TEACHER'">
    <div class="items-center justify-between space-y-2 md:flex md:space-y-0">
      <h1 class="text-H1">My library</h1>
      <v-btn
        height="50"
        color="primary"
        class="text-cap w-full md:w-auto rounded-lg"
        :to="{
          name: 'create',
        }"
        >Create</v-btn
      >
    </div>
    <v-divider class="my-5"></v-divider>
    <div class="grid grid-cols-1 gap-y-3">
      <div
        v-for="quizTemplate in quizTemplates"
        :key="quizTemplate.title"
        class="w-full rounded-lg ring-1 background ring-black ring-opacity-10"
      >
        <v-card-title class="w-full">
          <v-img :src="quizTemplate.image" max-width="100" class="mr-5" />
          <div class="text-h5">
            <span class="font-bold">{{quizTemplate.title}}</span>
          </div>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon center>
              <v-icon>$vuetify.icons.edit</v-icon>
            </v-btn>
            <v-menu offset-y left transition="slide-y-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon center v-bind="attrs" v-on="on">
                  <v-icon class="w-full">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="editItem(item)" class="gap-x-2">
                  <v-icon>mdi-content-duplicate</v-icon>
                  <v-list-item-title>Duplicate</v-list-item-title>
                </v-list-item>
                <v-list-item @click="Delete(item)" class="gap-x-2">
                  <v-icon>mdi-delete</v-icon>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-card-title>
        <!-- <v-card-subtitle class="h-24 overflow-auto scrollbar">
          quiz description
        </v-card-subtitle>-->
        <v-card-text class="flex items-center justify-between">
          <!-- <div class="px-3 py-1 rounded-full">10 items</div> -->
          <!-- <v-chip color="secondary" class="!hover:bg-secondary">10 items</v-chip> -->
          <span>
            edit {{quizTemplate.lastUpdated
            }}
          </span>
          <div>
            <v-btn color="white" disabled>Assign</v-btn>
            <v-btn color="primary">Start</v-btn>
          </div>
        </v-card-text>
      </div>
    </div>
  </div>
</template>

<script>
import BaseDialogCondition from '~/components/BaseDialogCondition.vue'
import TeacherService from '~/services/TeacherService'

export default {
  components: { BaseDialogCondition },
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
      quizTemplates: [],
    }
  },
  methods: {},
  created() {
    TeacherService.getQuizTemplate(this.$store.getters.userId).then((res) => {
      this.quizTemplates = res.data
      console.log(this.quizTemplates)
      Date.parse
    })
  },
}
</script>

<style scoped>
:deep(.btn-dialog-style) {
  @apply w-full md:w-auto;
}
</style>
