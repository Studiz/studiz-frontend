<template>
  <v-app-bar
    fixed
    app
    flat
    class="drop-shadow-md"
    height="60"
    dense
    clipped-left
    clipped-right
    color="background_card"
  >
    <v-app-bar-nav-icon @click="$emit('toggle-nav-drawer')"></v-app-bar-nav-icon>
    <!-- <v-btn icon class="!-ml-3" @click="$emit('toggle-setting-quiz')"
      ><v-icon>mdi-questionList</v-icon></v-btn
    >-->
    <div class="flex items-center justify-between gap-x-2">
      <v-btn
        height="50px"
        elevation="0"
        color="transparent"
        class="overflow-hidden d-none d-md-inline-flex"
        to="/"
      >
        <v-icon size="80">$vuetify.icons.Studiz_logo</v-icon>
      </v-btn>
      <base-dialog-condition
        :persistent="true"
        :propDialog="formIsOpen"
        :outlined="true"
        maxwidth="1000px"
        height="36"
        classBtn="!rounded-md !justify-start custom-btn"
        @close="closeForm"
        @open="formIsOpen = true"
        @confirm="saveQuizDetails"
      >
        <template #namebtn>
          <span class="d-none d-sm-inline">
            {{
            quizTitle ? quizTitle : 'Enter a details'
            }}
          </span>
          <span class="d-inline d-sm-none">{{ quizTitle ? quizTitle : 'Details' }}</span>
        </template>
        <template #title>Create quiz</template>
        <template #btn2>save</template>
        <template #contain>
          <v-form ref="form" class="pa-md-3" lazy-validation @submit.prevent="saveQuizDetails">
            <v-container class="flex">
              <div class="w-full">
                <v-text-field label="Title" outlined required v-model="quizTitle" :counter="50"></v-text-field>
                <v-textarea
                  label="Description"
                  outlined
                  required
                  v-model="quizDescription"
                  :counter="200"
                ></v-textarea>
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
                    'Mmathematics',
                    'Health and hygeine',
                    'Other',
                  ]"
                  label="Choose relevant subject"
                  :rules="[rules.required]"
                  v-model="quizTags"
                  multiple
                  outlined
                  chips
                ></v-autocomplete>
              </div>
              <div class="w-full">
                <v-img contain :src="quizImage" max-width="400" class="mx-auto m-5" />
                <v-file-input
                  class="mx-5"
                  accept="image/*"
                  label="File input"
                  filled
                  prepend-icon="mdi-camera"
                  @change="previewImage"
                ></v-file-input>
              </div>
            </v-container>
          </v-form>
        </template>
      </base-dialog-condition>

      <v-spacer />
      <div class="d-none d-md-inline-flex">
        <light-dark-mode class="!h-9 !w-9" />
      </div>
      <!-- <v-btn outlined disabled>
        <v-icon left>mdi-eye-outline</v-icon>preview
      </v-btn>-->
      <v-divider vertical class="mx-2 d-none d-md-inline-flex" />
      <v-btn color="primary" @click="saveQuizTemplate" :disabled="!canSave">save & exit</v-btn>
      <v-divider vertical class="mx-2 d-none d-md-inline-flex" />
      <v-btn icon class="!-mr-3 lg:!mr-0" @click="$emit('toggle-setting-quiz')">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import BaseDialogCondition from '../BaseDialogCondition.vue'
import lightDarkMode from './light-dark-mode.vue'

export default {
  components: { lightDarkMode, BaseDialogCondition },
  data() {
    return {
      formIsOpen: true,
      quizTitle: '',
      quizDescription: '',
      quizTags: [],
      quizImage: '',
      fileImage: null,
      rules: {
        required: (v) => !!v || 'Required.',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 10) ||
            'Classroom name must be less than 10 characters',
        ],
      },
    }
  },
  computed: {
    quizTemplate() {
      return this.$store.getters.quizTemplate
    },
    canSave() {
      if (this.$store.getters.isEditMode) {
        return this.$store.getters.quizTemplate.title ? true : false
      } else {
        return this.$store.getters.quizTemplate.title ? true : false
      }
    },
  },
  methods: {
    editquizTitle() {
      if (this.$refs.form.validate()) {
        this.$emit('edit-quiz-title', this.newQuizTitle)
      }
    },
    closeForm() {
      this.quizTitle = this.$store.getters.quizTemplate.title
      this.quizDescription = this.$store.getters.quizTemplate.description
      this.quizTags = this.$store.getters.quizTemplate.tags
      this.quizImage = this.$store.getters.quizTemplate.image
      this.formIsOpen = false
    },
    saveQuizDetails() {
      this.$store.commit('setQuizTitle', this.quizTitle)
      this.$store.commit('setQuizDescription', this.quizDescription)
      this.$store.commit('setQuizTags', this.quizTags)
      this.$store.commit('setQuizImage', this.quizImage)
      this.$store.commit('setImageQuizFile', this.fileImage)
      this.formIsOpen = false
    },
    previewImage(payload) {
      this.fileImage = payload
      if (this.fileImage) {
        this.quizImage = URL.createObjectURL(this.fileImage)
        URL.revokeObjectURL(this.fileImage)
        this.$store.commit('setImageQuizFile', this.fileImage)
      }
    },
    saveQuizTemplate() {
      this.$emit('save-quiz-template')
    },
  },
  mounted() {
    setTimeout(() => {
      this.quizTitle = this.$store.getters.quizTemplate.title
      this.quizDescription = this.$store.getters.quizTemplate.description
      this.quizTags = this.$store.getters.quizTemplate.tags
      this.quizImage = this.$store.getters.quizTemplate.image
    }, 1000)
  },
}
</script>

<style scoped>
:deep(.btn-dialog-style) {
  @apply rounded-none;
}
:deep(.custom-btn > .v-btn__content) {
  @apply !inline text-left w-20 sm:w-40 md:w-fit md:max-w-xs truncate overflow-auto;
}
</style>
