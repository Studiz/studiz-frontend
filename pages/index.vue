<template>
  <v-row>
    <v-col cols="1" lg="2" class="hidden md:inline-block">
      <v-sheet rounded="lg">
        <v-list>
          <v-list-item v-for="page in pages" :key="page" link>
            <v-icon left>{{ page.icon }}</v-icon>
            <v-list-item-content>
              <v-list-item-title class="text-cap-btn flex items-center">
                {{ page.title }}
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

    <v-col cols="11" lg="12">
      <v-sheet min-height="70vh" rounded="lg"> </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      pages: [
        { title: 'classroom', icon: '$vuetify.icons.classroom' },
        { title: 'quiz', icon: '$vuetify.icons.quiz' },
        { title: 'notification', icon: '$vuetify.icons.notification' },
        { title: 'more', icon: '$vuetify.icons.more' },
      ],
    }
  },
}
</script>
