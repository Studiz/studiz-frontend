<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :persistent="persistent"
    :max-width="maxwidth"
    @click:outside="close"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="btn-dialog-style"
        :height="height"
        :color="colorBTN"
        :outlined="outlined"
        :class="classBtn"
        v-bind="attrs"
        v-on="on"
        @click="$emit('open')"
      >
        <slot name="icon"></slot>
        <slot name="namebtn"></slot>
      </v-btn>
    </template>
    <v-card class="h-fit">
      <v-card-title>
        <span class="break-normal">
          <slot name="title"></slot>
        </span>
      </v-card-title>
      <slot name="contain"></slot>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="btn1" text class="!capitalize" @click="close">
          <slot name="btn1">close</slot>
        </v-btn>
        <v-btn :color="btn2" text @click="click2" type="submit">
          <slot name="btn2">confirm</slot>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    colorBTN: {
      type: String,
      default: 'primary',
    },
    classBtn: {
      type: String,
      default: 'rounded-lg !normal-case',
    },
    btn1: {
      type: String,
      default: 'primary',
    },
    btn2: {
      type: String,
      default: 'primary',
    },
    propDialog: {
      type: Boolean,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    maxwidth: {
      type: String,
      default: '400px',
    },
    forceOpen: {
      type: Boolean,
    },
    height: {
      type: String,
      default: '48',
    },
  },
  data() {
    return {
      dialog: false,
      arrayRouteName: ['create'],
    }
  },
  watch: {
    propDialog(val) {
      this.dialog = val
    },
  },
  methods: {
    close() {
      this.$emit('close-dialog')
      this.dialog = false
    },
    click2() {
      this.$emit('confirm')
      //กระทบหน้าอื่นก็เอาออก
      this.dialog = false
    },
  },
  mounted() {
    if (this.forceOpen) {
      this.dialog = true
    }
  },
  computed: {
    uniqueRouteName() {
      return this.arrayRouteName.includes(this.$route.name)
    },
  },
}
</script>

<style></style>
