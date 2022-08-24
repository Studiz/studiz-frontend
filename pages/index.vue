<template>
  <v-row>
    <v-col cols="0" md="1" lg="2" class="d-none d-md-block pr-xl-12">
      <v-sheet color="transparent" class="fixed w-12 lg:w-full max-w-[176px] xl:max-w-[256px]">
        <v-list color="transparent" rounded class="pa-0">
          <v-list-item to="/profile" active-class="primary--text" class="h-12 pa-1 lg:h-12">
            <v-list-item-avatar color="primary" size="40px">
              <v-icon large color="white" v-if="!imageProfile">mdi-account-circle</v-icon>
              <v-img v-else :src="imageProfile" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{displayName}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-2"></v-divider>

          <div v-for="(page, index) in pages" :key="index">
            <v-divider class="my-2" v-if="index == 4"></v-divider>
            <v-list-item
              v-if="userRole == 'TEACHER'?index !==1:index !==2"
              :to="page.to"
              link
              active-class="primary--text"
            >
              <v-icon left class="-m-0.5 lg:m-0">{{ page.icon }}</v-icon>
              <v-list-item-content>
                <v-list-item-title>{{ page.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col cols="12" md="11" lg="10" class="pa-1 pa-md-3">
      <v-sheet
        min-height="70vh"
        rounded="lg"
        elevation="1"
        color="background_card"
        class="mb-16 overflow-hidden pa-2 pa-md-5"
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
export default {
  name: 'IndexPage',
  data() {
    return {
      isAuthenticated: false,
      pages: [
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
          title: 'Setting',
          icon: '$vuetify.icons.setting',
          to: '/setting',
        },
      ],
    }
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole
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