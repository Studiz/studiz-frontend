<template>
  <span>
    <v-tooltip bottom v-if="showTooltip">
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on" :class="textClass">
          {{ timeToWords(formatDateForParse(time)) }}
        </span>
      </template>
      <span>{{ time }}</span>
    </v-tooltip>

    <span v-else class="cursor-default" :class="textClass">
      {{ timeToWords(formatDateForParse(time)) }}
    </span>
  </span>
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
