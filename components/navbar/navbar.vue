<template>
  <div>
    <!-- TOP -->
    <div class="hidden md:inline-block">
      <v-app-bar fixed app flat class="drop-shadow-md" height="60" dense color="background">
        <div class="flex justify-between items-center container">
          <v-btn height="50px" elevation="0" color="background" class @click="goHomePage">
            <v-img :src="require('../../static/logo/Studiz_logo.svg')" max-width="80" />
            <!-- <v-icon x-large>$vuetify.icons.Studiz_logo</v-icon> -->
          </v-btn>
          <div class="flex items-center space-x-4">
            <v-spacer></v-spacer>
            <!-- right  -->
            <LightDarkMode />
            <v-menu offset-y left color="primary" transition="slide-y-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary text-cap" dark v-bind="attrs" height="40" rounded v-on="on">
                  <v-avatar class="-m-5 mr-1">
                    <v-icon large>mdi-account-circle</v-icon>
                  </v-avatar>User Grest
                  <v-icon right>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="item in route" :key="item.to" :to="item.to" class="font">
                  <v-icon>{{ item.icon }}</v-icon>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
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
      class="drop-shadow-md d-md-none"
      color="primary-title"
      active-class="primary--text"
    >
      <v-btn
        color="background"
        height="70"
        min-width="10"
        v-for="b in buttonNav"
        :key="b.icon"
        :to="b.to"
      >
        {{b.title}}
        <v-icon>{{b.icon}}</v-icon>
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
          title: 'login',
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
          title: 'notification',
          icon: '$vuetify.icons.notification',
          to: '/notification',
        },
        {
          title: 'more',
          icon: '$vuetify.icons.more',
          to: '/',
        },
      ],
    }
  },
  methods: {
    goHomePage() {
      this.$router.push('/join')
    },
  },
}
</script>
