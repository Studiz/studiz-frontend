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
    <v-app-bar-nav-icon
      @click="$emit('toggle-nav-drawer')"
    ></v-app-bar-nav-icon>
    <!-- <v-btn height="44" icon class="!-ml-3" @click="$emit('toggle-setting-quiz')"
      ><v-icon>mdi-questionList</v-icon></v-btn
    >-->
    <div class="flex items-center justify-between gap-x-2">
      <v-btn
        height="50px"
        elevation="0"
        color="transparent"
        class="overflow-hidden d-none d-md-inline-flex flex-none"
        to="/classrooms"
      >
        <v-icon size="80">$vuetify.icons.Studiz_logo</v-icon>
      </v-btn>
      <base-dialog-condition
        :key="isforceOpenDialog"
        :forceOpen="isforceOpenDialog"
        :persistent="true"
        :propDialog="formIsOpen"
        :outlined="true"
        colorBTN="grey"
        height="44"
        maxwidth="1000px"
        classBtn="!rounded-md !justify-start custom-btn absolutes flex-1"
        @close="closeForm"
        @open="formIsOpen = true"
        @confirm="saveQuizDetails"
      >
        <template #namebtn>
          <span
            class="hidden sm:inline w-fit max-w-[60px] sm:min-w-[176px] sm:max-w-[176px] truncate normal-case overflow-hidden text-black dark:text-white text-left"
          >
            {{ quizTitle ? quizTitle : 'Quiz name' }}
          </span>
          <span
            class="d-inline d-sm-none !capitalize !font-semibold text-black dark:text-white"
            >Details</span
          >
          <v-btn
            color="primary_shade"
            elevation="0"
            class="-mr-[13px] d-none d-sm-inline !capitalize !font-semibold text-black dark:text-white"
            >Details</v-btn
          >
        </template>
        <template #title>Create quiz</template>
        <template #btn2>save</template>
        <template #contain>
          <v-form
            ref="form"
            class="py-3 px-3 pa-md-4"
            lazy-validation
            @submit.prevent="saveQuizDetails"
          >
            <div class="flex flex-col lg:flex-row gap-3">
              <div class="w-full">
                <v-text-field
                  label="Title"
                  type="text"
                  outlined
                  required
                  v-model="quizTitle"
                  :counter="50"
                  :rules="rules.quizTitle"
                ></v-text-field>
                <v-textarea
                  label="Description"
                  type="text"
                  outlined
                  required
                  v-model="quizDescription"
                  :counter="200"
                  :rules="rules.quizDescription"
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
                  label="Subject Tags"
                  :rules="[rules.required]"
                  v-model="quizTags"
                  deletable-chips
                  outlined
                  chips
                  multiple
                ></v-autocomplete>
              </div>
              <div class="w-full space-y-5">
                <div class="background rounded-lg min-h-fit p-3">
                  <v-img
                    contain
                    :src="quizImage"
                    max-width="460"
                    max-height="224"
                    class="mx-auto max-h-full max-w-full"
                  />
                </div>
                <v-file-input
                  accept="image/*"
                  label="File input"
                  outlined
                  prepend-icon="mdi-camera"
                  @change="previewImage"
                ></v-file-input>
              </div>
            </div>
          </v-form>
        </template>
      </base-dialog-condition>

      <v-spacer />
      <div class="d-none d-md-inline-flex">
        <base-button-light-dark-mode class="!h-9 !w-9" />
      </div>
      <!-- <v-btn height="44" outlined disabled class="d-none d-sm-inline">
        <v-icon>mdi-eye-outline</v-icon>
        <span class="hidden md:inline">preview</span>
      </v-btn> -->
      <v-divider vertical class="mx-2 d-none d-md-inline-flex" />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            height="44"
            color="primary"
            class="flex-none"
            @click="saveQuizTemplate"
            :disabled="!canSave"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>$vuetify.icons.save_and_close</v-icon>
            <div class="hidden md:inline">
              <span>save</span>
            </div>
          </v-btn>
        </template>
        <span>Save & close</span>
      </v-tooltip>

      <v-divider vertical class="mx-2 d-none d-md-inline-flex" />
      <v-btn
        height="44"
        icon
        class="!-mr-3 lg:!mr-0 flex-none"
        @click="$emit('toggle-setting-quiz')"
      >
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import BaseDialogCondition from '../BaseDialogCondition.vue'
import BaseButtonLightDarkMode from './BaseButtonLightDarkMode.vue'

export default {
  components: { BaseDialogCondition, BaseButtonLightDarkMode },
  data() {
    return {
      formIsOpen: true,
      isforceOpenDialog: false,
      quizTitle: '',
      quizDescription: '',
      quizTags: [],
      quizImage: '',
      fileImage: null,
      rules: {
        required: (v) => !!v || 'Required.',
        quizTitle: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 50) || 'Title must be less than 50 characters',
        ],
        quizDescription: [
          (v) => {
            if (v)
              return (
                v.length <= 200 ||
                'Description must be less than 200 characters'
              )
            else return true
          },
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
      if (this.$refs.form.validate()) {
        this.$store.commit('setQuizTitle', this.quizTitle)
        this.$store.commit('setQuizDescription', this.quizDescription)
        this.$store.commit('setQuizTags', this.quizTags)
        this.$store.commit('setQuizImage', this.quizImage)
        this.$store.commit('setImageQuizFile', this.fileImage)
        this.formIsOpen = false
      }
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
    forceOpenDialog() {
      this.isforceOpenDialog = this.quizTitle == '' ? true : false
    },
  },
  mounted() {
    setTimeout(() => {
      this.quizTitle = this.$store.getters.quizTemplate.title
      this.quizDescription = this.$store.getters.quizTemplate.description
      this.quizTags = this.$store.getters.quizTemplate.tags
      this.quizImage = this.$store.getters.quizTemplate.image
      this.forceOpenDialog()
    }, 1000)
  },
}
</script>

<style scoped>
:deep(.btn-dialog-style) {
  @apply rounded-none;
}
:deep(.v-btn__content) {
  @apply items-center gap-x-2
  /* !inline text-left w-20 sm:w-40 md:w-fit md:max-w-xs truncate overflow-auto; */;
}
</style>
