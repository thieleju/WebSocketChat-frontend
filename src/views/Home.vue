<template>
  <div>
    <v-row align="center" justify="center" style="height: 100%">
      <v-col cols="12" xs="12" sm="11" md="9" lg="7" xl="6" class="container">
        <!-- Container content -->
        <vuescroll :ops="ops" class="vuescroll" ref="chat">
          <div class="messagesWrapper" :ops="ops">
            <div
              v-for="message in messages"
              :key="message.id + message.msg + makeid(12)"
              class="loop"
            >
              <v-card class="cardRight">
                <v-card-text
                  class="cardRightContent"
                  v-html="message.msg"
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
          rows="3"
          @keydown="inputHandler"
        >
        </v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import moment from "moment";
import vuescroll from "vuescroll";

export default {
  name: "Home",
  components: {
    vuescroll,
  },
  data() {
    return {
      messages: [],
      text: "",
      currentOnlineMembers: 0,
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
  sockets: {
    chat_old_messages(msgs) {
      this.messages = msgs;
      this.$refs.chat.scrollTo({ y: "100%" }, 500, "easeOutQuint");
    },
    chat_message(id, msg) {
      this.messages.push({ id, msg });
    },
    current_connected_count(count) {
      this.currentOnlineMembers = count;
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
      if (this.text.trim().length > 1) {
        this.$socket.client.emit("chat_message", this.text);
        this.text = "";
      } else this.text = "";
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

<style lang="scss" scoped>
.container {
  background: var(--v-background2-base) !important;
  margin-top: 5vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  max-height: 80vh;
}
.vuescroll {
  min-height: 60vh;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
}
.containerContent {
  min-height: 100%;
  overflow: auto !important;
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
}
.messagesWrapper {
  flex-grow: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: auto;
  padding-right: 15px;
}
</style>
