<template>
  <div class="pa-5">
    <div class="md:flex justify-between items-center">
      <h1 class="text-H1 font-bold">Classroom</h1>
      <v-btn
        height="50"
        color="primary"
        class="text-cap w-full md:w-auto rounded-lg"
        @click="showInput = !showInput"
        :showInput="showInput"
        v-show="!showInput"
        >join classroom</v-btn
      >
    </div>
    <v-expand-transition>
      <v-card
        v-show="showInput"
        color="transparent"
        flat
        hide-details
        class="w-full md:w-5/12 ml-auto mb-3"
      >
        <Input-join>
          <v-btn
            hide-details
            inset
            outlined
            height="60"
            color="secondary"
            class="rounded-lg text-cap"
            :class="[
              this.$route.name == 'index-classroom' ? 'w-full col-span-6' : '',
            ]"
            @click="cancel()"
          >
            cancel</v-btn
          >
        </Input-join>
      </v-card>
    </v-expand-transition>
    <v-row :class="[showInput ? '' : 'mt-1']">
      <v-col cols="12" md="4">
        <v-card height="100" class="secondary"></v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100" class="secondary"></v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100" class="secondary"></v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInput: false,
      color: [
        { color1: '', color2: '' },
        { color1: '', color2: '' },
        { color1: '', color2: '' },
      ],
    }
  },
  methods: {
    cancel() {
      this.showInput = !this.showInput
    },
  },
}
</script>

<style></style>
