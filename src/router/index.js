import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "main",
    meta: {
      title: "main",
    },
  },
  {
    path: "/unocss",
    name: "unocss",
    component: () => import("@/views/unocss/index.vue"),
    meta: {
      title: "unocss",
    },
    children: [
      {
        path: "page1",
        name: "unocssPage1",
        component: () => import("@/views/unocss/page1.vue"),
        meta: {
          title: "unocssPage1",
        },
      },
      {
        path: "page2",
        name: "unocssPage2",
        component: () => import("@/views/unocss/page2.vue"),
        meta: {
          title: "unocssPage2",
        },
      },
    ],
  },
];
export default new VueRouter({
  routes, // short for `routes: routes`
});
