<template>
  <v-app>
    <create-navbar />
    <v-navigation-drawer absolute bottom permanent app clipped width="192px">
      <v-list nav>
        <draggable v-model="numberArrary">
          <transition-group type="transition">
            <!-- <v-list-item-group> -->
            <v-list-item
              v-for="i in numberArrary"
              :key="i"
              class="transition-all duration-300 hover:bg-red-500"
              @click="activeItem(i)"
              :class="{ 'bg-gray-500': i === selectedItem }"
            >
              <v-list-item-title>{{ i }}</v-list-item-title>
            </v-list-item>
            <!-- </v-list-item-group> -->
          </transition-group>
        </draggable>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer absolute bottom permanent app right>
      <v-list nav>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import draggable from 'vuedraggable'
import createNavbar from '~/components/navbar/createNavbar.vue'
export default {
  components: { createNavbar, draggable },
  data() {
    return {
      selectedItem: 1,
      numberArrary: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
    }
  },
  methods: {
    activeItem(i) {
      this.selectedItem = i
    },
  },
}
</script>

<style></style>
