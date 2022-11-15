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
            <base-button-light-dark-mode />
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
    <transition name="slide-fade" mode="out-in">
      <v-bottom-navigation
        grow
        fixed
        height="64"
        class="drop-shadow-md d-md-none background_card"
        active-class="primary--text"
        v-if="!isRouterHidden"
        shift
      >
        <v-btn
          color="background_card"
          height="64"
          v-for="(page, index) in renderNavDependOnRole"
          min-width="50"
          :key="index"
          :to="page.to"
        >
          <div :id="`bottom-nav-${page.title}`"></div>
          <span class="text text-xs tracking-tight normal-case"
            >{{ page.title }}
          </span>
          <v-icon>{{ page.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </transition>
  </div>
</template>

<script>
import BaseButtonLightDarkMode from './BaseButtonLightDarkMode.vue'
import notificationNumber from '~/plugins/notification-number'
export default {
  components: { BaseButtonLightDarkMode },
  mixins: [notificationNumber],
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
      buttonNavForStdent: [
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
      buttonNavForTeacher: [
        {
          title: 'Classroom',
          icon: '$vuetify.icons.classroom',
          to: '/classrooms',
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
      buttonNavForGuest: [
        {
          title: 'Join quiz',
          icon: '$vuetify.icons.quiz',
          to: '/join',
        },
        // {
        //   title: 'More',
        //   icon: '$vuetify.icons.more',
        //   to: '/more',
        // },
      ],
      hiddenReouteName: [
        'index-history',
        'index-setting',
        'index-classroom-classroomsid-index-member',
        'index-classroom-classroomsid-index-quiz',
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
        this.$store.commit('DELETE_ALL_NOTIFICATION', null)
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
    isRouterHidden() {
      return this.hiddenReouteName.includes(this.$route.name)
    },
    renderNavDependOnRole() {
      if (this.userRole == 'STUDENT') {
        return this.buttonNavForStdent
      } else if (this.userRole == 'TEACHER') {
        return this.buttonNavForTeacher
      } else {
        return this.buttonNavForGuest
      }
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
:deep(.v-btn__content) {
  @apply gap-1;
}
.Notification {
  @apply bg-red-500 !absolute !top-1 left-1/2 transform translate-x-1 z-10 rounded-full text-white text-xs w-5 h-5 flex justify-center items-center !opacity-100;
}
</style>
