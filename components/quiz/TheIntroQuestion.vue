<template>
  <div
    class="h-[calc(100vh-calc(24px+60px))] flex flex-col justify-center items-center gap-2 pb-28"
  >
    <!-- <div class="inline-flex justify-between gap-3 w-full"> -->
    <div class="text-sm sm:text-lg font-light text-left self-start">
      <span class="font-semibold">Question type : </span>
      <span class="capitalize">{{ renderQuestionType }}</span>
    </div>
    <div class="text-sm sm:text-lg font-light text-left self-start">
      <span class="font-semibold">Time : </span>
      <span>{{ renderLimitTime }}</span>
    </div>
    <!-- </div> -->

    <base-question-text :question="questionText" class="w-full text-center">
      <div
        id="question-timer"
        class="absolute bottom-0 left-0 h-1 secondary transition-all ease-linear rounded-r-full opacity-100"
        :class="
          isTimerToShowQuestion !== null
            ? isTimerToShowQuestion
              ? 'w-full'
              : 'w-0'
            : 'w-full'
        "
        :style="{ 'transition-duration': introQuestionTime + 'ms' }"
      />
    </base-question-text>

    <the-items-inventory
      v-if="$store.getters.userRole == 'STUDENT'"
      :propPickedItemList="renderPickedItemList"
    />
  </div>
</template>

<script>
import TheItemsInventory from '../item/TheItemsInventory.vue'
import BaseQuestionText from './BaseQuestionText.vue'
export default {
  components: { BaseQuestionText, TheItemsInventory },
  props: {
    questionText: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      required: true,
    },
    questionLimitTime: {
      type: Number,
      required: true,
    },
    isTimerToShowQuestion: {
      type: Boolean | null,
      default: null,
    },
    introQuestionTime: {
      type: Number,
      required: true,
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
          text: 'Trur or False',
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
      ],
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
    }
  },
  computed: {
    renderPickedItemList() {
      return this.$store.getters.items
    },
    renderQuestionType() {
      return this.listQuizType.find((item) => item.value === this.questionType)
        .text
    },
    renderLimitTime() {
      let findTime = this.listTimeLimit.find(
        (item) => item.value === this.questionLimitTime
      )
      if (findTime) {
        return findTime.text
      } else {
        return this.questionLimitTime / 1000 + ' seconds'
      }
    },
  },
}
</script>

<style></style>
