<template>
  <div>
    <hello-world />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Home",

  components: {
    HelloWorld,
  },
  data() {
    return {
      messages: [],
    };
  },
  sockets: {
    chat_message(id, msg) {
      this.messages.push({ id, msg });
    },
  },
};
</script>
