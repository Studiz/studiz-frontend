<template>
  <v-footer fixed color="transparent" padless>
    <div class="primary p-3 rounded-lg w-fit mx-auto my-5">
      <!-- <v-btn
          color="black"
          x-large
          icon
          class="rounded-lg shadow-[inset_0px_4px_0px_#374151] bg-gray-500"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn> -->

      <v-dialog transition="slide-y-reverse-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="black"
            x-large
            icon
            class="rounded-lg shadow-[inset_0px_4px_0px_#374151] bg-gray-500"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-card-title class="primary">
              <span class="break-normal">Inventory</span>
            </v-card-title>
            <v-card-text class="flex gap-3 flex-wrap pt-3">
              <base-item-add-time />
              <base-item-double-point />
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </v-footer>
</template>

<script>
import BaseItemAddTime from './BaseItemAddTime.vue'
import BaseItemDoublePoint from './BaseItemDoublePoint.vue'
export default {
  components: { BaseItemAddTime, BaseItemDoublePoint },
}
</script>

<style></style>
