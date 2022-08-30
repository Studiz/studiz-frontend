<template>
  <v-app>
    <create-navbar
      :quizTitle="quizTitle"
      @edit-quiz-title="$emit('edit-quiz-title', $event)"
    />
    <v-navigation-drawer absolute bottom permanent app clipped width="192px">
      <v-list nav>
        <draggable v-model="dataQuestion">
          <transition-group type="transition" class="space-y-2">
            <div
              v-for="(item, index) in dataQuestion"
              :key="`${index}-${item}`"
              class="transition-all duration-300 hover:primary_shade rounded-lg p-2"
              @click="activeItem(index)"
              :class="{ primary_shade: index === currentQuesiton }"
            >
              <div>{{ item }}</div>
            </div>
          </transition-group>
        </draggable>
        <v-list-item-group class="pt-2">
          <v-list-item
            class="text-center transition-all duration-300 primary white--text"
            @click="addQuestion"
          >
            <v-list-item-title>Add question</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer absolute bottom permanent app clipped right>
      <v-list class="!py-4 !px-2">
        <v-list-item-group>
          <!-- <v-list-item> -->
          <v-list-item-title class="overflow-visible">
            <v-select
              :items="listQuizType"
              v-model="selectQuizType"
              label="Quiz type"
              dense
              outlined
              @change="changeQuizType"
            >
            </v-select>
            <v-select
              :items="listTimeLimit"
              v-model="selectTimeLimit"
              label="Time limit"
              dense
              outlined
              @change="chanceTimeLimit"
            >
            </v-select>
          </v-list-item-title>
          <!-- </v-list-item> -->
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
export default {
  components: { createNavbar, draggable },
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
      default: 0,
    },
  },
  data() {
    return {
      listQuizType: [
        {
          text: 'Single choice',
          value: 'single',
        },
        {
          text: 'Multiple choice',
          value: 'multiple',
        },
        {
          text: 'Trur/False',
          value: 'true/false',
        },
        {
          text: 'Poll',
          value: 'poll',
        },
        {
          text: 'Sort',
          value: 'sort',
        },
        ,
      ],
      selectQuizType: {
        text: 'Single choice',
        value: 'single',
      },
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
      selectTimeLimit: {
        text: '20 seconds',
        value: 2000,
      },
    }
  },
  methods: {
    activeItem(index) {
      this.$emit('active-item', index)
    },
    changeQuizType(event) {
      console.log(event)
    },
    chanceTimeLimit(event) {
      console.log(event)
    },
    test(text) {
      console.log(text)
    },
    addQuestion() {
      this.$emit('add-question')
    },
  },
  created() {},
}
</script>

<style></style>
