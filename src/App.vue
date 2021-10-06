<template>
  <v-app app class="appClass">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>WebSocket Chat App</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main color="secondary">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <transition>
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  sockets: {
    connect() {
      console.log("[Socket.io] Connected!");
    },
    error(error) {
      console.error(error);
    },
  },
};
</script>

<style lang="scss" scoped>
.appClass {
  background: var(--v-background-base) !important;
}
</style>
