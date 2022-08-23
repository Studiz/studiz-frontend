<template>
  <div v-if="this.$store.getters.userRole == 'TEACHER'">
    <div class="items-center justify-between md:flex md:space-y-0">
      <h1 class="text-H1">My library</h1>
      <base-dialog-condition colorBTN="primary">
        <template #namebtn>create</template>
        <template #title>Create quiz</template>
        <template #btn2>create</template>
      </base-dialog-condition>
    </div>
    <v-divider class="my-5"></v-divider>
    <div class="grid grid-cols-1 gap-y-3">
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
import BaseDialogCondition from '~/components/BaseDialogCondition.vue'
export default {
  components: { BaseDialogCondition },
  data() {
    return {}
  },
}
</script>

<style></style>
