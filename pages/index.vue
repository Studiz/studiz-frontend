<template>
  <v-row>
    <v-col cols="0" md="1" lg="2" class="d-none d-md-block pr-xl-12">
      <v-sheet
        color="transparent"
        class="fixed w-12 lg:w-full max-w-[176px] xl:max-w-[256px]"
      >
        <v-list color="transparent" rounded class="pa-0">
          <v-list-item
            to="/profile"
            active-class="primary--text"
            class="h-12 pa-1 lg:h-12"
          >
            <v-list-item-avatar color="primary" size="40px">
              <v-icon large color="white" v-if="!imageProfile"
                >mdi-account-circle</v-icon
              >
              <v-img v-else :src="imageProfile" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ displayName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-2"></v-divider>

          <div v-for="(page, index) in pages" :key="index">
            <v-divider class="my-2" v-if="index == 5"></v-divider>
            <v-list-item
              v-if="userRole == 'TEACHER' ? index !== 1 : index !== 2"
              :to="page.to"
              link
              active-class="primary--text"
            >
              <div :id="`list-${page.title}`"></div>
              <v-icon left class="-m-1 lg:m-0">{{ page.icon }}</v-icon>
              <v-list-item-content>
                <v-list-item-title>{{ page.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col
      cols="12"
      md="11"
      lg="10"
      class="pa-2 pa-md-3"
      :class="isRouterHidden ? '' : 'mb-16 mb-md-0'"
    >
      <v-sheet
        rounded="lg"
        elevation="1"
        color="background_card"
        class="overflow-hidden pa-2 pa-md-5"
        :class="
          isRouterHidden
            ? 'min-h-[calc(100vh-16px)]'
            : 'min-h-[calc(100vh-64px-16px)] md:min-h-[calc(100vh-64px-24px)]'
        "
      >
        <transition name="slide-fade" mode="out-in">
          <Nuxt v-if="!isRouterIndex" />

          <div v-else class="max-w-xl mx-auto">
            <div class="flex flex-col gap-y-4">
              <v-btn
                height="150"
                elevation="0"
                color="transparent"
                class="overflow-hidden w-fit mx-auto"
                to="/classrooms"
              >
                <v-icon size="200">$vuetify.icons.Studiz_logo</v-icon>
              </v-btn>
              <h1 class="text-4xl font-semibold text-center">
                Welcome to Studiz
              </h1>
              <v-divider class="mx-14" />
              <p class="text-center">Online Classroom and Quiz game</p>
              <br />
              <p class="text-center">
                This web application will help students interact with friends
                and teachers to create an active learning process and make
                students feel more interested in learning and having fun.
              </p>
            </div>
          </div>
        </transition>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import notificationNumber from '~/plugins/notification-number'
export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'Welcome to Studiz',
    }
  },
  mixins: [notificationNumber],
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
          title: 'Quiz History',
          icon: 'mdi-history',
          to: '/history',
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
      hiddenReouteName: ['index-history', 'index-setting'],
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
    isRouterIndex() {
      return this.$route.name === 'index'
    },
    renderRouterName() {
      return this.$route.name
    },
    isRouterHidden() {
      return this.hiddenReouteName.includes(this.$route.name)
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

<style scoped>
.Notification {
  @apply bg-red-500 absolute top-0 left-0 rounded-full text-white text-xs w-5 h-5 flex justify-center items-center;
}

.slide-fade-enter-active {
  transition: all 0.5s;
}
.slide-fade-leave-active {
  transition: all 0.5s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(2rem);
  opacity: 0;
}
</style>
