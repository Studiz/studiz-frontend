<template>
  <div
    class="card-thumbnail group rounded-lg p-3 select-none overflow-hidden relative min-w-[184px] max-w-[192px] w-full space-y-2"
    :class="[itemActive === index && 'card-thumbnail--active']"
    @click="activeItem(index)"
  >
    <div class="text-xs font-semibold flex items-center gap-x-2">
      <span>{{ index + 1 }}</span>
      <span class="line-clamp-1">{{ mappingType }}</span>
      <v-spacer />
      <div
        class="flex absolute top-2 right-2 mt-[2px] rounded-full gap-x-1 transition-all"
        :class="
          isItemEqualIndex
            ? 'opacity-100'
            : 'group-hover:lg:opacity-100 lg:opacity-0'
        "
      >
        <v-btn icon x-small @click="duplicateQuestion" class="">
          <v-icon small>$vuetify.icons.duplicate</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              x-small
              v-bind="attrs"
              v-on="on"
              @click="dialog = true"
              :disabled="totalQuestion == 1 && index == 0"
            >
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="break-normal">Delete quiz question</span>
            </v-card-title>
            <v-card-text
              >Are you sure you want to delete this question?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined @click="cancel">cancel</v-btn>
              <v-btn type="submit" color="error" @click="deleteQuestion(index)"
                >delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-icon
        class="handle cursor-grabbing py-3 px-1 !absolute top-1/2 left-2 transform -translate-x-1/2 -translate-y-1/2 opacity-60"
        >mdi-drag-vertical</v-icon
      >
    </div>
    <div class="overflow-hidden line-clamp-1 text-xs h-4">
      {{ textQuestion }}
    </div>
    <div class="h-10 mx-auto w-fit">
      <img
        v-if="haveImage"
        :src="item.image"
        :alt="item.image"
        class="object-contain object-center h-full w-auto"
      />
      <div
        v-else
        class="h-10 w-10 outline outline-[0.5px] outline-gray-500/50"
      ></div>
    </div>
    <div v-if="item.type === 'true/false'" class="grid grid-cols-2 gap-1">
      <div
        v-for="(i, index) in 2"
        :key="i"
        class="outline outline-[0.5px] h-5 outline-gray-500/50 flex"
      >
        <div
          v-if="
            (item.answer == true && index == '0') ||
            (item.answer == false && index == '1')
          "
          class="h-2 w-2 rounded-full bg-green-500 my-auto"
        />
      </div>
    </div>
    <div v-else class="grid grid-cols-2 gap-1">
      <div
        v-for="(choice, index) in item.answer.options"
        :key="`${index}-${item}-${choice}`"
        class="outline outline-[0.5px] h-2 outline-gray-500/50"
      >
        <div
          v-if="choice.isCorrect == true"
          class="h-2 w-2 rounded-full bg-green-500"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    totalQuestion: {
      type: Number,
      required: true,
    },
    listQuizType: {
      type: Array,
      required: true,
    },
    itemActive: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    duplicateQuestion() {
      this.$emit('duplicate-question', this.index)
    },
    deleteQuestion(index) {
      this.$emit('delete-question', index)
      this.dialog = false
    },
    activeItem(index) {
      this.$emit('active-item', index)
    },
    cancel() {
      this.dialog = false
    },
  },
  computed: {
    textQuestion() {
      return this.item.question === '' ? 'Question' : this.item.question
    },
    mappingType() {
      const type = this.listQuizType.find(
        (item) => item.value === this.item.type
      )
      return type.text
    },
    haveImage() {
      return this.item.image !== '' ? true : false
    },
    isItemEqualIndex() {
      return this.itemActive === this.index ? true : false
    },
  },
}
</script>

<style scoped>
.card-thumbnail {
  background-color: var(--v-background-base);
  @apply border-2 dark:border-gray-500/50;
}
.card-thumbnail--active {
  background-color: var(--v-primary_shade-base);
  border-color: var(--v-primary-base) !important;
  @apply transition-all;
}
</style>
