<template>
  <div class="inline-flex loading dark:loading text-right" :class="classFont">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Waiting Host',
    },
    classFont: {
      type: String,
      default: 'text-4xl font-bold',
    },
  },
}
</script>

<style scoped>
.loading:after {
  content: ' .';
  animation: dotsLight 1s steps(5, end) infinite;
}

.dark .dark\:loading:after {
  content: ' .';
  animation: dotsDark 1s steps(5, end) infinite;
}

@keyframes dotsLight {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: black;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 black, 0.5em 0 0 black;
  }
}

@keyframes dotsDark {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: white;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 white;
  }
}
</style>
