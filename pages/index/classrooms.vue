<template>
  <div>
    <div class="md:flex justify-between items-center space-y-2 md:space-y-0">
      <h1 class="text-H1">Classroom</h1>

      <v-btn
        height="48"
        color="primary"
        class="text-cap w-full md:w-auto rounded-lg"
        :class="[showInput ? 'd-none d-md-block' : '']"
        @click="showInput = !showInput"
        :showInput="showInput"
        v-if="userRole === 'STUDENT'"
        >join classroom</v-btn
      >

      <the-create-classroom
        :idModeEdit="idModeEditClassroom"
        :classroomObj="classroomObjForEdit"
        @close-dialog="idModeEditClassroom = false"
        v-else
      />
    </div>
    <v-expand-transition>
      <v-card
        v-show="showInput"
        color="transparent"
        flat
        hide-details
        class="w-full md:w-6/12 lg:w-4/12 ml-auto mb-3 mt-2"
      >
        <the-input-join @join-number="joinPinCode" v-if="userRole == 'STUDENT'"
          ><v-btn
            hide-details
            inset
            height="56"
            class="rounded-lg text-cap d-md-none"
            :class="[
              this.$route.name == 'index-classrooms' ? 'w-full col-span-6' : '',
            ]"
            @click="cancel()"
            >cancel
          </v-btn>
        </the-input-join>
      </v-card>
    </v-expand-transition>

    <v-divider class="my-5" />

    <div
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 auto-rows-fr auto-cols-fr"
    >
      <div
        class="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 white--text rounded-lg overflow-hidden p-4 relative"
        v-for="classroom in classRoomList"
        :key="classroom.id"
      >
        <nuxt-link
          class="focus:outline-none"
          :to="{
            name: 'index-classroom-classroomsid-index-quiz',
            params: { classroomsid: classroom.id },
          }"
        >
          <div class="flex flex-col gap-2">
            <div class="w-full">
              <div class="text-h5 w-10/12 truncate">
                <span class="font-bold white--text">{{ classroom.name }}</span>
              </div>
            </div>

            <div
              class="line-clamp-2 md:line-clamp-none h-12 md:h-24 md:overflow-auto scrollbar white--text"
            >
              {{ classroom.description }}
            </div>

            <div
              class="flex justify-between items-start white--text gap-x-3"
              v-if="userRole == 'STUDENT'"
            >
              <span class="whitespace-normal self-center leading-none truncate">
                {{ classroom.teacher.firstName }}
                {{ classroom.teacher.lastName }}
              </span>

              <v-avatar size="40px" class="!flex-none">
                <v-img
                  v-if="classroom.teacher.imageUrl"
                  :src="classroom.teacher.imageUrl"
                />
                <v-icon v-else large color="white">mdi-account-circle</v-icon>
              </v-avatar>
            </div>
          </div>
        </nuxt-link>
        <div
          class="white--text absolute top-3 right-1"
          v-if="userRole == 'TEACHER'"
        >
          <v-menu offset-y left transition="slide-y-transition" color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark v-bind="attrs" v-on="on" icon @click.stop="">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="openDialogEditClassroom(classroom)">
                Edit
              </v-list-item>
              <v-list-item
                @click="openDialogDeleteClassroom(classroom)"
                class="!text-red-500"
              >
                Delete
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
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
import TheCreateClassroom from '~/components/Teacher/TheCreateClassroom.vue'
import TheInputJoin from '~/components/TheInputJoin.vue'
export default {
  components: { TheCreateClassroom, TheInputJoin },
  head() {
    return {
      title: 'Classroom',
    }
  },
  data() {
    return {
      showInput: false,
      color: [
        { color1: '', color2: '' },
        { color1: '', color2: '' },
        { color1: '', color2: '' },
      ],
      idModeEditClassroom: false,
      classroomObjForEdit: {},
      dialogDelete: false,
      classroomObjForDelete: {},
    }
  },
  methods: {
    cancel() {
      this.showInput = !this.showInput
    },
    joinPinCode(num) {
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
    openDialogEditClassroom(classroomObj) {
      this.idModeEditClassroom = true
      this.classroomObjForEdit = classroomObj
    },
    openDialogDeleteClassroom(classroomObj) {
      console.log(classroomObj)
      this.dialogDelete = true
      this.classroomObjForDelete = classroomObj
    },
    deleteClassroom() {
      console.log('delete classroom')
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
