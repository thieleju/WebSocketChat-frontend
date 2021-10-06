import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
  },
  mutations: {
    CHANGE_USERNAME(state, username) {
      state.username = username;
    },
  },
  actions: {
    change_username({ commit }, username) {
      commit("CHANGE_USERNAME", username);
    },
  },
  getters: {
    getUsername(state) {
      return state.username;
    },
  },
});
