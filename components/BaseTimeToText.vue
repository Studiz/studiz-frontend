<template>
  <div>
    <v-tooltip bottom v-if="showTooltip">
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on" :class="textClass">
          {{ timeToWords(formatDateForTimeAgo(time)) }}
        </span>
      </template>
      <span>{{ time }}</span>
    </v-tooltip>
    <div v-else>
      <span class="cursor-default" :class="textClass">
        {{ timeToWords(formatDateForTimeAgo(time)) }}
      </span>
    </div>
  </div>
</template>

<script>
import dateFormat from '~/plugins/date-format'
export default {
  mixins: [dateFormat],
  props: {
    time: {
      type: String,
      required: true,
    },
    showTooltip: {
      type: Boolean,
      default: true,
    },
    textClass: {
      type: String,
    },
  },
}
</script>

<style></style>
