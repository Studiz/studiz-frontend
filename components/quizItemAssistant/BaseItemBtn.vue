<template>
  <v-tooltip bottom class="wheel">
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" class="inline-flex flex-col gap-y-2 z-10">
        <v-btn
          :height="52"
          :width="52"
          icon
          class="relative ring-1 ring-black/10 rounded-lg self-center px-0"
          :class="
            isBtnLight ? 'bg-white' : 'background_card dark:ring-white/10'
          "
          @click="pickItem()"
        >
          <v-icon size="40" :color="color">{{ icon }}</v-icon>
        </v-btn>
        <div
          v-if="isShowName"
          class="text-center text-xs tracking-tighter line-clamp-2 w-16 h-8"
          :class="[
            isBtnLight ? 'sm:text-black' : '',
            isRouteLobby ? 'text-white' : '',
          ]"
        >
          {{ name }}
        </div>
      </div>
    </template>
    <span>{{ description }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'mdi-help',
    },
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'green',
    },
    isShowName: {
      type: Boolean,
      default: true,
    },
    isBtnLight: {
      type: Boolean,
    },
  },
  methods: {
    pickItem() {
      this.$emit('use-item')
    },
  },
  computed: {
    isRouteLobby() {
      return this.$route.name === 'lobby-quizId' ? true : false
    },
  },
}
</script>

<style></style>
