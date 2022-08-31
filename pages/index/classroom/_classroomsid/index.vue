<template>
  <div>
    <div>
      <div class="flex-wrap d-flex">
        <h1 class="text-H1">{{ classroom?classroom.name:'' }}</h1>

        <v-spacer></v-spacer>
        <base-dialog-condition v-if="isStudent" @confirm="leave" colorBTN="secondary" btn2="primary">
          <template #namebtn>leave</template>
          <template #title>Are you sure to leave classroom?</template>
        </base-dialog-condition>
        <base-dialog-condition v-if="false" @confirm="deleteclass" colorBTN="red" btn2="red">
          <template #namebtn>Delete</template>
          <template #title>Are you sure to delete classroom?</template>
          <template #btn2>Delete</template>
        </base-dialog-condition>
      </div>
      <p>{{ classroom?classroom.description:'' }}</p>
      <p>
        PinCode:
        <span class="font-medium">{{ classroom?classroom.pinCode:'' }}</span>
      </p>
    </div>
    <div class="mb-4">
      <v-tabs grow background-color="transparent">
        <v-tab
          :to="({
                name: 'index-classroom-classroomsid-index-quiz',
                params: { classid: $route.params.classroomsid},
            })"
        >
          <v-icon left>$vuetify.icons.quiz</v-icon>
          <span class="text-cap">quiz</span>
        </v-tab>
        <v-tab
          :to="({
                name: 'index-classroom-classroomsid-index-member',
                params: { classid: $route.params.classroomsid},
            })"
        >
          <v-icon left>$vuetify.icons.member</v-icon>
          <span class="text-cap">member</span>
        </v-tab>
      </v-tabs>
    </div>
    <Nuxt />
  </div>
</template>

<script>
import BaseDialogCondition from '~/components/BaseDialogCondition.vue'
import ClassroomService from '../../../../services/ClassroomService'
import StudentService from '../../../../services/StudentService'
import UserService from '../../../../services/UserService'
export default {
  components: { BaseDialogCondition },
  data() {
    return {
      classroom: null,
    }
  },
  methods: {
    leave() {
      StudentService.leaveClassroom(
        this.$route.params.classroomsid,
        this.$store.getters.userId
      ).then(() => {
        UserService.signInGetProfile(localStorage.getItem('accessToken')).then(
          (res) => {
            this.$store.commit('setUser', res.data)
            this.$router.push('/')
          }
        )
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

<style></style>
