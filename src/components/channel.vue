<template>
  <div>
    <div class="headCont" v-if="enabled">
      <!-- containerRight title -->
      <div class="titleRight">{{ title }}</div>
      <!-- containerRight content -->
      <vuescroll :ops="ops" class="vuescroll" ref="chat">
        <div class="messagesWrapper" :ops="ops">
          <div
            v-for="message in messages"
            :key="message.socketID + makeid(12)"
            class="loop"
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
        autofocus
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
      channelID: "",
      title: "",
      icon: "",
      text: "",
      messages: [],
      maxChars: 140,
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
            name: "name",
            color: "red",
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
  display: flex;
  flex-direction: column;
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
  padding-bottom: 8px;
  padding-top: 8px;
}
.messagesWrapper {
  flex-grow: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: auto;
  padding-right: 15px;
}
.textarea {
  padding-right: 11px;
}
</style>
