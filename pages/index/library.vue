<template>
  <div v-if="userRole == 'TEACHER'">
    <div class="items-center justify-between space-y-2 md:flex md:space-y-0">
      <h1 class="text-H1">My library</h1>
      <v-btn
        v-if="quizTemplatesLength > 0"
        height="48"
        color="primary"
        class="text-cap w-full md:w-auto rounded-lg"
        :to="{
          name: 'create-quizTemplateId',
          params: { quizTemplateId: 'new' },
        }"
        >Create quiz template</v-btn
      >
    </div>

    <v-divider class="my-5" />

    <v-form
      ref="form"
      lazy-validation
      @submit.prevent="searchQuizTemplate"
      class="space-y-2 mb-3"
    >
      <v-text-field
        solo
        hide-details
        v-model="searchQuizText"
        prepend-inner-icon="mdi-magnify"
        type="search"
        @keypress.enter="searchQuizTemplate"
      >
        <template v-slot:label> Search quiz <strong>title</strong> </template>
      </v-text-field>

      <v-chip-group multiple active-class="primary--text" @change="chooseTag">
        <v-chip v-for="tag in allTag" :key="tag" :value="tag" filter outlined>
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-form>

    <div v-if="isloadData" class="mx-auto w-fit">
      <the-waiting-text text="loading" classFont="" class="text-lg" />
    </div>

    <div v-else-if="quizTemplatesLength > 0" class="space-y-2">
      <base-quiz-template-item
        v-for="quizTemplate in quizTemplateList"
        :quizTemplate="quizTemplate"
        :key="quizTemplate.id"
        @delete-quiz-template="deleteQuizTemplate"
      />
    </div>

    <div v-else-if="quizTemplatesLength == 0">
      <lottie-player
        class="custon-lottie-star w-48 h-48 mx-auto scale-[2.2]"
        autoplay
        src="https://assets3.lottiefiles.com/private_files/lf30_46kycmnm.json"
      />
      <div class="text-center font-light space-y-2">
        <div class="text-xl font-semibold">No quiz template</div>
        <div class="max-w-xs mx-auto">
          You can create quiz templates for students to take quizzes on
        </div>
        <v-btn
          height="48"
          color="primary"
          class="text-cap rounded-lg mt-4"
          @click="clickCreateQuizTemplate"
          >Create quiz template
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import BaseDialogCondition from '~/components/BaseDialogCondition.vue'
import TheWaitingText from '~/components/TheWaitingText.vue'
import BaseQuizTemplateItem from '~/components/Teacher/BaseQuizTemplateItem.vue'
import TeacherService from '~/services/TeacherService'
import QuizService from '~/services/QuizService'

export default {
  components: { BaseDialogCondition, BaseQuizTemplateItem, TheWaitingText },
  head() {
    return {
      title: 'Library',
    }
  },
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
      quizTemplatesData: [],
      quizTemplates: [],
      isloadData: false,
      searchQuizText: '',
      allTag: '',
    }
  },
  methods: {
    deleteQuizTemplate(id) {
      this.quizTemplates = this.quizTemplates.filter(
        (quizTemplate) => quizTemplate.id !== id
      )
    },
    clickCreateQuizTemplate() {
      this.$router.push({
        name: 'create-quizTemplateId',
        params: { quizTemplateId: 'new' },
      })
    },
    searchQuizTemplate() {
      console.log('searchQuizTemplate') // AI Generated
    },
    chooseTag(event) {
      this.quizTemplates = structuredClone(this.quizTemplatesData)
      if (event.length > 0) {
        this.quizTemplates = this.quizTemplatesData.filter((quizTemplate) => {
          let isMatch = false
          event.forEach((tag) => {
            if (quizTemplate.tags.includes(tag)) {
              isMatch = true
            }
          })
          return isMatch
        })
      }
    },
  },
  computed: {
    quizTemplatesLength() {
      return this.quizTemplates.length
    },
    userRole() {
      return this.$store.getters.userRole ? this.$store.getters.userRole : ''
    },
    quizTemplateList() {
      return this.quizTemplates.filter((quizTemplate) => {
        return quizTemplate.title
          .toLowerCase()
          .includes(this.searchQuizText.toLowerCase())
      })
    },
  },
  created() {
    this.isloadData = true
    TeacherService.getQuizTemplate(localStorage.getItem('userId')).then(
      (res) => {
        this.quizTemplatesData = res.data.sort((a, b) => {
          let dateA = Date.parse(
            a.lastUpdated
              .replace(/(\/)/gi, '-')
              .replace(/(\w+)-(\w+)-(\w+)/gi, '$3-$2-$1')
          )

          let dateB = Date.parse(
            b.lastUpdated
              .replace(/(\/)/gi, '-')
              .replace(/(\w+)-(\w+)-(\w+)/gi, '$3-$2-$1')
          )
          return dateA < dateB ? 1 : -1
        })
        this.quizTemplates = structuredClone(this.quizTemplatesData)
        this.isloadData = false
      }
    )
    QuizService.getAllTag().then((res) => {
      this.allTag = res.data.map((item) => item.tag)
      this.allTag.push('Other')
    })
  },
}
</script>

<style scoped>
:deep(.btn-dialog-style) {
  @apply w-full md:w-auto;
}
</style>
