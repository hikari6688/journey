//添加全局路由守卫逻辑配置
import { type Router } from "vue-router";
export default function withGuard(router: Router): Router {
  router.beforeEach((to, from, next) => {
    next();
  });
  return router;
}
