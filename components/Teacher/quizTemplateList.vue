<template>
  <div class="w-full rounded-lg ring-1 background ring-black ring-opacity-10">
    <v-card-title class="w-full">
      <v-img :src="quizTemplate.image" max-width="100" class="mr-5" />
      <div class="text-h5">
        <span class="font-bold">{{quizTemplate.title}}</span>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn icon center @click="editQuizTemplate">
          <v-icon>$vuetify.icons.edit</v-icon>
        </v-btn>
        <v-menu offset-y left transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon center v-bind="attrs" v-on="on">
              <v-icon class="w-full">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <!-- <v-list-item @click="editItem(item)" class="gap-x-2">
                  <v-icon>mdi-content-duplicate</v-icon>
                  <v-list-item-title>Duplicate</v-list-item-title>
            </v-list-item>-->
            <v-list-item @click="deleteQuizTemplate()" class="gap-x-2">
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
</template>

<script>
import TeacherService from '~/services/TeacherService'

export default {
  props: {
    quizTemplate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pincode: '',
    }
  },
  methods: {
    deleteQuizTemplate() {
      TeacherService.deleteQuizTemplate(this.quizTemplate.id).then(() => {
        this.$emit('delete-quiz-template', this.quizTemplate.id)
      })
    },
    editQuizTemplate() {
      this.$store.commit('setIsEditMode', true)
      this.$store.commit('isEditMode', true)
      this.$router.push({
        name: 'create-quizTemplateId',
        params: { quizTemplateId: this.quizTemplate.id },
      })
    },
  },
  created() {},
}
</script>
