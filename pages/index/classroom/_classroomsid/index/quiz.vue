<template>
  <div>
    <v-row class="mt-2" no-gutters>
      <v-col
        cols="12"
        md="4"
        xl="3"
        v-for="classroom in 10"
        :key="classroom.name"
        class="pa-md-1 py-1"
      >
        <v-card flat rounded="lg" class="bg-gradient-to-r from-cyan-500 to-blue-500 white--text">
          <v-card-title class="w-full">
            <div class="text-h5 w-10/12 truncate">
              <span class="font-bold white--text">{{classroom.name}}</span>
            </div>
          </v-card-title>

          <v-card-subtitle
            class="h-24 overflow-auto scrollbar white--text"
          >{{classroom.description}}</v-card-subtitle>
          <v-card-text class="flex justify-between items-start white--text">{{classroom.teachName}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style>
</style>