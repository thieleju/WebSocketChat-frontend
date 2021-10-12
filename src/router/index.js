import Vue from "vue";
import VueRouter from "vue-router";
import Chat from "../views/Chat.vue";
import settings from "../components/settings.vue";
import channel from "../components/channel.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Chat,
    children: [
      {
        path: "",
        component: settings,
        meta: { title: "Settings" },
      },
      {
        path: "settings",
        name: "chat.settings",
        component: settings,
        meta: { title: "Settings" },
      },
      {
        path: "channel/:channelID",
        name: "chat.channel",
        component: channel,
        meta: { title: "Channel" },
      },
    ],
  },
  {
    // fallback route
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

import store from "../store/index";

router.beforeEach((to, from, next) => {
  if (store.getters.getUsername || to.name == "chat.settings") {
    next();
  } else {
    next({ name: "chat.settings" });
  }
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    if (store.getters.getUsername)
      document.title = store.getters.getUsername + " - " + to.meta.title;
    else document.title = to.meta.title;
  });
});

export default router;
