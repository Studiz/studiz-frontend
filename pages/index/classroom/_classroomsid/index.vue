<template>
  <div>
    <div>
      <h1 class="text-H1 font-bold">{{ $route.params.classroomsid }}</h1>
      <p class="text-H3">description</p>
    </div>
    <div class="grid grid-rows-1 grid-cols-2 gap-2">
      <nuxt-link
        :to="({
                name: 'index-classroom-classroomsid-index-quiz',
                params: { quiz: 'quiz' , classid: $route.params.classroomsid},
            })"
      >
        <v-btn color="primary" class="text-cap w-full">quiz</v-btn>
      </nuxt-link>
      <nuxt-link
        :to="({
                name: 'index-classroom-classroomsid-index-member',
                params: { member: 'member' , classid: $route.params.classroomsid},
            })"
      >
        <v-btn color="primary" class="text-cap w-full">member</v-btn>
      </nuxt-link>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {}
</script>

<style></style>
