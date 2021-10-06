<template>
  <div>
    <v-row align="center" style="height: 100%">
      <!-- Menu column -->
      <v-col
        cols="12"
        xs="12"
        sm="4"
        md="3"
        lg="3"
        xl="3"
        class="containerLeft"
      >
        <!-- containerLeft title -->
        <div class="titleLeft">{{ menu.title }}</div>
        <!-- containerLeft content -->
        <v-list class="leftList" dense expand subheader>
          <v-subheader>Channels</v-subheader>

          <v-list-item
            v-for="channel in menu.channels"
            :key="channel.id"
            link
            @click="routeToChannel(channel.channelID)"
          >
            <v-list-item-icon>
              <v-icon>mdi-{{ channel.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ channel.title }}</v-list-item-title>
          </v-list-item>

          <v-subheader>User Settings</v-subheader>

          <v-list-item link @click="routeToName('settings')">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>

          <v-subheader>Users</v-subheader>

          <v-list-group
            :value="true"
            prepend-icon="mdi-account-multiple-outline"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-title>Connected Users</v-list-item-title>
            </template>

            <v-list-item v-for="channel in menu.channels" :key="channel.id">
              <v-list-item-title>{{ channel.title }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
      <!-- Chat column -->
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
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

export default {
  name: "Home",
  data() {
    return {
      menu: {
        title: "",
        channels: [],
      },
    };
  },
  sockets: {
    channel_details(details) {
      this.menu.title = details.menu_name;
      this.menu.channels = details.channels;
    },
  },
  methods: {
    routeToName(name) {
      this.$router.push({ name: "chat." + name }).catch(() => {});
    },
    routeToChannel(channelID) {
      this.$router
        .push({
          name: "chat.channel",
          params: { channelID },
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.containerLeft {
  background: var(--v-background2-base);
  margin-top: 5vh;
  margin-right: 1vw;
  margin-left: auto;
  padding: 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 80vh;
}
.titleLeft {
  background: var(--v-primary-base);
  border-radius: 10px 10px 0 0;
  padding: 10px;
  padding-left: 20px;
  padding-bottom: 6px;
  border-bottom: solid 3px var(--v-background2-base);
}
.leftList {
  background: var(--v-background2-base) !important;
}

.containerRight {
  background: var(--v-background2-base);
  margin-top: 5vh;
  margin-left: 1vw;
  margin-right: auto;
  padding-right: 4px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 80vh;
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
