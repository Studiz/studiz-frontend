<template>
  <v-app>
    <create-navbar
      :quizTitle="quizTitle"
      @edit-quiz-title="$emit('edit-quiz-title', $event)"
    />
    <v-navigation-drawer absolute bottom permanent app clipped width="192px">
      <v-list nav>
        <draggable
          v-bind="dragOptions"
          v-model="newDataQuestion"
          @end="changeOrdering"
        >
          <transition-group type="transition" class="space-y-2">
            <thumbnail
              :class="[
                index === currentQuesiton ? 'primary_shade' : 'background',
              ]"
              v-for="(item, index) in newDataQuestion"
              :key="`${index}-${item}`"
              :item="item"
              :index="index"
              @active-item="activeItem"
              @delete-question="deleteQuestion"
              @duplicate-question="duplicateQuestion"
            />
          </transition-group>
        </draggable>
        <v-divider class="my-2" />
        <v-btn
          height="48"
          class="text-center primary white--text rounded-lg w-full transition-all"
          @click="addQuestion"
        >
          <v-icon left>mdi-plus</v-icon>
          <span>Add question</span>
        </v-btn>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer absolute bottom permanent app clipped right>
      <v-list class="!py-4 !px-2">
        <v-list-item-group :key="currentQuesiton">
          <v-list-item-title class="overflow-visible space-y-5">
            <v-select
              class="class--selection"
              :items="listQuizType"
              v-model="selectQuizType"
              label="Quiz type"
              dense
              outlined
              hide-details
              @change="changeQuizType"
            >
            </v-select>
            <span
              v-show="selectQuizType.value == 'multiple'"
              class="whitespace-pre-wrap"
              >*Required more than one correct choice</span
            >
            <v-select
              :items="listTimeLimit"
              v-model="selectTimeLimit"
              label="Time limit"
              dense
              outlined
              hide-details
              @change="chanceTimeLimit"
            >
            </v-select>
          </v-list-item-title>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid> <slot /> </v-container>
    </v-main>
  </v-app>
</template>

<script>
import draggable from 'vuedraggable'
import createNavbar from '~/components/navbar/createNavbar.vue'
import Thumbnail from './Thumbnail.vue'
export default {
  components: { createNavbar, draggable, Thumbnail },
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
          text: 'Trur/False',
          value: 'true/false',
          disabled: true,
        },
        {
          text: 'Poll',
          value: 'poll',
          disabled: true,
        },
        {
          text: 'Sort',
          value: 'sort',
          disabled: true,
        },
        ,
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
      // renderComponent: true,
    }
  },
  watch: {
    currentQuesiton() {
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
    addQuestion() {
      this.$emit('add-question')
    },
    changeOrdering(event) {
      this.$emit('change-ordering', this.newDataQuestion)
      this.activeItem(event.newIndex)
    },
    mappingQuestion() {
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
  },
  computed: {},
  mounted() {},
  created() {
    this.newDataQuestion = this.dataQuestion
    this.selectItem = this.currentQuesiton
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
  @apply !text-light_primary dark:!text-dark_primary;
}
</style>
