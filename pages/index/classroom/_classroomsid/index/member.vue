<template>
  <v-data-table
    class="elevation-0 !rounded-lg"
    mobile-breakpoint="0"
    item-key="name"
    hide-default-footer
    loading-text="Loading... Please wait"
    sort-by="displayName"
    v-model="selected"
    :loading="isloading"
    :single-select="false"
    :show-select="isTeacher"
    :headers="headers"
    :items="studentsInClass"
    :page.sync="page"
    :items-per-page="itemsPerPage"
  >
    <template #top>
      <v-toolbar-title
        class="font-semibold p-3 flex items-center gap-x-5 flex-wrap"
      >
        <span class="h-9">Students member</span>
        <v-spacer />

        <base-dialog-condition
          maxwidth="500px"
          height="36px"
          colorBTN="secondary"
          :classBtn="classBtnDialog"
          :propDialog="propRemoveStudent"
          btn2="error"
          @open="openDialog"
          @close-dialog="closeDialog"
          @confirm="removeStudent"
        >
          <template #namebtn>
            <span>remove</span>
          </template>
          <template #title>
            <span>Remove student</span>
          </template>
          <template #contain>
            <div class="px-6 py-2 font-light">
              <span
                >Are you sure you want to remove
                {{ renderRemoveStudentName }}
              </span>
            </div>
          </template>
          <template #btn1>
            <span>Cancel</span>
          </template>
          <template #btn2>
            <span>Remove</span>
          </template>
        </base-dialog-condition>
      </v-toolbar-title>
    </template>

    <template v-slot:item.image="{ item }">
      <v-list-item-avatar color="primary" size="30px">
        <v-img :src="item.image" :alt="item.name" />
      </v-list-item-avatar>
    </template>

    <template #item.actions="{ item }" v-if="isTeacher">
      <!-- <v-icon class="mr-2" @click="editItem(item)">mdi-dots-vertical</v-icon> -->
      <v-menu v-if="!hasSelected" offset-y left transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon center v-bind="attrs" v-on="on">
            <v-icon class="w-full">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="removeOne(item)">
            <v-list-item-title>remove</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div v-else class="w-9" />
      <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
    </template>
  </v-data-table>
</template>

<script>
import BaseDialogCondition from '~/components/BaseDialogCondition.vue'
import TeacherService from '~/services/TeacherService'
import ClassroomService from '~/services/ClassroomService'
import socket from '~/plugins/socket.io'

export default {
  components: { BaseDialogCondition },
  head() {
    return {
      titleTemplate: '%s - Member',
    }
  },
  data: () => ({
    page: 1,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: '',
        sortable: false,
        value: 'image',
        width: '50px',
      },
      {
        text: 'Display Name',
        value: 'displayName',
      },
      { text: 'Name', value: 'name' },
      { text: '', value: 'actions', sortable: false, align: 'end' },
    ],
    selected: [],
    chooseOne: null,

    isloading: false,
    propRemoveStudent: false,
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {},

  methods: {
    loadData() {
      ClassroomService.getClassroom(this.$route.params.classroomsid).then(
        (res) => {
          this.$store.commit('setClassroom', res.data)
          this.isloading = false
        }
      )
    },
    removeOne(item) {
      this.propRemoveStudent = true
      this.chooseOne = item
    },
    closeDialog() {
      this.chooseOne = null
      this.propRemoveStudent = false
    },
    openDialog() {
      this.chooseOne = null
      this.propRemoveStudent = true
    },
    removeStudent() {
      TeacherService.kickStudntInClassroom(
        this.$route.params.classroomsid,
        this.chooseOne.id
      ).then((res) => {
        socket.emit('delete-event-classroom', this.$route.params.classroomsid)
        this.$store.commit('TOGGLE_ALERT', {
          type: 'success',
          message: res.data,
        })
        this.isloading = true
        this.loadData()
        this.propRemoveStudent = false
      })
    },
  },
  computed: {
    studentsInClass() {
      return this.$store.getters.students.map((student) => {
        return {
          image: student.imageUrl,
          displayName: student.displayName,
          name: `${student.firstName} ${student.lastName}`,
          id: student.id,
        }
      })
    },
    itemsPerPage() {
      return this.studentsInClass?.length
    },
    isTeacher() {
      return this.$store.getters.userRole == 'TEACHER' ? true : false
    },
    hasSelected() {
      return this.selected.length > 0
    },
    classBtnDialog() {
      return this.hasSelected
        ? 'opacity-100 transition-all ml-auto'
        : '!w-0 !h-0 opacity-0 '
    },
    renderRemoveStudentName() {
      return this.chooseOne == null
        ? 'this student?'
        : `student "${this.chooseOne.displayName}"?`
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == 'index-classroom-classroomsid-index-quiz') {
      history.replaceState({}, '', '/classrooms')
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    if (
      from.name == 'index-classroom-classroomsid-index-quiz' ||
      to.name == 'index-classroom-classroomsid-index-quiz'
    ) {
      history.replaceState({}, '', '/classrooms')
    }
    next()
  },
}
</script>

<style scoped>
.v-data-table {
  background-color: var(--v-background-base) !important;
  @apply p-2;
}

:deep(.v-data-table__mobile-row) {
  @apply first:justify-start;
}

:deep(table > thead > tr > th:nth-child(4)) {
  /* @apply hidden sm:table-cell; */
  @apply whitespace-nowrap;
}
:deep(tr > .text-end) {
  @apply hidden sm:table-cell;
}

:deep(td),
:deep(th) {
  @apply !px-3;
}
:deep(thead) {
  @apply overflow-scroll;
}
:deep(tr > .text-start) {
  @apply whitespace-nowrap;
}
</style>
