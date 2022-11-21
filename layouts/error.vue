<template>
  <div class="h-[clac(100vh-60px)]">
    <div v-if="error.statusCode === 404">
      <transition :name="isFristLoad ? '' : 'slide-fade'" mode="out-in">
        <lottie-player
          v-if="!isFristLoad"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-fit"
          autoplay
          loop
          src="https://assets6.lottiefiles.com/packages/lf20_u1xuufn3.json"
          style="width: 500px"
        />
      </transition>

      <h1>{{ pageNotFound }}</h1>
    </div>
    <h1 v-else>
      {{ otherError }}
    </h1>

    <NuxtLink to="/">
      <v-btn color="primary" class="mt-2">Home page</v-btn>
    </NuxtLink>
  </div>
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
      pageNotFound: 'Page Not Found',
      otherError: 'An error occurred',
      isFristLoad: true,
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  mounted() {
    setTimeout(() => {
      this.isFristLoad = false
    }, 500)
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
