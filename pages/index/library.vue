<template>
  <div v-if="this.$store.getters.userRole == 'TEACHER'">
    <div class="items-center justify-between space-y-2 md:flex md:space-y-0">
      <h1 class="text-H1">My library</h1>
      <v-btn color="primary" :to="{
          name: 'create',
        }">Create</v-btn>
    </div>
    <v-divider class="my-5"></v-divider>
    <div class="grid grid-cols-1 gap-y-3">
      <div
        v-for="classroom in 3"
        :key="classroom.name"
        class="w-full rounded-lg ring-1 background ring-black ring-opacity-10"
      >
        <v-card-title class="w-full">
          <div class="text-h5">
            <span class="font-bold">Quiz name</span>
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
          <span>edit 00/00/00</span>
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
    }
  },
  methods: {},
}
</script>

<style scoped>
:deep(button.btn-dialog-style) {
  @apply w-full md:w-auto;
}
</style>
