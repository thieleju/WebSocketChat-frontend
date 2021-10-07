<template>
  <div>
    <div class="headCont" v-if="enabled">
      <!-- containerRight title -->
      <div class="titleRight">
        <v-icon left>mdi-{{ icon }}</v-icon>
        {{ title }} - {{ username }}
      </div>
      <!-- containerRight content -->
      <vuescroll :ops="ops" class="vuescroll" ref="chat">
        <div v-for="message in messages" :key="message.socketID + makeid(12)">
          <!-- Other messages -->
          <div class="messagesWrapperLeft" v-if="message.user.name != username">
            <v-card class="cardLeft">
              <div class="caption text-xs nameSpace">
                {{ message.user.name }}
              </div>
              <v-card-text
                class="cardLeftContent"
                v-html="message.text"
              ></v-card-text>
            </v-card>
          </div>
          <!-- Own messages -->
          <div
            class="messagesWrapperRight"
            v-if="message.user.name == username"
          >
            <v-card class="cardRight">
              <v-card-text
                class="cardRightContent"
                v-html="message.text"
              ></v-card-text>
            </v-card>
          </div>
        </div>
      </vuescroll>
      <v-textarea
        v-model="text"
        placeholder="Type your message ..."
        no-resize
        rows="2"
        @keydown="inputHandler"
        :counter="maxChars"
        auto-grow
        class="textarea"
      >
      </v-textarea>
    </div>
    <div v-else>
      <!-- containerRight title -->
      <div class="titleRight">Oops you found a dead channel!</div>
    </div>
  </div>
</template>

<script>
import vuescroll from "vuescroll";

export default {
  components: {
    vuescroll,
  },
  data() {
    return {
      enabled: false,
      id: 0,
      username: "",
      color: "",
      channelID: "",
      title: "",
      icon: "",
      text: "",
      messages: [],
      maxChars: 200,
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true,
          locking: false,
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          easing: "easeOutQuint",
          verticalNativeBarPos: "right",
        },
        rail: {
          background: "",
          opacity: 0,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "2px",
          keepShow: false,
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: "#38A3A5",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: 0,
          size: "6px",
          disable: false,
        },
      },
    };
  },
  mounted() {
    // TODO https://www.npmjs.com/package/lzutf8
    // set username
    this.username = this.$store.getters.getUsername;

    // send update to trigger "messages_update_for_channel"
    this.channelID = this.$route.params.channelID;
    this.$socket.client.emit("update_messages_for_channel", this.channelID);
  },
  sockets: {
    messages_update_for_channel(data) {
      // filter messages for specific channel, ignore others
      if (data.channelID == this.channelID) {
        this.id = data.channel.id;
        this.title = data.channel.title;
        this.icon = data.channel.icon;
        this.messages = data.channel.messages;
        this.enabled = true;
      } else {
        // TODO update other channels icons
      }
    },
  },
  watch: {
    messages() {
      this.$nextTick().then(() => {
        this.$refs.chat.scrollTo({ y: "100%" }, 500, "easeOutQuint");
      });
    },
  },
  methods: {
    inputHandler(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    },
    sendMessage() {
      if (this.text.trim() == "") {
        console.log("empty");
      } else if (this.text.trim().length <= this.maxChars) {
        this.$socket.client.emit("add_message_to_channel", {
          channelID: this.channelID,
          message: this.text.trim(),
          user: {
            name: this.username,
            color: this.color,
          },
        });
        this.text = "";
      } else {
        console.log("too many chars");
      }
    },
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
};
</script>

<style lang="scss">
.headCont {
  display: flex;
  flex-direction: column;
  height: 77vh;
}
.titleRight {
  background: var(--v-primary-base);
  margin: 0;
  min-height: 2.5em;
  margin-right: -4px;
  margin-left: -12px;
  margin-top: -12px;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  padding-left: 20px;
  border-bottom: solid 3px var(--v-background2-base);
}
.vuescroll {
  height: 60vh;
  display: flex;
  flex-direction: column;
}
.containerContent {
  min-height: 100%;
  overflow: auto;
}
.loop {
  max-width: 70%;
}
.cardRight {
  background: var(--v-primary-base) !important;
}
.cardRightContent {
  text-align: -webkit-left;
  margin-bottom: 1.5vh;
  padding-bottom: 5px !important;
  padding-top: 10px !important;
  margin-bottom: 3px !important;
}
.cardLeft {
  background: var(--v-secondary-base) !important;
}
.cardLeftContent {
  text-align: -webkit-left;
  margin-bottom: 1.5vh;
  padding-bottom: 5px !important;
  padding-top: 3px !important;
  margin-bottom: 3px !important;
}
.nameSpace {
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 4px;
  padding-bottom: 0;
}
.messagesWrapperLeft {
  flex-grow: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
  padding-right: 15px;
  margin-bottom: 8px;
  margin-top: 2px;
  max-width: 75%;
}
.messagesWrapperRight {
  flex-grow: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: auto;
  padding-right: 15px;
  margin-top: 2px;
  margin-bottom: 8px;
  margin-left: auto;
  margin-right: 0;
  max-width: 75%;
}
.textarea {
  padding-right: 11px;
}
</style>
