<template>
  <v-row>
    <v-col class="text-center input-form">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      <button @click="loginwithGoogle" class="text-red-800 text-4xl">
        >Login with Google
      </button>
    </v-col>
  </v-row>
</template>

<script>
import firebase from '@nuxtjs/firebase'

export default {
  name: 'InspirePage',
  data() {
    return {}
  },
  methods: {
    loginwithGoogle() {},
  },
}
</script>

<style>
/* .web-theme {
  @apply bg-neutral dark:bg-dark_primary text-black dark:text-gray-100 transition-colors duration-300 ease-out;
}

.input-form {
  @apply py-3 px-5 md:px-10 mb-7 bg-orange-500;
} */
</style>
