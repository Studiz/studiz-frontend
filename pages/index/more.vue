<template>
  <div>
    <v-list color="transparent" rounded class="pa-0">
      <v-list-item to="profile" link class="px-3">
        <v-list-item-avatar
          color="primary"
          size="36px"
          class="align-self-start align-self-md-center"
        >
          <v-icon large color="white">mdi-account-circle</v-icon>
          <!-- <v-img src="https://api.lorem.space/image/face?hash=92310" /> -->
        </v-list-item-avatar>
        <v-list-item-content>
          <v-row gutters>
            <v-col cols="12" md="6" class="d-flex items-center">
              <v-list-item-title class="text-cap">{{displayName}}</v-list-item-title>
            </v-col>
            <v-spacer></v-spacer>
            <!-- hidden when loing -->
            <v-col cols="6" md="2" class="align-self-center" v-if="!user">
              <v-btn to="signup" height="36" block color="secondary" outlined>sign up</v-btn>
            </v-col>
            <v-col cols="6" md="2" class="align-self-center" v-if="!user">
              <v-btn to="login" height="36" block color="primary">login</v-btn>
            </v-col>
            <!-- hidden when loing -->
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list color="transparent" rounded class="pa-0 space-y-2 mt-2">
      <v-list-item v-for="page in pages" :key="page.icon" :to="page.to" link class="px-3">
        <v-icon size="36px" color="primary" left class="mr-4">{{ page.icon }}</v-icon>
        <v-list-item-content>
          <v-list-item-title class="text-cap">{{ page.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link class="px-3" @click="logout()">
        <v-icon size="36px" color="red" left class="mr-4">mdi-logout</v-icon>
        <v-list-item-content>
          <v-list-item-title class="text-cap">Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import LightDarkMode from '~/components/navbar/light-dark-mode.vue'
export default {
  components: { LightDarkMode },
  data() {
    return {
      theme: '',
      pages: [
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
    displayName() {
      return this.$store.getters.user
        ? this.$store.getters.user.displayName
          ? this.$store.getters.user.displayName
          : `${this.$store.getters.user.firstName} ${this.$store.getters.user.lastName}`
        : ''
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
}
</script>

<style>
</style>