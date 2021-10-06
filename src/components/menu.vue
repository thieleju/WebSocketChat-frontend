<template>
  <div>
    <!-- containerLeft title -->
    <div class="titleLeft">
      <v-icon left>mdi-forum</v-icon> {{ menu.title }}
    </div>
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

        <v-list-item v-for="channel in menu.channels" :key="channel.id" link>
          <v-list-item-title>{{ channel.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
export default {
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

<style lang="scss">
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
</style>
