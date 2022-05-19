<template>
  <form
    @submit.prevent
    class="primary_shade rounded-lg grid grid-rows-2 md:grid-rows-1 grid-flow-col gap-2"
    :class="[this.$route.name == 'index-classrooms' ? 'p-2' : 'p-2 md:p-4']"
  >
    <input
      id="pincode"
      name="pincode"
      v-model="pincode"
      type="tel"
      class="p-2 w-full h-60px rounded-lg focus:outline-none text-H3 md:text-H2 bg-white dark:bg-dark_background"
      :class="[
        this.$route.name == 'index-classrooms'
          ? 'col-span-12 md:col-span-9'
          : 'col-span-12 ',
      ]"
      minlength="6"
      maxlength="6"
      :placeholder="[
        this.$route.name == 'index-classrooms'
          ? 'Enter a join classroom'
          : 'Enter a join qiuz',
      ]"
      autocomplete="off"
      @keypress="filterNumber(evt)"
    />
    <!-- <div class="w-full md:w-2/12"> -->
    <slot></slot>
    <v-btn
      hide-details
      inset
      height="60"
      color="primary"
      class="rounded-lg text-cap"
      :class="[
        this.$route.name == 'index-classrooms'
          ? 'w-full col-span-6 md:col-span-3'
          : 'w-full col-span-12',
      ]"
      :disabled="pincode.length !== 6"
      @click="join"
    >join</v-btn>
    <!-- </div> -->
  </form>
</template>

<script>
export default {
    props: {
        showInput: {
            type: Boolean,
        },
    },
    data() {
        return {
            pincode: '',
        }
    },
    methods: {
        filterNumber(evt) {
            evt = evt ? evt : window.event
            let expect = evt.target.value.toString() + evt.key.toString()
            if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
                evt.preventDefault()
            } else {
                return
            }
        },
        join() {
            this.$emit('join-number', this.pincode)
            console.log(this.$nuxt.$route.name)
        },
    },
}
</script>
