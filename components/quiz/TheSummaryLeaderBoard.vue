<template>
  <div class="h-full max-w-6xl mx-auto">
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
      :items="renderMembersInClass"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      @click:row="clickRow"
    >
      <template #top>
        <v-toolbar-title
          class="font-semibold p-3 flex items-center gap-x-5 flex-wrap"
        >
          <span class>Leader board 👑</span>
          <v-spacer />
        </v-toolbar-title>
      </template>

      <template v-slot:item.image="{ item }">
        <v-img
          v-if="item?.image"
          class="rounded-full w-10 h-10 background"
          :src="item?.image"
          :alt="item?.name"
          max-width="40px"
          max-height="40px"
        ></v-img>
        <v-icon v-else size="40" color="white">mdi-account-circle</v-icon>
      </template>

      <template v-slot:item.scoreInRound="{ item }">
        <span class="font-semibold text-green-500" v-if="item.scoreInRound > 0"
          >{{ item.scoreInRound }}+</span
        >
      </template>

      <template v-slot:item.index="{ index }">
        <div class="p-2">{{ index + 1 }}</div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    membersInClass: {
      type: Array,
    },
  },
  data: () => ({
    page: 1,
    isloading: false,
  }),

  created() {
    // this.loadData()
    // this.isloading = true
  },

  methods: {
    clickRow(item) {
      this.$emit('choose-member', item)
    },
  },
  computed: {
    itemsPerPage() {
      return this.membersInClass?.length
    },
    headers() {
      let headers = [
        {
          text: '#',
          sortable: false,
          value: 'index',
          align: 'center',
          width: '48px',
        },
        {
          text: 'Image',
          sortable: false,
          value: 'image',
          width: '40px',
          align: 'center',
        },
        {
          text: 'Display name',
          value: 'displayName',
          sortable: false,
        },
        {
          text: 'Name',
          value: 'name',
          sortable: false,
        },
        {
          text: 'Role',
          value: 'role',
          sortable: false,
        },
        { text: 'Score', value: 'score', sortable: false, align: 'end' },
        {
          text: 'Correct',
          value: 'numberCorrectAnswers',
          sortable: false,
          align: 'end',
        },
        {
          text: 'Incorrect',
          value: 'numberInCorrectAnswers',
          sortable: false,
          align: 'end',
        },
        {
          text: 'Total',
          value: 'numberQuestions',
          sortable: false,
          align: 'right',
        },
      ]

      if (this.$route.path.startsWith('/summary')) {
        if (this.$store.getters.userRole == 'TEACHER') {
        }
      }
      return headers
    },

    renderMembersInClass() {
      return this.membersInClass.map((member, index) => {
        return {
          index: index,
          image: member.user.imageUrl,
          displayName: member.user.displayName,
          name:
            member.user.role == 'STUDENT'
              ? member.user.firstName + ' ' + member.user.lastName
              : '',
          role: member.user.role,
          score: member.totalScore,
          numberCorrectAnswers: member.numberCorrectAnswers,
          numberInCorrectAnswers: member.numberInCorrectAnswers,
          numberQuestions: member.numberQuestions,
        }
      })
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
  @apply bg-light_primary/30;
}
:deep(tbody > tr:nth-child(1) > td:nth-child(3))::before {
  content: '👑';
  @apply rounded-full px-[1px] py-[2px] bg-white/30  mr-2;
}
:deep(tbody > tr:nth-child(2) > td) {
  @apply bg-light_primary/20;
}
:deep(tbody > tr:nth-child(3) > td) {
  @apply bg-light_primary/10;
}
:deep(tbody > tr) {
  @apply cursor-pointer;
}
</style>
