<template>
  <v-app>
    <create-navbar
      :quizTitle="quizTitle"
      @edit-quiz-title="$emit('edit-quiz-title', $event)"
    />
    <v-navigation-drawer absolute bottom permanent app clipped width="192px">
      <v-list nav>
        <draggable v-model="numberArrary">
          <transition-group type="transition">
            <!-- <v-list-item-group> -->
            <v-list-item
              v-for="i in numberArrary"
              :key="i"
              class="transition-all duration-300 hover:primary_shade"
              @click="activeItem(i)"
              :class="{ primary_shade: i === selectedItem }"
            >
              <v-list-item-title>{{ i }}</v-list-item-title>
            </v-list-item>
            <!-- </v-list-item-group> -->
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
  },
  data() {
    return {
      selectedItem: 1,
      numberArrary: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      listQuizType: ['Single', 'Multiple', 'Trur/False', 'Poll', 'Sort'],
      selectQuizType: 'Single',
      listTimeLimit: [
        '5 seconds',
        '10 seconds',
        '15 seconds',
        '20 seconds',
        '30 seconds',
        '1 miniute',
        '2 miniutes',
        '3 miniutes',
        '4 miniutes',
        '5 miniutes',
      ],
      selectTimeLimit: '20 seconds',
    }
  },
  methods: {
    activeItem(item) {
      this.selectedItem = item
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
      this.numberArrary.push('add' + Math.floor(Math.random() * 100))
      this.$nuxt.$emit('changeTitle', 'Emit to EventBus')
      // this.$bus.$emit('changeTitle', 'Emit to EventBus')
    },
  },
  created() {},
}
</script>

<style></style>
