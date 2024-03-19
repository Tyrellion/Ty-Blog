import { createRouter, createWebHistory } from "vue-router";

let routes = [
  {
    path: "/test",
    name: "test",
    component: () => import("../test/test.vue"),
  },
  { path: "/menu", component: () => import("../test/menu.vue") },
  { path: "/login", component: () => import("../pages/Login.vue") },
  {
    path: "/dashboard",
    component: () => import("../pages/dashboard/Dashboard.vue"),
    children: [
      { path: "/dashboard/category", component: () => import("../pages/dashboard/Category.vue") },
        { path: "/dashboard/article", component: () => import("../pages/dashboard/Article.vue") },
    ],
  },
  { path: "/", component: () => import("../pages/homePage.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
