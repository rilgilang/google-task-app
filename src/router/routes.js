const routes = [
  {
    path: "/",
    component: () => import("src/layouts/MainLayout.vue"),
    meta: {
      requiresAuth: true, // Add meta field to indicate protected route
    },
    children: [
      { path: "", component: () => import("src/pages/IndexPage.vue") },
      { path: "/task", component: () => import("src/pages/TaskPage.vue") },
      // { path: "/task-list", component: () => import("pages/TaskList.vue") },
    ],
  },
  {
    path: "/login",
    component: () => import("src/layouts/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/LoginPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
