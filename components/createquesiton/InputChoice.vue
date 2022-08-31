<template>
  <div class="p-2 rounded-lg flex transition-all" :class="classColor">
    <div class="self-center cursor-pointer">
      <v-icon
        v-if="correctChoice"
        color="white"
        class="p-2 bg-green-400 border-4 border-white rounded-full"
        >mdi-check-bold</v-icon
      >
      <div
        v-else
        class="p-2 bg-black/20 border-4 border-white rounded-full group"
      >
        <div class="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all">
          <v-icon color="white" class="w-">mdi-check-bold</v-icon>
        </div>
      </div>
    </div>

    <v-form
      ref="form"
      lazy-validation
      @submit.prevent="saveInputText"
      class="h-[128px] w-full flex items-center overflow-auto self-center"
    >
      <v-textarea
        light
        solo
        flat
        auto-grow
        rows="1"
        label="Add answer"
        background-color="transparent"
        v-model.trim="inputText"
        :rules="rules.nameRules"
        :counter="120"
        @blur="saveInputText"
      ></v-textarea>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    classColor: {
      type: String,
      default: 'blue',
    },
    correctChoice: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: {
        required: (v) => !!v || 'Required.',
        nameRules: [
          (v) => !!v || 'Required.',
          (v) =>
            (v && v.length <= 120) ||
            'Classroom name must be less than 120 characters',
        ],
      },
      inputText: null,
    }
  },
  methods: {
    saveInputText() {
      if (this.$refs.form.validate()) {
        console.log(this.inputText)

        this.$emit('save-input-text', { index: this.index, text: this.inputText })
      }
    },
  },
}
</script>

<style scoped>
.red {
  @apply !bg-red-200;
}
.yellow {
  @apply !bg-yellow-200;
}
.green {
  @apply !bg-green-200;
}
.blue {
  @apply !bg-sky-200;
}
</style>
