<template>
  <div
    class="primary_shade rounded-lg p-3 select-none overflow-hidden"
    @click="activeItem(index)"
  >
    <div class="text-sm font-semibold flex">
      <span>{{ index + 1 }} Quiz</span>
      <v-spacer />
      <v-btn icon x-small @click="duplicateQuestion">
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
    <div class="overflow-hidden line-clamp-1 text-xs">
      {{ item.question }}
    </div>
    <div class="h-10 mx-auto my-2 w-fit">
      <img
        v-if="item.image !== ''"
        :src="item.image"
        :alt="item.image"
        class="object-contain object-center h-full w-auto"
      />
      <div
        v-else
        class="h-10 w-10 outline outline-[0.5px] outline-gray-500/50"
      ></div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div
        v-for="(choice, index) in item.answer.options"
        :key="`${index}-${item}-${choice}`"
        class="outline outline-[0.5px] h-2 outline-gray-500/50"
      >
        <div
          v-if="choice.isCorrect == true"
          class="h-2 w-2 rounded-full bg-green-500"
        ></div>
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
}
</script>

<style></style>
