<template>
  <v-row>
    <v-col cols="0" md="1" lg="2" class="d-none d-lg-block">
      <v-sheet class="rounded-lg">
        <v-list color="background" class="rounded-lg">
          <v-list-item
            v-for="page in pages"
            :key="page.icon"
            :to="page.to"
            link
          >
            <v-icon left class="-m-0.5 lg:m-0">{{ page.icon }}</v-icon>
            <v-list-item-content>
              <v-list-item-title class="text-cap-btn items-center">
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

    <v-col cols="12" md="11" lg="10">
      <v-sheet min-height="70vh" rounded="lg" color="background">
        <Nuxt />
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
        {
          title: 'classroom',
          icon: '$vuetify.icons.classroom',
          to: '/classroom',
        },
        { title: 'quiz', icon: '$vuetify.icons.quiz', to: '/quiz' },
        {
          title: 'notification',
          icon: '$vuetify.icons.notification',
          to: '/notification',
        },
        // { title: 'more', icon: '$vuetify.icons.more' },
      ],
    }
  },
  created() {
    this.$router.push('/classroom')
  },
}
</script>
