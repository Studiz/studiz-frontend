<template>
  <v-row>
    <v-col cols="12" md="2">
      <v-sheet rounded="lg">
        <v-list color="transparent">
          <v-list-item v-for="page in pages" :key="page" link>
            <v-list-item-content>
              <v-icon>{{ page.icon }}</v-icon>
              <v-list-item-title class="text-cap-btn"
                >{{ page.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item link color="grey lighten-4">
            <v-list-item-content>
              <v-list-item-title> Refresh </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col cols="12" md="10">
      <v-sheet min-height="70vh" rounded="lg">
        <!--  -->
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      pages: [
        { title: 'classroom', icon: 'mdi-' },
        { title: 'quiz', icon: 'mdi-' },
        { title: 'notification', icon: 'mdi-' },
      ],
    }
  },
}
</script>
