<template>
  <div>
    <div>
      <h1 class="text-H1 font-bold">{{ $route.params.classroomsid }}</h1>
      <p class="text-H3">description</p>
    </div>
    <div class="mb-4">
      <v-tabs fixed-tabs height="60" icons-and-text background-color="transparent">
        <v-tab
          :to="({
                name: 'index-classroom-classroomsid-index-quiz',
                params: { classid: $route.params.classroomsid},
            })"
        >
          <span class="text-cap">quiz</span>
          <v-icon>$vuetify.icons.quiz</v-icon>
        </v-tab>
        <v-tab
          :to="({
                name: 'index-classroom-classroomsid-index-member',
                params: { classid: $route.params.classroomsid},
            })"
        >
          <span class="text-cap">member</span>
          <v-icon>$vuetify.icons.member</v-icon>
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
