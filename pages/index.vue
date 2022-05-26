<template>
  <v-row>
    <v-col cols="0" md="1" lg="2" class="d-none d-md-block pr-xl-12">
      <v-sheet color="transparent">
        <v-list color="transparent" rounded class="pa-0">
          <v-list-item to="/profile" active-class="primary--text" class="px-2">
            <v-list-item-avatar color="primary" size="36px">
              <v-icon large color="white" v-if="!imageProfile">mdi-account-circle</v-icon>
              <v-img v-else :src="imageProfile" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-cap">{{displayName}}</v-list-item-title>
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
        <div
          v-if="this.$route.name === 'index' ? this.$store.getters.user?this.$router.push('/classrooms'):this.$router.push('/join') : ''"
        />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import userService from '../services/UserService'
export default {
  name: 'IndexPage',
  data() {
    return {
      isAuthenticated: false,
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
  computed: {
    user() {
      return this.$store.getters.user
    },
    imageProfile() {
      return this.$store.getters.user ? this.$store.getters.user.imageUrl : ''
    },
    displayName() {
      return this.$store.getters.user
        ? this.$store.getters.user.displayName
          ? this.$store.getters.user.displayName
          : `${this.$store.getters.user.firstName} ${this.$store.getters.user.lastName}`
        : ''
    },
  },
  created() {
    if (this.$store.getters.user || localStorage.getItem('accessToken')) {
      this.isAuthenticated = true
    } else {
      this.isAuthenticated = false
      this.$router.push('/join')
    }
  },
}
</script>