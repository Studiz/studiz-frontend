<template>
  <div>
    <div
      class="bg-gradient-to-r h-36 -mx-2 -mt-2 md:-mx-5 md:-mt-5"
      :class="
        renderClassroomColor
          ? renderClassroomColor
          : 'from-[#06b6d4] to-[#2563eb]'
      "
    />
    <div
      class="bg-gradient-to-b from-transparent to-white dark:from-transparent dark:to-dark_background h-24 -mt-24 -mx-2 md:-mx-5"
    />

    <div>
      <div class="flex-wrap d-flex mb-4 -mt-16">
        <h1 class="text-H1">
          {{ classroom ? classroom.name : '' }}
        </h1>

        <v-spacer></v-spacer>
        <base-dialog-condition
          v-if="isStudent"
          @confirm="leave"
          colorBTN="secondary"
          btn2="primary"
        >
          <template #namebtn>leave</template>
          <template #title>Are you sure to leave classroom?</template>
        </base-dialog-condition>
        <base-dialog-condition
          v-if="false"
          @confirm="deleteclass"
          colorBTN="red"
          btn2="red"
        >
          <template #namebtn>Delete</template>
          <template #title>Are you sure to delete classroom?</template>
          <template #btn2>Delete</template>
        </base-dialog-condition>
      </div>
      <p class="uppercase">
        pin code:
        <span class="font-semibold">{{
          classroom ? classroom.pinCode : ''
        }}</span>
      </p>
      <div
        @click="isShowDiscription = !isShowDiscription"
        class="p-3 background ring-1 ring-black ring-opacity-10 rounded-lg leading-relaxed drop-shadow-sm"
      >
        <span :class="isShowDiscription ? '' : 'line-clamp-2 max-h-14'">
          {{ classroom ? classroom.description : '' }}
        </span>
      </div>
    </div>

    <div class="opacity-0 max-h-[0vh] md:opacity-100 md:max-h-[100vh]">
      <v-tabs grow background-color="transparent" class="mb-4 mt-2">
        <v-tab v-for="route in routeObj" :key="route.title" :to="route.to">
          <v-icon left>{{ route.icon }}</v-icon>
          <span class="text-cap w-16">{{ route.title }}</span>
        </v-tab>
      </v-tabs>
    </div>

    <div class="ring-1 ring-black ring-opacity-10 drop-shadow-sm rounded-lg">
      <Nuxt />
    </div>

    <v-bottom-navigation
      grow
      fixed
      height="64"
      class="drop-shadow-md d-md-none background_card"
      active-class="primary--text text-hidden"
      shift
    >
      <v-btn
        color="background_card"
        height="64"
        v-for="route in routeObj"
        min-width="50"
        :key="route.title"
        :to="route.to"
      >
        <span class="text text-xs tracking-tight normal-case"
          >{{ route.title }}
        </span>
        <v-icon>{{ route.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import BaseDialogCondition from '~/components/BaseDialogCondition.vue'
import ClassroomService from '~/services/ClassroomService'
import StudentService from '~/services/StudentService'
import UserService from '~/services/UserService'
export default {
  components: { BaseDialogCondition },
  head() {
    return {
      title: this.renderClassroomName,
      titleTemplate: '%s - Classroom',
    }
  },
  data() {
    return {
      classroom: null,
      isShowDiscription: false,
      routeObj: [
        {
          title: 'quiz',
          icon: '$vuetify.icons.quiz',
          to: {
            name: 'index-classroom-classroomsid-index-quiz',
            params: { classid: this.$route.params.classroomsid },
          },
        },
        {
          title: 'member',
          icon: '$vuetify.icons.member',
          to: {
            name: 'index-classroom-classroomsid-index-member',
            params: { classid: this.$route.params.classroomsid },
          },
        },
      ],
    }
  },
  methods: {
    leave() {
      this.$store.commit('TOGGLE_LOADING', true)
      StudentService.leaveClassroom(
        this.$route.params.classroomsid,
        this.$store.getters.userId
      )
        .then(() => {
          UserService.signInGetProfile(
            localStorage.getItem('accessToken')
          ).then((res) => {
            this.$store.commit('setUser', res.data)
            this.$store.commit('TOGGLE_LOADING', false)
            this.$store.commit('TOGGLE_ALERT', {
              type: 'success',
              message: 'Leave classroom succeed',
            })
            this.$router.push('/classrooms')
          })
        })
        .catch((err) => {
          this.$store.commit('TOGGLE_LOADING', false)
          this.$store.commit('TOGGLE_ALERT', {
            type: 'error',
            message: err.response.message,
          })
        })
    },
    deleteclass() {
      console.log('deleteclass')
    },
  },
  computed: {
    isStudent() {
      return this.$store.getters.userRole == 'STUDENT' ? true : false
    },
    renderClassroomName() {
      return this.classroom ? this.classroom?.name : 'No classroom name'
    },
    renderClassroomColor() {
      return this.classroom ? this.classroom?.color : ''
    },
  },
  created() {
    ClassroomService.getClassroom(this.$route.params.classroomsid).then(
      (res) => {
        this.classroom = res.data
        this.$store.commit('setClassroom', res.data)
      }
    )
  },
}
</script>

<style scoped>
.v-tab {
  @apply px-0;
}
</style>
