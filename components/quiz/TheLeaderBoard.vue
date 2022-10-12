<template>
  <div class="h-full max-w-md mx-auto">
    <v-data-table
      class="elevation-0 drop-shadow-md !rounded-lg"
      mobile-breakpoint="0"
      item-key="displayName"
      hide-default-footer
      loading-text="Loading... Please wait"
      sort-by="score"
      :sort-desc="true"
      :loading="isloading"
      :headers="headers"
      :items="membersInClass"
      :page.sync="page"
      :items-per-page="itemsPerPage"
    >
      <template #top>
        <v-toolbar-title class="font-semibold p-3 flex items-center gap-x-5 flex-wrap">
          <span class>Leader board 👑</span>
          <v-spacer />
        </v-toolbar-title>
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
      <template v-slot:item.index="{ index }">
        <div class="p-2">{{ index + 1 }}</div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import BaseDialogCondition from '~/components/BaseDialogCondition.vue'
import ClassroomService from '~/services/ClassroomService'
export default {
  components: { BaseDialogCondition },
  props: {
    membersInClass: {
      type: Array,
    },
  },
  data: () => ({
    page: 1,

    headers: [
      {
        text: '#',
        sortable: false,
        value: 'index',
        align: 'center',
        width: '48px',
      },
      {
        text: '',
        sortable: false,
        value: 'image',
        width: '56px',
      },
      {
        text: 'Display Name',
        value: 'displayName',
        sortable: false,
      },
      // { text: 'Name', value: 'name', sortable: false },
      { text: 'Score', value: 'score', sortable: false, align: 'end' },
    ],

    isloading: false,
  }),

  created() {
    // this.loadData()
    console.log(this.membersInClass)
    // this.isloading = true
  },

  methods: {
    loadData() {
      ClassroomService.getClassroom('mAA7cF92ibcyaaysUlik').then((res) => {
        this.$store.commit('setClassroom', res.data)
        this.isloading = false
        this.membersInClass = this.$store.getters.students.map(
          (student, index) => {
            return {
              image: student.imageUrl,
              displayName: student.displayName,
              name: `${student.firstName} ${student.lastName}`,
              score: index + 1 * 10,
            }
          }
        )
      })
    },
  },
  computed: {
    itemsPerPage() {
      return this.membersInClass.length
    },
  },
}
</script>

<style scoped>
.v-data-table {
  background-color: var(--v-background_card-base) !important;
  @apply p-2;
}

:deep(thead > tr > th:nth-child(2)),
:deep(tbody > tr > td:nth-child(2)) {
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

:deep(tbody > tr > td:nth-child(1)) {
  @apply rounded-l-lg;
}
:deep(tbody > tr > td:nth-last-child(1)) {
  @apply rounded-r-lg;
}
:deep(tbody > tr:nth-child(1) > td) {
  @apply bg-light_primary/50 dark:bg-light_primary/50;
}
:deep(tbody > tr:nth-child(1) > td:nth-child(3))::before {
  content: '👑';
  @apply rounded-full px-[1px] py-[2px] bg-white/50;
}
:deep(tbody > tr:nth-child(2) > td) {
  @apply bg-light_primary/30 dark:bg-light_primary/30;
}
:deep(tbody > tr:nth-child(3) > td) {
  @apply bg-light_primary/10 dark:bg-light_primary/10;
}
</style>
