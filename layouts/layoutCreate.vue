<template>
  <v-app>
    <create-navbar />
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import createNavbar from '~/components/navbar/createNavbar.vue'
export default {
  components: { createNavbar },
}
</script>

<style></style>
