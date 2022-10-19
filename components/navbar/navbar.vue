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
        color="background_card"
      >
        <div class="container flex items-center justify-between">
          <v-btn
            height="50px"
            elevation="0"
            color="transparent"
            class="overflow-hidden"
            :to="routerPath"
            :disabled="isRouterJoin"
          >
            <v-icon size="80">$vuetify.icons.Studiz_logo</v-icon>
          </v-btn>
          <div class="flex items-center gap-x-4">
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
      height="64"
      class="drop-shadow-md d-md-none background_card"
      active-class="primary--text text-hidden"
      v-if="!isGuest"
    >
      <v-btn
        color="background_card"
        height="64"
        v-for="(b, index) in buttonNav"
        min-width="50"
        :key="index"
        v-show="userRole == 'TEACHER' ? index !== 1 : index !== 2"
        :to="b.to"
      >
        <span class="text text-xs tracking-tight normal-case"
          >{{ b.title }}
        </span>
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
          title: 'Classroom',
          icon: '$vuetify.icons.classroom',
          to: '/classrooms',
        },
        {
          title: 'Join quiz',
          icon: '$vuetify.icons.quiz',
          to: '/joinquiz',
        },
        {
          title: 'My library',
          icon: '$vuetify.icons.quiz',
          to: '/library',
        },
        {
          title: 'Notification',
          icon: '$vuetify.icons.notification',
          to: '/notification',
        },
        {
          title: 'More',
          icon: '$vuetify.icons.more',
          to: '/more',
        },
      ],
    }
  },
  methods: {
    logout() {
      this.$fire.auth.signOut().then(() => {
        localStorage.clear('accessToken')
        localStorage.clear('user')
        localStorage.clear('userId')
        this.$store.commit('setUser', null)
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
    isRouterJoin() {
      return this.$route.path == '/join' && this.isGuest ? true : false
    },
    routerPath() {
      return !this.isGuest ? '/classrooms' : '/join'
    },
  },
}
</script>

<style scoped>
.v-btn--active::before {
  opacity: 0;
}
:deep(.v-btn.v-btn--disabled.v-btn--has-bg) {
  background-color: transparent !important;
}

:deep(.text-hidden > .v-btn__content > .text) {
  @apply w-auto h-auto visible opacity-100;
}
:deep(.v-btn__content) {
  @apply gap-1;
}
.text {
  @apply w-0 h-0 invisible opacity-0 sm:w-auto sm:h-auto sm:visible sm:opacity-100;
}
</style>
