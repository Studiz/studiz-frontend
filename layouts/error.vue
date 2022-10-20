<template>
  <v-app dark class=" fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
    <lottie-player
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      autoplay
      loop
      src="https://assets4.lottiefiles.com/packages/lf20_lycfpytx.json"
      style="width: 500px"
    />
    <!-- <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1> -->
    <NuxtLink to="/" class="z-50"> Home page </NuxtLink>
  </v-app>
</template>

<script>
import '@lottiefiles/lottie-player'
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
