<template>
  <v-row>
    <v-col cols="12" md="2" class="hidden md:inline-block">
      <v-sheet rounded="lg">
        <v-list color="transparent">
          <v-list-item v-for="page in pages" :key="page" link>
            <v-list-item-content>
              <v-list-item-title class="text-cap-btn flex items-center">
                <!-- <v-icon>mdi-account-reactivate-outline</v-icon> -->
                <v-img
                  :src="page.icon"
                  max-width="20"
                  class="mr-2 fill-amber-400"
                ></v-img>
                {{ page.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item link color="grey lighten-4">
            <v-list-item-content>
              <v-list-item-title> Refresh </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col cols="12" md="10">
      <v-sheet min-height="70vh" rounded="lg"> </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import classroom from '../static/menu_icon/classroom_icon.svg'
import quiz from '../static/menu_icon/quiz_icon.svg'
import notification from '../static/menu_icon/notication_icon.svg'
import more from '../static/menu_icon/more_icon.svg'
export default {
  name: 'IndexPage',
  data() {
    return {
      pages: [
        { title: 'classroom', icon: classroom },
        { title: 'quiz', icon: quiz },
        { title: 'notification', icon: notification },
        { title: 'more', icon: more },
      ],
    }
  },
}
</script>
