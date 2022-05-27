<template>
  <v-dialog v-model="dialog" scrollable max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn :color="colorBTN" outlined class="text-cap" v-bind="attrs" v-on="on" height="48">
        <slot name="icon"></slot>
        <slot name="namebtn"></slot>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="break-normal">
          <slot name="title"></slot>
        </span>
      </v-card-title>
      <slot name="contain"></slot>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="btn1" text @click="click1">
          <slot name="btn1">close</slot>
        </v-btn>
        <v-btn :color="btn2" text @click="click2">
          <slot name="btn2">confirm</slot>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    colorBTN: { String },
    btn1: { String },
    btn2: { String },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    click1() {
      this.dialog = false
    },
    click2() {
      this.$emit('confirm')
      this.dialog = false
    },
  },
}
</script>

<style>
</style>