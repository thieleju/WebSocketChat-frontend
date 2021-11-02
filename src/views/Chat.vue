<template>
  <div>
    <v-row align="center" style="height: 100%">
      <!-- Menu column -->
      <v-col
        cols="12"
        xs="12"
        sm="4"
        md="3"
        lg="2"
        xl="2"
        class="containerLeft"
      >
        <leftMenu></leftMenu>
      </v-col>
      <!-- Chat column -->
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="5"
        xl="4"
        class="containerRight"
      >
        <transition name="fade" mode="out-in">
          <router-view :key="$route.path"></router-view>
        </transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import moment from "moment";
import leftMenu from "../components/menu.vue";

export default {
  name: "Home",
  components: {
    leftMenu,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.containerLeft {
  margin-bottom: auto;
  margin-top: 5vh;
  margin-right: 1vw;
  margin-left: auto;
  padding: 0;
  border-radius: 10px;
  z-index: 5;
}

.containerRight {
  background-color: var(--v-background2-base);
  margin-top: 5vh;
  margin-left: 1vw;
  margin-right: auto;
  padding-right: 4px;
  border-radius: 10px;
  z-index: 5;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
