<template>
  <div>
    <loaging-page />
    <v-app class="overflow-hidden">
      <create-navbar
        :quizTitle="quizTitle"
        @save-quiz-template="$emit('save-quiz-template')"
        @toggle-nav-drawer="toggleNavDrawer"
        @toggle-setting-quiz="toggleNavDrawerSettingQuiz"
      />

      <v-navigation-drawer
        absolute
        touchless
        bottom
        app
        clipped
        right
        v-model="drawerSettingQuiz"
      >
        <v-list class="!py-4 !px-2">
          <v-list-item-group
            :key="currentQuesiton"
            class="flex flex-col gap-6 pl-1"
          >
            <div class="space-y-2">
              <v-select
                :items="listQuizType"
                v-model="selectQuizType"
                label="Question type"
                prepend-icon="$vuetify.icons.quiz"
                dense
                outlined
                hide-details
                @change="changeQuizType"
              ></v-select>
              <div v-show="selectQuizType.value == 'multiple'">
                *Required more than one correct choice
              </div>
            </div>
            <v-select
              :items="listTimeLimit"
              v-model="selectTimeLimit"
              label="Time limit"
              prepend-icon="mdi-clock-time-twelve-outline"
              dense
              outlined
              hide-details
              @change="chanceTimeLimit"
            ></v-select>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer
        absolute
        bottom
        app
        clipped
        touchless
        v-model="drawerQuizList"
        mobile-breakpoint="1264"
        width="208"
        class="!h-64 lg:!h-full scrollbar"
      >
        <v-list nav class="py-3 py-lg-2">
          <draggable
            v-bind="dragOptions"
            v-model="newDataQuestion"
            @end="changeOrdering"
            handle=".handle"
          >
            <transition-group
              type="transition"
              class="gap-2 flex lg:flex-col overflow-auto scrollbar py-1 py-lg-0"
            >
              <thumbnail
                v-for="(item, index) in newDataQuestion"
                :itemActive="selectItem"
                :key="`${index}-${item}`"
                :item="item"
                :index="index"
                :totalQuestion="totalQuestion"
                :listQuizType="listQuizType"
                @active-item="activeItem"
                @delete-question="deleteQuestion"
                @duplicate-question="duplicateQuestion"
              />
            </transition-group>
          </draggable>
          <v-divider class="my-3 md:my-2" />

          <v-dialog v-model="dialog" width="400">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                height="48"
                class="text-center primary white--text rounded-lg w-full transition-all lg:mb-3"
                v-bind="attrs"
                v-on="on"
              >
                <!-- @click="addQuestion" -->
                <v-icon left>mdi-plus</v-icon>
                <span>Add question</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5"> Add question type </v-card-title>
              <v-card-text class="space-y-2">
                <div
                  v-for="(itemType, index) in listQuizType"
                  :key="`${itemType}-type-${index}`"
                >
                  <base-btn-question-type
                    :index="index"
                    :questionType="itemType"
                    @add-question="addQuestion"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container fluid class="px-1 px-sm-3">
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import createNavbar from '~/components/navbar/createNavbar.vue'
import Thumbnail from '~/components/createquesiton/Thumbnail.vue'
import LoagingPage from '~/components/LoagingPage.vue'
import BaseBtnQuestionType from '~/components/createquesiton/BaseBtnQuestionType.vue'
export default {
  components: {
    createNavbar,
    draggable,
    Thumbnail,
    LoagingPage,
    BaseBtnQuestionType,
  },
  props: {
    quizTitle: {
      type: String,
      default: '',
    },
    totalQuestion: {
      type: Number,
      default: 0,
    },
    dataQuestion: {
      type: Array,
      default: [],
    },
    currentQuesiton: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      listQuizType: [
        {
          text: 'Single choice',
          value: 'single',
          disabled: false,
        },
        {
          text: 'Multiple choice',
          value: 'multiple',
          disabled: false,
        },
        {
          text: 'Trur or False',
          value: 'true/false',
          disabled: false,
        },
        {
          text: 'Poll',
          value: 'poll',
          disabled: false,
        },
        {
          text: 'Sort',
          value: 'sort',
          disabled: false,
        },
      ],
      selectQuizType: null,
      listTimeLimit: [
        {
          text: '5 seconds',
          value: 500,
        },
        {
          text: '10 seconds',
          value: 1000,
        },
        {
          text: '15 seconds',
          value: 1500,
        },
        {
          text: '20 seconds',
          value: 2000,
        },
        {
          text: '30 seconds',
          value: 3000,
        },
        {
          text: '1 miniute',
          value: 1 * 60 * 1000,
        },
        {
          text: '2 miniutes',
          value: 2 * 60 * 1000,
        },
        {
          text: '3 miniutes',
          value: 3 * 60 * 1000,
        },
        {
          text: '4 miniutes',
          value: 4 * 60 * 1000,
        },
        {
          text: '5 miniutes',
          value: 5 * 60 * 1000,
        },
      ],
      selectTimeLimit: null,
      newDataQuestion: {},
      selectItem: 0,
      dragOptions: {
        animation: 200,
        disabled: false,
        ghostClass: 'ghost',
      },
      drawerQuizList: true,
      drawerSettingQuiz: true,
      dialog: false,
    }
  },
  watch: {
    currentQuesiton() {
      this.mappingQuestion()
    },
    dataQuestion() {
      this.mappingQuestion()
    },
  },
  methods: {
    activeItem(index) {
      this.$emit('active-item', index)
      this.selectItem = index
    },
    changeQuizType(event) {
      this.$emit('change-quiz-type', event)
      this.mappingQuestion()
    },
    chanceTimeLimit(event) {
      this.$emit('change-time-limit', event)
      this.mappingQuestion()
    },
    addQuestion(type) {
      this.$emit('add-question', type)
      this.dialog = false
    },
    changeOrdering(event) {
      this.$emit('change-ordering', this.newDataQuestion)
      this.activeItem(event.newIndex)
    },
    mappingQuestion() {
      this.newDataQuestion = this.dataQuestion
      this.selectItem = this.currentQuesiton
      this.selectQuizType = this.listQuizType.find(
        (item) => item.value === this.dataQuestion[this.currentQuesiton].type
      )
      this.selectTimeLimit = this.listTimeLimit.find(
        (item) => item.value === this.dataQuestion[this.currentQuesiton].time
      )
    },
    deleteQuestion(index) {
      this.$emit('delete-question', index)
    },
    duplicateQuestion(index) {
      this.$emit('duplicate-question', index)
    },
    toggleNavDrawer() {
      this.drawerQuizList = !this.drawerQuizList
    },
    toggleNavDrawerSettingQuiz() {
      this.drawerSettingQuiz = !this.drawerSettingQuiz
    },
  },
  computed: {},
  mounted() {},
  created() {
    this.mappingQuestion()
  },
}
</script>

<style scoped>
.ghost {
  opacity: 0.2;
}
:deep(.v-list-item--highlighted) {
  opacity: 100 !important;
  color: var(--v-primary-base) !important;
}
:deep(.scrollbar > .v-navigation-drawer__content::-webkit-scrollbar) {
  width: 5px;
}
:deep(.scrollbar > .v-navigation-drawer__content::-webkit-scrollbar-track) {
  background: transparent;
  margin: 8px 8px;
}
:deep(.scrollbar > .v-navigation-drawer__content::-webkit-scrollbar-thumb) {
  background: var(--v-primary-base);
  border-radius: 50px;
}
:deep(.scrollbar
    > .v-navigation-drawer__content::-webkit-scrollbar-thumb:hover) {
  background: var(--v-primary-base);
  border-radius: 50px;
}
.scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 8px 8px;
}
.scrollbar::-webkit-scrollbar-thumb {
  background: var(--v-primary-base);
  border-radius: 50px;
}
.scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--v-primary-base);
  border-radius: 50px;
}
</style>
