<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <button
        v-bind="attrs"
        v-on="on"
        class="relative rounded-lg bg-white w-16 h-16"
      >
        <v-icon size="52" class="!text-orange-400"
          >mdi-numeric-2-circle-outline</v-icon
        >
        <span
          class="absolute bottom-1 left-2 font-bold bg-white px-1 rounded-full !text-orange-400"
          >X
        </span>
      </button>
    </template>
    <span>point X2</span>
  </v-tooltip>
</template>

<script>
export default {}
</script>

<style></style>
