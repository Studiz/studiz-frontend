<template>
  <v-row>
    <v-col cols="0" md="1" lg="2" class="d-none d-md-block">
      <v-sheet color="transparent">
        <v-list color="transparent" rounded class="pa-0">
          <v-list-item to="/profile" class="px-2">
            <v-list-item-avatar color="primary" size="36px">
              <!-- <v-icon large color="white">mdi-account-circle</v-icon> -->
              <v-img src="https://api.lorem.space/image/face?hash=92310" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-cap">User</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-2"></v-divider>

          <div v-for="(page, index) in pages" :key="page.icon">
            <v-divider class="my-2" v-if="index == 3">{{index}}</v-divider>
            <v-list-item :to="page.to" link active-class="primary--text">
              <v-icon left class="-m-0.5 lg:m-0">{{ page.icon }}</v-icon>
              <v-list-item-content>
                <v-list-item-title class="text-cap">{{ page.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <!-- <v-divider class="my-2"></v-divider>

          <v-list-item link color="grey lighten-4">
            <v-list-item-content>
              <v-list-item-title>...</v-list-item-title>
            </v-list-item-content>
          </v-list-item>-->
        </v-list>
      </v-sheet>
    </v-col>

    <v-col cols="12" md="11" lg="10" class="pa-1 pa-md-3">
      <v-sheet
        min-height="70vh"
        rounded="lg"
        elevation="1"
        color="background"
        class="pa-2 pa-md-5 mb-16 overflow-hidden"
      >
        <Nuxt />
        <div v-if="this.$route.name === 'index' ? this.$router.push('/classrooms') : ''" />
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
          to: '/classrooms',
        },
        {
          title: 'join quiz',
          icon: '$vuetify.icons.quiz',
          to: '/quiz',
        },
        {
          title: 'notification',
          icon: '$vuetify.icons.notification',
          to: '/notification',
        },
        {
          title: 'setting',
          icon: '$vuetify.icons.setting',
          to: '/setting',
        },
        // {
        //   title: 'more',
        //   icon: '$vuetify.icons.more',
        //   to: '/more',
        // },
      ],
    }
  },
}
</script>
