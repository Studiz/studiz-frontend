<template>
  <div>
    <div>
      <h1 class="text-H1 font-bold">{{ $route.params.classroomsid }}</h1>
      <p class="text-H3">description</p>
    </div>
    <div class="mb-4">
      <v-tabs fixed-tabs background-color="transparent">
        <v-tab
          :to="({
                name: 'index-classroom-classroomsid-index-quiz',
                params: { quiz: 'quiz' , classid: $route.params.classroomsid},
            })"
        >quiz</v-tab>
        <v-tab
          :to="({
                name: 'index-classroom-classroomsid-index-member',
                params: { member: 'member' , classid: $route.params.classroomsid},
            })"
        >member</v-tab>
      </v-tabs>
    </div>

    <Nuxt />
  </div>
</template>

<script>
export default {}
</script>

<style></style>
