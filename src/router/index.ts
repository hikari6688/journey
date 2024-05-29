import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./constRoutes";
import withGuard from "./withGuard";
const router = createRouter({
  history: createWebHashHistory(),
  routes, 
});

export default withGuard(router);
