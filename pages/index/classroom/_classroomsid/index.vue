<template>
  <div>
    <div>
      <h1 class="text-H1">{{ $route.params.classroomsid }}</h1>
      <p class="text-H3">description</p>
    </div>
    <div class="mb-4">
      <v-tabs grow background-color="transparent">
        <v-tab
        
          :to="({
                name: 'index-classroom-classroomsid-index-quiz',
                params: { classid: $route.params.classroomsid},
            })"
        >
          <v-icon left>$vuetify.icons.quiz</v-icon>
          <span class="text-cap">quiz</span>
        </v-tab>
        <v-tab
        
          :to="({
                name: 'index-classroom-classroomsid-index-member',
                params: { classid: $route.params.classroomsid},
            })"
        >
          <v-icon left>$vuetify.icons.member</v-icon>
          <span class="text-cap">member</span>
        </v-tab>
      </v-tabs>
    </div>

    <Nuxt />
  </div>
</template>

<script>
export default {}
</script>

<style></style>
