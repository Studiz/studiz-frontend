<template>
  <div class="rounded-lg ring-1 ring-black ring-opacity-10">
    <v-alert
      color="background"
      class="!p-3 mb-3 cursor-pointer w-full transition-all rounded-lg custom-icon"
    >
      <div class="inline-flex self-start">
        <v-img
          contain
          content-class="ring-1 ring-black ring-opacity-10 !rounded-lg"
          class="self-center justify-self-center background_card transition-all duration-500 p-px rounded-lg overflow-hidden"
          :class="[expanded ? 'w-14 h-14' : 'w-20 h-20']"
          :src="image"
        />
      </div>

      <div class="flex gap-2 flex-wrap overflow-hidden">
        <div class="flex flex-col items-start justify-center text-left gap-x-2">
          <div class="inline-flex items-end gap-x-2 truncate">
            <span class="sm:text-xl">Quiz name</span>
            <span
              class="w-1 h-1 bg-black dark:bg-white/70 rounded-full self-center"
            />
            <span class="hidden sm:inline">Start :</span>
            <base-time-to-text :time="dateTime" />
          </div>
          <span
            class="text-xs sm:text-base"
            :class="[expanded ? 'line-clamp-1' : '']"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            cum quod autem saepe! Eius nesciunt rem, amet ipsam numquam veniam
            nihil in neque, dignissimos modi aperiam. Ullam natus repellat
            quibusdam? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Est voluptatem laborum illum, labore officia repellendus architecto
            suscipit atque fugit? Dignissimos sit odio recusandae velit iste
            rerum quas molestiae consectetur error?
          </span>
        </div>

        <button
          @click.stop="expanded = !expanded"
          class="absolute right-3 transform transition-all flex justify-center items-center focus:outline-none w-7 h-7 p-0.5 bg-black/50 rounded-full"
          :class="[expanded ? 'top-6 sm:top-7' : 'rotate-180 top-3']"
        >
          <v-icon dark>mdi-chevron-down</v-icon>
        </button>
      </div>
      <div class="w-7">
        <div class="w-7" />
      </div>
    </v-alert>
  </div>
</template>

<script>
import dateFormat from '~/plugins/date-format'
import BaseTimeToText from './BaseTimeToText.vue'
export default {
  components: { BaseTimeToText },
  mixins: [dateFormat],
  props: {},
  data() {
    return {
      expanded: true,
      image: 'https://picsum.photos/200/300',
      dateTime: '2021-08-01 12:00:00',
    }
  },
  methods: {},
}
</script>

<style scoped>
:deep(.v-alert__content) {
  @apply flex gap-3 overflow-hidden;
}

:deep(.v-responsive__sizer) {
  @apply pb-0 !transition-none;
}

:deep(.v-alert__icon) {
  @apply !min-w-[20px] !h-5 sm:!min-w-[32px] sm:!h-8 md:!min-w-[48px] md:!h-12;
}

:deep(.v-icon) {
  @apply !mx-0;
}
:deep(.v-alert__wrapper) {
  @apply gap-3;
}
</style>
