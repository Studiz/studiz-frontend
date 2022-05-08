<template>
  <v-app>
    <v-app-bar
      fixed
      app
      flat
      class="bg-primary"
      height="70"
      color="#FFF"
    >
      <div class="flex justify-between items-center container">
        <img src="../assets/logo/Studiz logo.svg" />
        <v-switch v-model="$vuetify.theme.dark" hide-details inset></v-switch>
        <v-menu offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Dropdown
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in route"
              :key="index"
              :to="item.to"
            >
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-title>{{ item.title }}sdfsfsdfsd</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main class="web-theme">
      <v-container>
        <v-list>
          <v-list-item v-for="(item, i) in route" :key="i" :to="item.to">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      route: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'test',
          to: '/teste',
        },
      ],
      offset: true,
    }
  },
}
</script>

<style scoped></style>
