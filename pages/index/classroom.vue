<template>
  <div class="pa-5">
    <div class="md:flex justify-between items-center mb-1">
      <h1 class="text-H1 font-bold">Classroom</h1>
      <v-btn
        height="50"
        color="primary"
        class="text-cap w-full md:w-auto rounded-lg"
        :class="[showInput ? 'd-none d-md-block' : '']"
        @click="showInput = !showInput"
        :showInput="showInput"
        >join classroom</v-btn
      >
    </div>
    <v-expand-transition>
      <v-card
        v-show="showInput"
        color="transparent"
        flat
        hide-details
        class="w-full md:w-6/12 lg:w-4/12 ml-auto mb-3"
      >
        <Input-join>
          <v-btn
            hide-details
            inset
            height="60"
            color="white"
            class="rounded-lg text-cap d-md-none"
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
    <v-row class="mt-2" no-gutters>
      <v-col cols="12" md="4" v-for="i in 5" :key="i" class="pa-md-1 py-1">
        <v-card
          flat
          rounded="lg"
          height="150"
          class="bg-gradient-to-r from-cyan-500 to-blue-500"
        ></v-card>
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
