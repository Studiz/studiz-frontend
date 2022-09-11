<template>
  <div>
    <div class="md:flex justify-between items-center space-y-2 md:space-y-0">
      <h1 class="text-H1">Classroom</h1>

      <v-btn
        height="50"
        color="primary"
        class="text-cap w-full md:w-auto rounded-lg"
        :class="[showInput ? 'd-none d-md-block' : '']"
        @click="showInput = !showInput"
        :showInput="showInput"
        v-if="userRole === 'STUDENT'"
        >join classroom</v-btn
      >
      <Create-classroom v-else />
    </div>
    <v-expand-transition>
      <v-card
        v-show="showInput"
        color="transparent"
        flat
        hide-details
        class="w-full md:w-6/12 lg:w-4/12 ml-auto mb-3 mt-2"
      >
        <Input-join @join-number="joinPinCode" v-if="userRole == 'STUDENT'">
          <v-btn
            hide-details
            inset
            height="56"
            class="rounded-lg text-cap d-md-none"
            :class="[
              this.$route.name == 'index-classrooms' ? 'w-full col-span-6' : '',
            ]"
            @click="cancel()"
            >cancel</v-btn
          >
        </Input-join>
      </v-card>
    </v-expand-transition>

    <v-divider class="my-5" />

    <div
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
    >
      <nuxt-link
        v-for="classroom in classRoomList"
        :key="classroom.id"
        :to="{
          name: 'index-classroom-classroomsid-index-quiz',
          params: { classroomsid: classroom.id },
        }"
      >
        <v-card
          flat
          rounded="lg"
          class="bg-gradient-to-r from-cyan-500 to-blue-500 white--text"
        >
          <v-card-title class="w-full">
            <div class="text-h5 w-10/12 truncate">
              <span class="font-bold white--text">{{ classroom.name }}</span>
            </div>
          </v-card-title>
          <v-card-subtitle class="h-24 overflow-auto scrollbar white--text">{{
            classroom.description
          }}</v-card-subtitle>
          <v-card-text
            class="flex justify-between items-start white--text pt-4"
            v-if="userRole == 'STUDENT'"
          >
            <span class="whitespace-nowrap">
              {{ classroom.teacher.firstName }}
              {{ classroom.teacher.lastName }}</span
            >
            <v-avatar class="-m-5 mr-1 white--text">
              <v-icon x-large color="white">mdi-account-circle</v-icon>
            </v-avatar>
          </v-card-text>
        </v-card>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/UserService.js'
import StudentService from '../../services/StudentService.js'
import CreateClassroom from '~/components/Teacher/create-classroom.vue'
export default {
  components: { CreateClassroom },
  data() {
    return {
      showInput: false,
      color: [
        { color1: '', color2: '' },
        { color1: '', color2: '' },
        { color1: '', color2: '' },
      ],
    }
  },
  methods: {
    cancel() {
      this.showInput = !this.showInput
    },
    joinPinCode(num) {
      StudentService.joinClassroom(num, this.$store.getters.userId)
        .then((res) => {
          UserService.signInGetProfile(
            localStorage.getItem('accessToken')
          ).then((res) => {
            this.$store.commit('setUser', res.data)
            this.$router.push('/')
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  computed: {
    classRoomList() {
      return this.$store.getters.classRooms
    },
    userRole() {
      return this.$store.getters.user ? this.$store.getters.user.role : ''
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
