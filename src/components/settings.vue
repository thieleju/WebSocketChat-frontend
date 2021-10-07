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
    <!-- Text field Container -->
    <div class="textInputContainer">
      <v-text-field
        v-model="username"
        label="Your Username"
        :counter="maxChars"
        append-icon="mdi-autorenew"
        @click:append="getNewRandomUserName"
      ></v-text-field>
    </div>
    <div>
      <v-chip-group
        v-model="selection"
        mandatory
        class="chipGroupDesign"
        active-class="chipGroupActive"
      >
        <div>
          <div>
            <v-chip
              v-for="color in colors.lightRow"
              :key="color"
              :color="color"
              link
            >
              &nbsp;&nbsp;
            </v-chip>
          </div>
          <div>
            <v-chip
              v-for="color in colors.darkRow"
              :key="color"
              :color="color"
              link
              >&nbsp;&nbsp;
            </v-chip>
          </div>
        </div>
      </v-chip-group>
    </div>
    <div>
      <div class="messagesWrapperLeftPreview">
        <v-card class="cardLeftPreview">
          <div
            class="caption text-xs nameSpace"
            :style="{ color: currentColor }"
          >
            {{ username }}
          </div>
          <v-card-text class="cardLeftContentPreview"
            >Hello, that's how others see your messages!</v-card-text
          >
        </v-card>
      </div>
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
      selection: 0,
      currentColor: "#1ABC9C",
      colors: {
        lightRow: [
          "#1ABC9C",
          "#2ECC71",
          "#3498DB",
          "#9B59B6",
          "#E91E63",
          "#F1C40F",
          "#E67E22",
          "#E74C3C",
          "#95A5A6",
        ],
        darkRow: [
          "#11806A",
          "#1F8B4C",
          "#206694",
          "#71368A",
          "#AD1457",
          "#C27C0E",
          "#A84300",
          "#992D22",
          "#546E7A",
        ],
      },
    };
  },
  created() {
    if (this.$store.getters.getUsername) {
      this.username = this.$store.getters.getUsername;
    } else {
      this.getNewRandomUserName();
    }
    this.$store.dispatch("change_color", this.currentColor);
  },
  watch: {
    username() {
      if (this.username.length <= this.maxChars) {
        if (this.username.length == 0) this.getNewRandomUserName();
        else {
          this.$store.dispatch("change_username", this.username);
          // this.$socket.client.emit("update_username", this.username);
        }
      }
    },
    selection(newVar) {
      if (newVar < this.colors.lightRow.length)
        this.currentColor = this.colors.lightRow[newVar];
      else
        this.currentColor =
          this.colors.darkRow[newVar - this.colors.lightRow.length];
      this.$store.dispatch("change_color", this.currentColor);
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
  padding-top: 8vh;
}
.textInputContainer {
  padding: 20px;
  padding-top: 8vh;
}
.chipGroupDesign {
  // display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 6vh;
  padding-top: 3vh;
}
.chipGroupActive {
  outline: 3px solid var(--v-primary-base) !important;
}
.v-slide-group__wrapper {
  padding-left: 2px;
}

//  classes from channel.vue
.messagesWrapperLeftPreview {
  flex-grow: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  padding-right: 15px;
  margin-bottom: 8px;
  margin-top: 2px;
}
.cardLeftPreview {
  background: var(--v-secondary-base) !important;
}
.cardLeftContentPreview {
  text-align: -webkit-left;
  margin-bottom: 1.5vh;
  padding-bottom: 5px !important;
  padding-top: 3px !important;
  margin-bottom: 3px !important;
}
</style>
