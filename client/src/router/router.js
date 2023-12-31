import { createRouter, createWebHistory } from 'vue-router';

    let routes= [
      {
        path: '/test',
        name: 'test',
        component: () => import('../test/test.vue')
      },
      { path: "/menu", component: () => import("../test/menu.vue") },
    ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router