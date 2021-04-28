import Vue from "vue";
import VueRouter from "vue-router";
import * as auth from "../Services/AuthService";
import Home from "../views/Home.vue";
import Login from "../views/authentication/Login.vue";
import SignUp from "../views/authentication/SignUp.vue";
import addRecipe from "../views/Recipes/NewRecipe.vue";
import editRecipe from "../views/Recipes/RecipeEdit.vue";
import SingleRecipe from "../views/Recipes/SingleRecipe.vue";
import Dashboard from "../views/Recipes/Dashboard.vue";
import Favorites from "../views/Recipes/FavoriteRecipe.vue";
import TestNew from "../views/Recipes/TestNewRecipe.vue";
import Groceries from '../views/Grocery/Groceries.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      } else {
        next("/dashboard");
      }
    },
  },
  {
    path: "/sign-up",
    name: "Sign-Up",
    component: SignUp,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/test-new",
    name: "TestNew",
    component: TestNew,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      }if (auth.isLoggedIn()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/recipe/add-recipe",
    name: "New-Recipe",
    component: addRecipe,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/recipe/:id",
    name: "Edit-recipe",
    component: editRecipe,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    },
  },
  
  {
    path: "/groceries",
    name: "Groceries",
    component: Groceries,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/single-recipe/:id",
    name: "SingleRecipe",
    component: SingleRecipe,
    beforeEnter: (to, from, next) => {
      if (!auth.isLoggedIn()) {
        next();
      } else if (auth.isLoggedIn()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: Favorites,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
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
