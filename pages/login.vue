<template>
  <div>
    <v-container grid-list-xs>
      <h1>
        welcome <span v-if="currentUser">{{ currentUser.displayName }}</span>
      </h1>
    </v-container>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
