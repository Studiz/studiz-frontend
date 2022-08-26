<template>
  <v-app-bar
    fixed
    app
    flat
    class="drop-shadow-md"
    height="60"
    dense
    clipped-left
    clipped-right
    color="background_card"
  >
    <div class="flex items-center justify-between gap-x-2">
      <v-btn
        height="50px"
        elevation="0"
        color="transparent"
        class="overflow-hidden"
        @click="goHomePage"
        to="/"
      >
        <v-icon size="80">$vuetify.icons.Studiz_logo</v-icon>
      </v-btn>
      <v-spacer />
      <light-dark-mode class="!h-9 !w-9" />
      <v-btn outlined disabled>
        <v-icon left>mdi-eye-outline</v-icon>
        preview
      </v-btn>
      <v-divider vertical class="h-4 mx-2" />
      <v-btn outlined>exit</v-btn>
      <v-btn color="primary">save</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import lightDarkMode from './light-dark-mode.vue'
export default {
  components: { lightDarkMode },
}
</script>

<style></style>
