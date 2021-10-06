<template>
  <div>
    <!-- containerRight title -->
    <div class="titleRight">
      <v-icon left>mdi-cog</v-icon>
      Settings
    </div>
    <div class="textInputHeading body-1 text-center">
      <strong>Warning:</strong> Usernames are <strong>not</strong> unique, but
      required!
    </div>
    <div class="textInputContainer">
      <v-text-field
        v-model="text"
        label="Your Username"
        counter="25"
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
      text: "",
    };
  },
  created() {
    this.text = this.$store.getters.getUsername;
  },
  watch: {
    text() {
      this.$store.dispatch("change_username", this.text);
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
      this.text = stName;
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
