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
      },
      {
        path: "settings",
        name: "chat.settings",
        component: settings,
      },
      {
        path: "channel/:channelID",
        name: "chat.channel",
        component: channel,
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

export default router;
