<template>
  <v-footer fixed color="transparent" padless>
    <div class="primary_shade p-2 rounded-lg w-fit mx-auto my-5 space-y-2">
      <div>Item</div>
      <div class="inline-flex gap-2 w-full justify-center">
        <!-- <v-btn
          color="black"
          x-large
          icon
          class="rounded-lg shadow-[inset_0px_4px_0px_#374151] bg-gray-500"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn> -->

        <div
          v-if="pickedItemList.length > 0"
          class="inline-flex gap-2 flex-wrap justify-center"
        >
          <base-item-btn
            v-for="(item, i) in pickedItemList"
            :key="`${i}-${item}`"
            :isShowName="false"
            :description="item?.description"
            :icon="item?.icon"
            :name="item?.name"
          />
        </div>

        <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
          v-model="dialogValue"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="black"
              x-large
              icon
              class="rounded-lg shadow-[inset_0px_4px_0px_#374151] bg-gray-300 dark:bg-gray-600"
              @click="openDialog"
            >
              <v-icon class="dark:!text-gray-300">mdi-shuffle</v-icon>
            </v-btn>
          </template>

          <v-card
            class="overflow-hidden !min-h-[400px] max-h-[600px] w-full relative"
          >
            <!-- <div
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all"
              :class="
                dialogValue
                  ? 'w-[120%] sm:w-[90%] md:w-[60%] lg:w-auto'
                  : 'w-0 h-0'
              "
            > -->
            <v-toolbar flat>
              <v-toolbar-title class="font-bold">Your items</v-toolbar-title>
              <v-spacer />
              <v-btn icon @click="dialogValue = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <div
              :key="renderHaveItem"
              class="opacity-30 sm:opacity-100 transition-all absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-20 sm:translate-y-10 w-[500px] sm:w-[100%] z-0 pl-2"
            >
              <lottie-player
                autoplay
                src="https://assets6.lottiefiles.com/packages/lf20_MtLf9OrM16.json"
              />
            </div>

            <div class="absolute top-[10px] right-[10px] sm:hidden">
              <v-btn icon @click="dialogValue = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>

            <div
              class="flex gap-3 flex-wrap justify-center items-center content-center w-[320px] !mx-auto h-full min-h-[320px] sm:h-[530px] p-3"
            >
              <base-item-btn
                v-for="(item, i) in pickedItemList"
                :key="`${i}-${item}`"
                :description="item?.description"
                :icon="item?.icon"
                :name="item?.name"
                :isBtnLight="true"
              />
            </div>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-footer>
</template>

<script>
import BaseItemBtn from './BaseItemBtn.vue'
import StudentService from '~/services/StudentService'

export default {
  components: { BaseItemBtn },
  props: {
    propPickedItemList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    // renderHaveItem() {
    //   if (this.$route.name === 'lobby-quizId') {
    //     this.timeOut = setTimeout(() => {
    //       this.openDialog()
    //     }, 2000)
    //   }
    // },
  },
  data() {
    return {
      dialogValue: false,
      itemsList: [
        {
          code: 'T003',
          name: 'Add Time',
          icon: 'mdi-clock-outline',
          description: 'Add 10 seconds to the timer',
          color: 'primary',
        },
        {
          code: 'P001',
          name: 'Double Point',
          icon: 'mdi-star',
          description: 'Double the point you get',
          color: 'primary',
        },
      ],
      pickedItemList: [],
      numberOfItemToHave: 4,
      functionTimeToPickItem: null,
      timeOut: null,
      maxNumberItem: 8,
    }
  },
  methods: {
    openDialog() {
      clearTimeout(this.timeOut)
      this.dialogValue = true
      this.$store.commit('SET_ITEMS', [])
      this.pickedItemList = []
      StudentService.randomItems(
        Math.floor(this.$store.getters.quizData.totalQuestion / 5)
      ).then((response) => {
        this.$store.commit('SET_ITEMS', response.data)
      })
      setTimeout(() => {
        this.pickItem()
      }, 1000)
    },

    pickItem() {
      let countItem = 1

      this.functionTimeToPickItem = setInterval(() => {
        if (countItem === this.$store.getters.items.length || countItem === 8) {
          clearInterval(this.functionTimeToPickItem)
          this.functionTimeToPickItem = null
        }
        this.pickedItemList.push(this.$store.getters.items[countItem - 1])
        countItem++
      }, 500)
    },
  },
  computed: {
    renderHaveItem() {
      return this.$store.getters.items.length
    },
  },
  mounted() {
    if (this.$route.name === 'lobby-quizId') {
      this.timeOut = setTimeout(() => {
        this.openDialog()
      }, 2000)
    }
    if (this.propPickedItemList.length > 0) {
      this.pickedItemList = this.propPickedItemList
    }
  },
}
</script>

<style scoped></style>
