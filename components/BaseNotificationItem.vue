<template>
  <div class="rounded-lg ring-1 ring-black ring-opacity-10">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-alert
          @click="dialog = true"
          v-bind="attrs"
          v-on="on"
          color="background"
          icon="$vuetify.icons.quiz"
          class="!p-3 md:!p-4 mb-3 cursor-pointer w-full transition-all rounded-lg custom-icon"
          :class="notification.isRead ? 'custom-icon' : ''"
          :prominent="true"
        >
          <div
            class="flex justify-between gap-2 overflow-hidden"
            :class="[
              expanded ? 'flex-row max-h-14' : 'flex-col',
              notification.isRead ? 'isRead' : 'new',
            ]"
          >
            <div class="min-w-[0vw] max-w-[100vw] my-auto overflow-hidden">
              <div
                class="truncate pl-2"
                :class="[notification.isRead ? 'isRead' : 'font-bold new']"
              >
                <span class="sm:text-xl">
                  {{ notification.title }}
                </span>
                <span>•</span>
                <base-time-to-text
                  textClass="text-sm "
                  :time="notification.startAt"
                  :showTooltip="false"
                />
              </div>
              <span
                class="text-xs sm:text-base font-light pl-2"
                :class="[expanded ? 'line-clamp-1' : 'line-clamp-3']"
              >
                In classroom
                <span class="font-medium">
                  {{ notification?.classroomName }}</span
                >
              </span>
            </div>

            <div class="inline-flex gap-x-2">
              <v-img
                contain
                content-class="ring-1 ring-black ring-opacity-10 !rounded-lg"
                class="self-center justify-self-center background_card transition-all duration-500 p-px rounded-lg overflow-hidden"
                :class="[expanded ? 'w-14 h-14' : 'w-20 h-20']"
                :src="notification.image"
              />

              <button
                icon
                @click.stop="closeNotification"
                class="transition-all inline-flex justify-center self-center items-center focus:outline-none w-7 h-7 p-0.5 bg-black/30 dark:bg-white/30 rounded-full hover:ring ring-0"
              >
                <v-icon dark>mdi-close</v-icon>
              </button>
            </div>
          </div>
        </v-alert>
      </template>
      <v-card>
        <v-card-title class="!break-normal">
          <span>Are you sure to join quiz "</span>
          <span class="text--primary font-semibold">
            {{ notification.title }}
          </span>
          <span>"</span>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            class="!capitalize"
            @click="dialog = false"
            >close
          </v-btn>
          <v-btn color="primary" text @click="openAction">Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import BaseTimeToText from './BaseTimeToText.vue'
import UserService from '~/services/UserService.js'

export default {
  components: { BaseTimeToText },
  props: {
    notification: {
      type: Object,
      default: {
        title: '',
        time: '',
        content: '',
        image: '',
        isRead: false,
      },
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      expanded: true,
      dialog: false,
    }
  },
  methods: {
    openAction() {
      UserService.readNotification(this.notification.id)
        .then(() => {
          this.$store.commit('READED_NOTIFICATION', this.index)
          this.$router.push({
            name: 'lobby-quizId',
            params: { quizId: this.notification.quizId },
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    closeNotification() {
      UserService.deleteNotification(this.notification.id)
        .then(() => {
          this.$store.commit('DELETE_NOTIFICATION', this.index)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped>
:deep(.v-alert__content) {
  @apply flex overflow-hidden;
}

:deep(.v-responsive__sizer) {
  @apply pb-0 !transition-none;
}

:deep(.v-alert__icon) {
  @apply !min-w-[20px] !w-5 !h-5 sm:!min-w-[32px] sm:!h-8 md:!min-w-[48px] md:!h-12;
}

:deep(.v-icon) {
  @apply !mx-0;
}

:deep(.v-alert__wrapper) {
  @apply gap-3;
}

.new {
  @apply !text-black dark:!text-white;
}
.isRead {
  @apply !text-black/50 dark:!text-white/50;
}

.custom-icon > .v-alert__wrapper > .v-alert__icon {
  @apply opacity-50;
}
</style>
