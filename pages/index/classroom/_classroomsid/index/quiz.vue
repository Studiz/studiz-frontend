<template>
  <div>
    <div class="grid grid-cols-1 gap-2 mt-2 lg:grid-cols-3">
      <div v-for="classroom in 10" :key="classroom.name">
        <v-card
          flat
          rounded="lg"
          class="!border-0 bg-gradient-to-r from-cyan-500 to-blue-500 white--text w-full"
        >
          <v-card-title class="w-full">
            <div class="w-10/12 truncate text-h5">
              <span class="font-bold white--text">{{ classroom.name }}</span>
            </div>
          </v-card-title>
          <v-card-subtitle class="h-24 overflow-auto scrollbar white--text">{{
            classroom.description
          }}</v-card-subtitle>
          <v-card-text class="flex items-start justify-between white--text">{{
            classroom.teachName
          }}</v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style></style>
