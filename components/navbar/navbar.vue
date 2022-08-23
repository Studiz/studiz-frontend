<template>
  <div>
    <!-- TOP -->
    <div class="hidden md:inline-block">
      <v-app-bar
        fixed
        app
        flat
        class="drop-shadow-md"
        height="64"
        dense
        color="background"
      >
        <div class="container flex items-center justify-between">
          <v-btn
            height="50px"
            elevation="0"
            color="background"
            class="overflow-hidden"
            @click="goHomePage"
          >
            <v-icon size="80">$vuetify.icons.Studiz_logo</v-icon>
          </v-btn>
          <div class="flex items-center space-x-4">
            <v-spacer></v-spacer>
            <!-- right  -->
            <LightDarkMode />
            <v-menu offset-y left transition="slide-y-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  height="48"
                  rounded
                  v-on="on"
                  elevation="0"
                  class="!p-0 text-cap !min-w-[48px]"
                >
                  <v-avatar size="40px">
                    <v-icon large v-if="!user">mdi-account-circle</v-icon>
                    <v-icon large v-else-if="!user.imageUrl"
                      >mdi-account-circle</v-icon
                    >
                    <v-img v-else :src="user.imageUrl" />
                  </v-avatar>
                </v-btn>
              </template>
              <v-list v-if="!user">
                <v-list-item
                  v-for="item in route"
                  :key="item.to"
                  :to="item.to"
                  class="font"
                >
                  <v-icon>{{ item.icon }}</v-icon>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
              <v-list v-else>
                <v-list-item @click="logout" class="font">
                  <v-icon>mdi-logout</v-icon>Logout
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </v-app-bar>
    </div>

    <!-- Bottom -->
    <v-bottom-navigation
      grow
      fixed
      height="70"
      class="drop-shadow-md d-md-none background"
      active-class="primary--text"
      v-if="!isGuest"
    >
      <v-btn
        color="background"
        height="70"
        v-for="(b, index) in buttonNav"
        min-width="50"
        :key="index"
        v-show="userRole == 'TEACHER' ? index !== 1 : index !== 2"
        :to="b.to"
      >
        <span class="text-xs d-none d-sm-inline">{{ b.title }}</span>
        <v-icon>{{ b.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import LightDarkMode from './light-dark-mode.vue'
export default {
  components: { LightDarkMode },
  data() {
    return {
      route: [
        {
          title: 'Login',
          to: '/login',
        },
        {
          title: 'Sign up',
          to: '/signup',
        },
      ],
      buttonNav: [
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
          title: 'My library',
          icon: '$vuetify.icons.quiz',
          to: '/library',
        },
        {
          title: 'notification',
          icon: '$vuetify.icons.notification',
          to: '/notification',
        },
        {
          title: 'more',
          icon: '$vuetify.icons.more',
          to: '/more',
        },
      ],
    }
  },
  methods: {
    goHomePage() {
      if (this.user) {
        this.$router.push('/classrooms')
      } else {
        this.$router.push('/join')
      }
    },
    logout() {
      this.$fire.auth.signOut().then(() => {
        localStorage.clear('accessToken')
        localStorage.clear('user')
        this.$store.commit('SET_USER', null)
        this.$router.push('/join')
      })
    },
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    userRole() {
      return this.$store.getters.userRole
    },
    isGuest() {
      return this.$store.getters.user ? false : true
    },
  },
}
</script>
