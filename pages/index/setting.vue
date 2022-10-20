<template>
  <div>
    <h1 class="text-H1">Setting</h1>

    <v-divider class="my-5" />

    <v-list color="transparent" rounded class="pa-0">
      <v-list-item link class="px-3" @click="clickTheme">
        <v-icon size="36px" color="primary" left class="mr-4"
          >{{ this.$store.getters.themeIcon }}
        </v-icon>

        <v-list-item-content>
          <v-list-item-title class="text-cap d-flex items-center">
            theme: {{ this.$store.getters.themeName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: 'Setting',
    }
  },
  methods: {
    clickTheme() {
      document.getElementById('theme').click()
    },
  },
}
</script>

<style></style>
