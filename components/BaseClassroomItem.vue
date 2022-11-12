<template>
  <div class="flex relative hover:drop-shadow-lg">
    <nuxt-link
      class="w-full h-full bg-gradient-to-br text-white rounded-lg overflow-hidden p-4 transition-all"
      :class="
        classroom.color !== '' ? classroom.color : 'from-[#06b6d4] to-[#2563eb]'
      "
      :to="{
        name: 'index-classroom-classroomsid-index-quiz',
        params: { classroomsid: classroom.id },
      }"
    >
      <div class="flex flex-col gap-2">
        <div class="w-full">
          <div class="text-h5 w-10/12 truncate white--text text-white">
            <span class="font-bold">{{ classroom.name }}</span>
          </div>
        </div>

        <v-divider dark />

        <div
          class="line-clamp-2 md:line-clamp-none h-12 md:h-24 md:overflow-auto scrollbar white--text pr-1 opacity-80"
        >
          {{ classroom.description }} Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Veniam esse, unde ullam, molestiae quos perspiciatis
          earum ipsam deleniti magnam sequi tempora assumenda ducimus iure
          inventore quidem doloremque. Atque, optio eum?
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
</template>

<script>
export default {
  props: {
    classroom: {
      type: Object,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
    },
  },
  methods: {
    openDialogEditClassroom(classroom) {
      this.$emit('open-dialog-edit-classroom', classroom)
    },
    openDialogDeleteClassroom(classroom) {
      this.$emit('open-dialog-delete-classroom', classroom)
    },
  },
}
</script>

<style></style>
