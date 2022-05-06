<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      <button @click="loginwithGoogle" class="text-red-800 text-9xl">>Login with Google</button>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "@nuxtjs/firebase";

export default {
  name: 'InspirePage',
  data() {
    return {
      
    }
  },
  methods: {
    loginwithGoogle(){

    }
  },
}
</script>
