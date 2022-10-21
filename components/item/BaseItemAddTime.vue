<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <button
        v-bind="attrs"
        v-on="on"
        class="relative rounded-lg bg-white w-16 h-16"
      >
        <v-icon size="52" class="!text-green-400"
          >mdi-timer-plus-outline</v-icon
        >
      </button></template
    >
    <span>add time 2m</span>
  </v-tooltip>
</template>

<script>
export default {}
</script>

<style></style>
