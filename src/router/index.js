import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Perfil from "../views/Perfil.vue";
import Crud from "../views/Crud.vue";
import { firebase } from "../firebase";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: Perfil,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/crud",
    name: "Crud",
    component: Crud,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next("/");
  } else {
    next();
  }
});

export default router;
