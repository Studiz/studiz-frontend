<template>
  <v-alert
    @click="openAction"
    class="!p-3 md:!p-4"
    color="primary"
    icon="$vuetify.icons.quiz"
    :prominent="expanded"
    dark
  >
    <div class="flex gap-2" :class="expanded ? 'flex-row' : 'flex-col'">
      <div class="flex flex-col items-start justify-center text-left">
        <div class="inline-flex items-center gap-x-2 truncate">
          <span class="sm:text-xl">{{ title }}</span>
          <span class="w-1 h-1 bg-white/70 rounded-full" />
          <base-time-to-text
            textClass="text-sm"
            :time="time"
            :showTooltip="false"
          />
        </div>
        <span
          class="text-xs sm:text-base"
          :class="[expanded ? 'line-clamp-2' : 'line-clamp-3']"
        >
          {{ content }}
        </span>
      </div>
      <div class="inline-flex">
        <v-img
          contain
          class="self-center justify-self-center"
          :class="[expanded ? 'w-14 h-14 sm:w-20 sm:h-20' : 'w-20 max-h-32']"
          :src="image"
        />
      </div>

      <button
        @click.stop="expanded = !expanded"
        @blur="expanded = true"
        class="absolute right-3 transition-all flex justify-center items-center focus:outline-none w-7 h-7 p-0.5 bg-black/50 rounded-full"
        :class="[expanded ? 'top-6 sm:top-10' : 'top-3 rotate-180']"
      >
        <v-icon dark>mdi-chevron-down</v-icon>
      </button>

      <div class="w-7">
        <div class="w-7" />
      </div>
    </div>
  </v-alert>
</template>

<script>
import dateFormat from '~/plugins/date-format'
import BaseTimeToText from './BaseTimeToText.vue'
export default {
  components: { BaseTimeToText },
  mixins: [dateFormat],
  props: {
    title: {
      type: String,
      default: 'title',
    },
    time: {
      type: String,
      default: '21/10/2022, 00:54:18',
    },
    content: {
      type: String,
      default:
        'Praesent congue erat at massa. Nullam vel sem. Aliquam lorem ante dapibus',
    },
    image: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/1662862122512_085df103965f9888e1863338bfd62d7f.png?alt=media&token=4ede7562-dc1d-4688-a1de-109deef2c668',
    },
  },
  data() {
    return {
      expanded: true,
    }
  },
  methods: {
    openAction() {
      console.log('openAction')
    },
  },
}
</script>

<style scoped>
:deep(.v-alert__content) {
  @apply flex;
}

:deep(.v-responsive__sizer) {
  @apply pb-0 !transition-none;
}

:deep(.v-alert--prominent .v-alert__icon) {
  @apply min-w-[20px] h-5 sm:min-w-[36px] sm:h-9 md:min-w-[48px] md:h-12;
}

:deep(.v-icon) {
  @apply !mx-0;
}
:deep(.v-alert__wrapper) {
  @apply gap-3;
}
</style>
