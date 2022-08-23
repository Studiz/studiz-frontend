<template>
  <div v-if="this.$store.getters.userRole == 'TEACHER'">
    <div class="items-center justify-between space-y-2 md:flex md:space-y-0">
      <h1 class="text-H1">My library</h1>
      <!-- <base-dialog colorBTN="primary">
        <template #namebtn>create</template>
        <template #title>Change Your display name</template>
      </base-dialog> -->
      <base-dialog-condition colorBTN="primary">
        <template #namebtn>create</template>
        <template #title>Change Your display name</template>
      </base-dialog-condition>
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
