<template>
  <div>
    <div class="md:flex justify-between items-center mb-1">
      <h1 class="text-H1 font-bold">Classroom</h1>
      <v-btn
        height="50"
        color="primary"
        class="text-cap w-full md:w-auto rounded-lg"
        :class="[showInput ? 'd-none d-md-block' : '']"
        @click="showInput = !showInput"
        :showInput="showInput"
      >join classroom</v-btn>
    </div>
    <v-expand-transition>
      <v-card
        v-show="showInput"
        color="transparent"
        flat
        hide-details
        class="w-full md:w-6/12 lg:w-4/12 ml-auto mb-3"
      >
        <Input-join>
          <v-btn
            hide-details
            inset
            height="56"
            class="rounded-lg text-cap d-md-none"
            :class="[
              this.$route.name == 'index-classrooms' ? 'w-full col-span-6' : '',
            ]"
            @click="cancel()"
          >cancel</v-btn>
        </Input-join>
      </v-card>
    </v-expand-transition>

    <v-row class="mt-2" no-gutters>
      <v-col
        cols="12"
        md="4"
        xl="3"
        v-for="classroom in classlist"
        :key="classroom.name"
        class="pa-md-1 py-1"
      >
        <nuxt-link
          :to="{ name: 'index-classroom-classroomsid-index-quiz', params: { classroomsid: classroom.name} }"
        >
          <v-card flat rounded="lg" class="bg-gradient-to-r from-cyan-500 to-blue-500 white--text">
            <v-card-title class="w-full">
              <div class="text-h5 w-10/12 truncate">
                <span class="font-bold white--text">{{classroom.name}}</span>
              </div>
            </v-card-title>

            <v-card-subtitle
              class="h-24 overflow-auto scrollbar white--text"
            >{{classroom.description}}</v-card-subtitle>
            <v-card-text class="flex justify-between items-start white--text">
              {{classroom.teachName}}
              <v-avatar class="-m-5 mr-1 white--text">
                <v-icon x-large color="white">mdi-account-circle</v-icon>
              </v-avatar>
            </v-card-text>
          </v-card>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import classroomServeice from '@/services/ClassroomService.js'
export default {
    data() {
        return {
            showInput: false,
            color: [
                { color1: '', color2: '' },
                { color1: '', color2: '' },
                { color1: '', color2: '' },
            ],
            classlist: [
                {
                    name: 'INT 100',
                    description: 'IT Fundamentals',
                    teachName: 'john seana',
                    teachImage: '',
                },
                {
                    name: 'INT 101',
                    description: 'PROGRAMMING FUNDAMENTALS',
                    teachName: 'john seana',
                    teachImage: '',
                },
                {
                    name: 'INT 102',
                    description: 'WEB TECHNOLOGY',
                    teachName: 'john seana',
                    teachImage: '',
                },
                {
                    name: 'LNG 120',
                    description: 'GENERAL ENGLISH',
                    teachName: 'john seana',
                    teachImage: '',
                },
            ],
        }
    },
    methods: {
        cancel() {
            this.showInput = !this.showInput
        },
    },
    created() {
        classroomServeice.getStudents().then((res) => {
            console.log(res.data)
        })
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
</style>
