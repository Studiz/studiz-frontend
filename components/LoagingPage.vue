<template>
  <div
    :class="[
      renderIsLoading ? 'visible opacity-100' : 'invisible w-0 h-0 opacity-0',
    ]"
    class="cover-loading bg-white/50 dark:bg-black/50 backdrop-blur-sm block z-[99]"
  >
    <div class="w-full h-full lds-ring">
      <span class="dot" v-for="i in 4" :key="i" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    renderIsLoading() {
      return this.$store.state.isLoading
    },
  },
}
</script>

<style scoped>
.cover-loading {
  @apply fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring span {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  @apply dark:border-[#fff_transparent_transparent_transparent] border-[#0c8ce9_transparent_transparent_transparent];
}
.lds-ring span:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring span:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring span:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
