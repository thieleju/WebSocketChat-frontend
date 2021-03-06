<template>
  <v-app app class="appClass">
    <v-app-bar app dark flat>
      <!-- <v-toolbar-title>Chat App with Socket.io</v-toolbar-title> -->
      <!-- <v-spacer></v-spacer> -->

      <v-tabs centered class="ml-n9" v-model="active_tab">
        <v-tab v-for="(app, i) in topApps" :key="i" @click="routeTo(app.route)">
          {{ app.name }}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <GithubCorner
      url="https://me.node5.de"
      flipOnHover
      cornerColor="#161B22"
      :size="62"
    ></GithubCorner>

    <!-- Sizes your content based upon application components -->
    <v-main color="primary">
      <particlesJS
        style="position: absolute; width: 100%; height: 100%"
      ></particlesJS>

      <!-- Provides the application the proper gutter -->
      <v-container fluid class="bringToFront">
        <transition name="fade" mode="out-in">
          <router-view class="routerViewFill"></router-view>
        </transition>
      </v-container>
    </v-main>

    <!-- <v-footer app> </v-footer> -->
    <v-footer color="grey darken-4" class="py-1">
      <span class="mr-auto overline">Node 5 &copy;2021</span>
      <v-spacer></v-spacer>
      <a class="mr-auto overline" @click="showDSGVO">Datenschutzerklärung</a>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <a class="mr-auto overline" @click="showImpressum">Impressum</a>
    </v-footer>

    <!-- Loading overlay -->
    <v-overlay :value="showOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import GithubCorner from "vue-github-corners";
import particlesJS from "./components/particlesJS";

export default {
  name: "App",
  components: {
    GithubCorner,
    particlesJS,
  },
  sockets: {
    connect() {
      this.showOverlay = false;
      console.log("[Socket.io] Connected!");
    },
    error(error) {
      console.error(error);
    },
  },
  data() {
    return {
      showOverlay: null,
      impressum: null,
      dsgvo: null,
      active_tab: 0,
      topApps: [
        {
          name: "Home",
          route: "home",
        },
        {
          name: "Chat",
          route: "chat.settings",
        },
        {
          name: "Raspberry PI",
          route: "pi.home",
        },
      ],
    };
  },
  mounted() {
    // set currently active tab selected
    this.active_tab = this.topApps.findIndex(
      (el) => el.route === this.$route.name
    );
  },
  methods: {
    routeTo(name) {
      this.$router.push({ name }).catch(() => {});
    },
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

<style lang="scss">
.routerViewFill {
  width: 100%;
  height: 100%;
}

.appClass {
  background: var(--v-background-base) !important;
  overflow: hidden !important;
}

#vue-github-corner {
  position: relative;
  z-index: 5;
}

.bringToFront {
  position: relative;
  z-index: 5;
}
</style>
