<template>
  <div>
    <v-app-bar
      fixed
      app
      flat
      class="drop-shadow-md"
      height="60"
      dense
      color="background"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <light-dark-mode />
          <v-spacer></v-spacer>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import lightDarkMode from './light-dark-mode.vue'
export default {
  components: { lightDarkMode },
}
</script>

<style></style>
