<template>
  <div>
    <div>
      <div class="d-flex">
        <h1 class="text-H1">{{ classroom?classroom.name:'' }}</h1>

        <v-spacer></v-spacer>
        <DialogCondition v-if="userRole" @confirm="leave" colorBTN="secondary" btn2="primary">
          <template #namebtn>leave</template>
          <template #title>Are you sure to leave classroom?</template>
        </DialogCondition>
        <DialogCondition v-else @confirm="deleteclass" colorBTN="red" btn2="red">
          <template #namebtn>Delete classroom</template>
          <template #title>Are you sure to delete classroom?</template>
          <template #btn2>Delete</template>
        </DialogCondition>
      </div>
      <p>{{ classroom?classroom.description:'' }}</p>
      <p>
        PinCode:
        <span class="text-H2">{{ classroom?classroom.pinCode:'' }}</span>
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
import DialogCondition from '~/components/dialog-condition.vue'
import ClassroomService from '../../../../services/ClassroomService'
import StudentService from '../../../../services/StudentService'
import UserService from '../../../../services/UserService'
export default {
  components: { DialogCondition },
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
            this.$store.commit('SET_USER', res.data)
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
    userRole() {
      return this.$store.getters.userRole == 'STUDENT' ? true : false
    },
  },
  created() {
    ClassroomService.getClassroom(this.$route.params.classroomsid).then(
      (res) => {
        this.classroom = res.data
      }
    )
  },
}
</script>

<style></style>
