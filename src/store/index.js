import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
  },
  mutations: {
    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    },
  },
  actions: {
    socket_chatMessage({ commit }, data) {
      console.log("message event", data);
      commit("ADD_MESSAGE", data);

      // this._vm.$socket.client.emit("message_received", true);
    },
  },
  modules: {},
});
