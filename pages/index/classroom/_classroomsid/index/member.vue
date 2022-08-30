<template>
  <v-data-table
    v-model="selected"
    :single-select="false"
    show-select
    item-key="name"
    :headers="headers"
    :items="studentsInClass"
    sort-by="displayName"
    class="elevation-0"
    :page.sync="page"
    hide-default-footer
    :items-per-page="itemsPerPage"
  >
    <template #top>
      <v-toolbar-title class="font-semibold">Students</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <!-- สำหรับแก้ไข -->
      <!-- <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>-->

      <!-- สำหรับลบ -->
      <!-- <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>-->

      <!-- <v-toolbar flat>
        <v-btn color="primary">action</v-btn>
      </v-toolbar>-->
    </template>

    <template v-slot:item.image="{ item }">
      <div class="p-2">
        <v-img
          class="rounded-full"
          :src="item.image"
          :alt="item.name"
          max-width="40px"
          max-height="40px"
        ></v-img>
      </div>
    </template>

    <template #item.actions="{ item }">
      <!-- <v-icon class="mr-2" @click="editItem(item)">mdi-dots-vertical</v-icon> -->
      <v-menu offset-y left transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon center v-bind="attrs" v-on="on">
            <v-icon class="w-full">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="i in 2" :key="i" @click="editItem(item)">
            <v-list-item-title>{{ i }} {{$route.params.classid}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
    </template>
    <template #no-data>
      <v-btn color="primary" @click="loadData">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import ClassroomService from '../../../../../services/ClassroomService'
export default {
  data: () => ({
    page: 1,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Image',
        sortable: false,
        value: 'image',
        width: '50px',
      },
      {
        text: 'Display Name',
        value: 'displayName',
      },
      { text: 'Name', value: 'name' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'end' },
    ],
    studentsInClass: [],
    desserts: [],
    selected: [],

    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.loadData()
    if (!this.$store.getters.classroom) {
      this.loadData()
    }
  },

  methods: {
    loadData() {
      ClassroomService.getClassroom(this.$route.params.classroomsid).then(
        (res) => {
          this.$store.commit('setClassroom', res.data)
          this.studentsInClass = this.$store.getters.students.map((student) => {
            return {
              image: student.imageUrl,
              displayName: student.displayName,
              name: `${student.firstName} ${student.lastName}`,
              actions: student.id,
            }
          })
        }
      )
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    itemsPerPage() {
      return this.studentsInClass.length
    },
    // studentsInClass() {
    //   return this.$store.getters.students ? this.$store.getters.students : []
    // },
  },
}
</script>

<style></style>
