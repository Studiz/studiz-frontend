<template>
  <div>
    <the-loading-screen />
    <v-app class="overflow-hidden">
      <the-alert-notification />

      <the-navbar-create-quiz
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
        <v-list class="!py-4 !px-2 h-full !flex justify-center">
          <v-list-item-group
            :key="currentQuesiton"
            class="inline-flex flex-col gap-6 justify-between h-full"
          >
            <div class="space-y-2 pl-1">
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
              class="pl-1"
              :items="listTimeLimit"
              v-model="selectTimeLimit"
              label="Time limit"
              prepend-icon="mdi-clock-time-twelve-outline"
              dense
              outlined
              hide-details
              @change="chanceTimeLimit"
            ></v-select>

            <div class="space-y-3">
              <v-divider />
              <div class="flex gap-3 justify-between">
                <v-dialog v-model="dialogDelete" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      color="error"
                      width="108"
                      v-bind="attrs"
                      v-on="on"
                      :disabled="totalQuestion == 1 && currentQuesiton == 0"
                      @click="dialogDelete = true"
                    >
                      <span class="normal-case">Delete</span>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="break-normal">Delete quiz question</span>
                    </v-card-title>
                    <v-card-text
                      >Are you sure you want to delete this
                      question?</v-card-text
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        class="!capitalize"
                        color="primary"
                        @click="dialogDelete = false"
                        >cancel</v-btn
                      >
                      <v-btn
                        text
                        type="submit"
                        color="error"
                        @click="deleteQuestion(selectItem)"
                        >delete</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-btn
                  outlined
                  color="primary"
                  @click="duplicateQuestion(selectItem)"
                >
                  <span class="normal-case">Duplicate</span>
                </v-btn>
              </div>
            </div>
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
        class="!h-72 lg:!h-full scrollbar"
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
              class="gap-2 flex lg:flex-col overflow-auto scrollbar py-2 py-lg-0"
            >
              <base-thumbnail
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

          <v-dialog v-model="dialogAddQuestion" width="400">
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
              <v-card-title class="text-h5">Add question type</v-card-title>
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
        <v-container fluid class="px-1 px-lg-2">
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TheNavbarCreateQuiz from '~/components/navbar/TheNavbarCreateQuiz.vue'
import TheLoadingScreen from '~/components/TheLoadingScreen.vue'
import TheAlertNotification from '~/components/TheAlertNotification.vue'
import BaseThumbnail from '~/components/createQuesitonTemplate/BaseThumbnail.vue'
import BaseBtnQuestionType from '~/components/createQuesitonTemplate/BaseBtnQuestionType.vue'
export default {
  components: {
    TheNavbarCreateQuiz,
    draggable,
    TheLoadingScreen,
    TheAlertNotification,
    BaseThumbnail,
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
          text: 'True or False',
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
          value: 5000,
        },
        {
          text: '10 seconds',
          value: 10000,
        },
        {
          text: '15 seconds',
          value: 15000,
        },
        {
          text: '20 seconds',
          value: 20000,
        },
        {
          text: '30 seconds',
          value: 30000,
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
      dialogAddQuestion: false,
      dialogDelete: false,
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
      this.dialogAddQuestion = false
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
      this.dialogDelete = false
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
  background: var(--v-primary-darken3);
  border-radius: 50px;
}
.scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 8px;
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
  background: var(--v-primary-darken3);
  border-radius: 50px;
}
</style>
