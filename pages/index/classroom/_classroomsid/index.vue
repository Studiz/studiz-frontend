<template>
  <div>
    <div>
      <div class="flex-wrap d-flex mb-4">
        <h1 class="text-H1">{{ classroom ? classroom.name : '' }}</h1>

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
      <p class="p-3 background rounded-lg leading-relaxed drop-shadow-sm">
        {{ classroom ? classroom.description : '' }}
      </p>
    </div>
    <div class="mb-4">
      <v-tabs grow background-color="transparent">
        <v-tab
          :to="{
            name: 'index-classroom-classroomsid-index-quiz',
            params: { classid: $route.params.classroomsid },
          }"
        >
          <v-icon left>$vuetify.icons.quiz</v-icon>
          <span class="text-cap w-16">quiz</span>
        </v-tab>
        <v-tab
          :to="{
            name: 'index-classroom-classroomsid-index-member',
            params: { classid: $route.params.classroomsid },
          }"
        >
          <v-icon left>$vuetify.icons.member</v-icon>
          <span class="text-cap w-16">member</span>
        </v-tab>
      </v-tabs>
    </div>
    <Nuxt />
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
