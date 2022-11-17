<template>
  <div>
    <div class="md:flex justify-between items-center space-y-2 md:space-y-0">
      <h1 class="text-H1">Classrooms</h1>

      <v-dialog
        v-if="userRole === 'STUDENT'"
        v-model="dialogJoin"
        max-width="440px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            id="join-classroom"
            v-bind="attrs"
            v-on="on"
            v-show="classRoomList.length > 0"
            height="48"
            color="primary"
            class="text-cap w-full md:w-auto rounded-lg"
            >join classroom
          </v-btn>
        </template>
        <v-card class="p-2 md:p-5 transition-all">
          <the-input-join
            @join-number="joinPinCode"
            v-if="userRole == 'STUDENT'"
          >
          </the-input-join>
        </v-card>
      </v-dialog>

      <div v-else v-show="classRoomList.length > 0">
        <the-create-classroom
          :idModeEdit="idModeEditClassroom"
          :classroomObj="classroomObjForEdit"
          @close-dialog="idModeEditClassroom = false"
        />
      </div>
    </div>

    <v-divider class="my-5" />

    <div
      v-if="classRoomList.length > 0"
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 auto-rows-fr auto-cols-fr"
    >
      <base-classroom-item
        v-for="classroom in classRoomList"
        :key="classroom.id"
        :classroom="classroom"
        :userRole="userRole"
        @open-dialog-edit-classroom="openDialogEditClassroom"
        @open-dialog-delete-classroom="openDialogDeleteClassroom"
      />
    </div>

    <div v-else>
      <lottie-player
        class="custon-lottie-star w-48 h-48 mx-auto"
        autoplay
        src="https://assets5.lottiefiles.com/packages/lf20_gepgb44u.json"
      />

      <div
        v-if="userRole === 'STUDENT'"
        class="text-center font-light space-y-2"
      >
        <div class="text-xl font-semibold">No Classroom</div>
        <div>You can join classroom with PINCODE</div>
        <v-btn
          height="48"
          color="primary"
          class="text-cap rounded-lg mt-4"
          @click="clickJoinClassroom"
          >Join classroom
        </v-btn>
      </div>

      <div
        v-if="userRole === 'TEACHER'"
        class="text-center font-light space-y-2"
      >
        <div class="text-xl font-semibold">No Classroom</div>
        <div class="max-w-sm mx-auto">
          You can create a classroom for students to enter
        </div>
        <v-btn
          height="48"
          color="primary"
          class="text-cap rounded-lg mt-4"
          @click="clickCreateClassroom"
          >Create classroom
        </v-btn>
      </div>
    </div>

    <v-dialog
      v-model="dialogDelete"
      width="500"
      @click:outside="dialogDelete = false"
    >
      <v-card>
        <v-card-title>
          <span class="break-normal"
            >Delete classroom "{{ classroomObjForDelete.name }}"</span
          >
        </v-card-title>
        <v-card-text
          >Are you sure you want to delete this classroom?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            class="!capitalize"
            color="primary"
            @click="dialogDelete = false"
            >cancel</v-btn
          >
          <v-btn text type="submit" color="error" @click="deleteClassroom"
            >delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import UserService from '../../services/UserService.js'
import StudentService from '../../services/StudentService.js'
import TeacherService from '../../services/TeacherService.js'
import TheCreateClassroom from '~/components/Teacher/TheCreateClassroom.vue'
import BaseClassroomItem from '~/components/BaseClassroomItem.vue'
import TheInputJoin from '~/components/TheInputJoin.vue'
import socket from '~/plugins/socket.io'

export default {
  components: { TheCreateClassroom, TheInputJoin, BaseClassroomItem },
  head() {
    return {
      title: 'Classroom',
    }
  },
  data() {
    return {
      color: [
        { color1: '', color2: '' },
        { color1: '', color2: '' },
        { color1: '', color2: '' },
      ],
      idModeEditClassroom: false,
      classroomObjForEdit: {},
      dialogDelete: false,
      classroomObjForDelete: {},
      dialogJoin: false,
    }
  },
  methods: {
    joinPinCode(num) {
      this.dialogJoin = false
      this.$store.commit('TOGGLE_LOADING', true)
      StudentService.joinClassroom(num, this.$store.getters.userId)
        .then((res) => {
          UserService.signInGetProfile(
            localStorage.getItem('accessToken')
          ).then((res) => {
            this.$store.commit('setUser', res.data)
            this.$store.commit('TOGGLE_LOADING', false)
            this.$store.commit('TOGGLE_ALERT', {
              type: 'success',
              message: 'Joined classroom successfully',
            })
            socket.emit(
              'join-classrooms',
              this.$store.getters.classRooms.map((classRoom) => classRoom.id)
            )

            this.$router.push('/classrooms')
          })
        })
        .catch((err) => {
          this.$store.commit('TOGGLE_LOADING', false)
          this.$store.commit('TOGGLE_ALERT', {
            type: 'error',
            message: err.response.data,
          })
        })
    },
    clickJoinClassroom() {
      document.getElementById('join-classroom').click()
    },
    clickCreateClassroom() {
      document.getElementById('create-classroom').click()
    },
    openDialogEditClassroom(classroomObj) {
      this.idModeEditClassroom = true
      this.classroomObjForEdit = classroomObj
    },
    openDialogDeleteClassroom(classroomObj) {
      this.dialogDelete = true
      this.classroomObjForDelete = classroomObj
    },
    deleteClassroom() {
      this.$store.commit('TOGGLE_LOADING', true)
      TeacherService.deleteClassroom(this.classroomObjForDelete.id)
        .then((res) => {
          socket.emit('delete-event-classroom', this.classroomObjForDelete.id)
          socket.emit('leave-classrooms', this.classroomObjForDelete.id)
          UserService.signInGetProfile(localStorage.getItem('accessToken'))
            .then((res) => {
              this.$store.commit('setUser', res.data)
              this.$store.commit('TOGGLE_LOADING', false)
              this.dialogDelete = false
              this.$store.commit('TOGGLE_ALERT', {
                type: 'success',
                message: 'Deleted classroom successfully',
              })
            })
            .catch((err) => {
              this.close()
              this.$store.commit('TOGGLE_LOADING', false)
              this.dialogDelete = false
              this.$store.commit('TOGGLE_ALERT', {
                type: 'error',
                message: err.response.data,
              })
            })
        })
        .catch((err) => {
          this.$store.commit('TOGGLE_LOADING', false)
          this.dialogDelete = false
          this.$store.commit('TOGGLE_ALERT', {
            type: 'error',
            message: err.response.message,
          })
        })
    },
  },
  computed: {
    classRoomList() {
      return this.$store.getters.classRooms
    },
    userRole() {
      return this.$store.getters.userRole ? this.$store.getters.userRole : ''
    },
  },
}
</script>

<style csoped>
/* width */
.scrollbar::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 8px 8px;
}

/* Handle */
.scrollbar::-webkit-scrollbar-thumb {
  background: #ffb703;
  border-radius: 50px;
}

/* Handle on hover */
.scrollbar::-webkit-scrollbar-thumb:hover {
  background: #f88100;
  border-radius: 50px;
}
</style>
