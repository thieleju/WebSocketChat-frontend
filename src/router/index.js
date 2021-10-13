import Vue from "vue";
import VueRouter from "vue-router";

// home
import Home from "../views/Home.vue";

// chat
import Chat from "../views/Chat.vue";
import settings from "../components/settings.vue";
import channel from "../components/channel.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
    meta: { title: "Home" },
  },
  {
    path: "/chat",
    component: Chat,
    children: [
      {
        path: "",
        redirect: { name: "chat.settings" },
      },
      {
        path: "settings",
        name: "chat.settings",
        component: settings,
        meta: { title: "Chat - Settings" },
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
  // redirect to settings if chat is visited
  if (store.getters.getUsername || to.name == "chat.settings") {
    next();
  } else if (to.name.slice(0, 4) === "chat") {
    next({ name: "chat.settings" });
  } else {
    next();
  }
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    if (to.name.slice(0, 4) === "chat") {
      if (store.getters.getUsername)
        document.title = store.getters.getUsername + " - node5";
      else document.title = to.meta.title + " - node5";
    } else {
      document.title = to.meta.title + " - node5";
    }
  });
});

export default router;
