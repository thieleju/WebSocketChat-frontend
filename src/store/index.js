import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    color: "",
  },
  mutations: {
    CHANGE_USERNAME(state, username) {
      state.username = username;
    },
    CHANGE_COLOR(state, color) {
      state.color = color;
    },
  },
  actions: {
    change_username({ commit }, username) {
      Vue.prototype.$socket.client.emit("update_username", username);
      commit("CHANGE_USERNAME", username);
    },
    change_color({ commit }, color) {
      Vue.prototype.$socket.client.emit("update_color", color);
      commit("CHANGE_COLOR", color);
    },
  },
  getters: {
    getUsername(state) {
      return state.username;
    },
    getColor(state) {
      return state.color;
    },
  },
});
