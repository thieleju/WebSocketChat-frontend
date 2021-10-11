<template>
  <v-app app class="appClass">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Socket.io Chat App</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main color="primary">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <transition>
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>

    <!-- <v-footer app> </v-footer> -->
    <v-footer color="grey darken-4" class="py-1">
      <span class="mr-auto overline">Node 5 Chat &copy;2021</span>
      <v-spacer></v-spacer>
      <a class="mr-auto overline" @click="showDSGVO">Datenschutzerklärung</a>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <a class="mr-auto overline" @click="showImpressum">Impressum</a>
    </v-footer>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      impressum: null,
      dsgvo: null,
    };
  },
  sockets: {
    connect() {
      console.log("[Socket.io] Connected!");
    },
    error(error) {
      console.error(error);
    },
  },
  methods: {
    showImpressum() {
      if (!this.impressum) {
        axios.get("/impressum").then((data) => {
          this.impressum = data.data;
          this.showSwal(data.data);
        });
      } else this.showSwal(this.impressum);
    },
    showDSGVO() {
      if (!this.dsgvo) {
        axios.get("/dsgvo").then((data) => {
          this.dsgvo = data.data;
          this.showSwal(data.data);
        });
      } else this.showSwal(this.dsgvo);
    },
    showSwal(data) {
      Swal.fire({
        width: 800,
        html: data,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        showClass: {
          popup: "impressum",
        },

        confirmButtonText: '<i class="fa"></i> Close',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.appClass {
  background: var(--v-background-base) !important;
}

.impressum {
  text-align: justify !important;
}
</style>
