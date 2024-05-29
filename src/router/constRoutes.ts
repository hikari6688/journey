const constRoutes = [
  { path: "/login", component: () => import("@/views/login/index.vue") },
  { path: "/", component: () => import("@/layout/index.vue") },
];

export default constRoutes;
