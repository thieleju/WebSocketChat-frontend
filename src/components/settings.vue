<template>
  <div>
    <!-- containerRight title -->
    <div class="titleRight">
      <v-icon left>mdi-cog</v-icon>
      Settings
    </div>
    <div class="textInputHeading body-1 text-center">
      <strong>Warning:</strong> Usernames are <strong>NOT</strong> unique, but
      required!
    </div>
    <div class="textInputContainer">
      <v-text-field
        v-model="username"
        label="Your Username"
        :counter="maxChars"
        append-icon="mdi-autorenew"
        @click:append="getNewRandomUserName"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { uniqueNamesGenerator, starWars } from "unique-names-generator";

export default {
  data() {
    return {
      username: "",
      maxChars: 25,
    };
  },
  created() {
    if (this.$store.getters.getUsername) {
      this.username = this.$store.getters.getUsername;
    } else {
      this.getNewRandomUserName();
    }
  },
  watch: {
    username() {
      if (this.username.length <= this.maxChars) {
        if (this.username.length == 0) this.getNewRandomUserName();
        else {
          this.$store.dispatch("change_username", this.username);
          this.$socket.client.emit("update_username", this.username);
        }
      }
    },
  },
  methods: {
    getNewRandomUserName() {
      // get random username
      const stName = uniqueNamesGenerator({
        dictionaries: [starWars],
        separator: " ",
        style: "capital",
      });
      this.username = stName;
    },
  },
};
</script>

<style lang="scss">
.textInputHeading {
  padding: 20px;
  padding-top: 10vh;
}
.textInputContainer {
  padding: 20px;
  padding-top: 10vh;
}
</style>
