<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
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
    greetings(data) {
      console.log("[Socket.io] " + data);
    },
  },
};
</script>
