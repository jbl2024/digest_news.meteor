import { isBasicAuth } from "./check-auth";

import NotFound from "/imports/ui/pages/NotFound/NotFound.vue";

import Auth from "/imports/ui/layout/Auth.vue";
import Login from "/imports/ui/pages/Auth/Login.vue";
import Forbidden from "/imports/ui/pages/Forbidden/Forbidden.vue";
import RegistrationCompleted from "/imports/ui/pages/Auth/RegistrationCompleted.vue";
import Register from "/imports/ui/pages/Auth/Register.vue";
import ForgotPassword from "/imports/ui/pages/Auth/ForgotPassword.vue";
import ResetPassword from "/imports/ui/pages/Auth/ResetPassword.vue";

import HomePage from "/imports/ui/pages/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    beforeEnter: isBasicAuth
  },
  {
    path: "/forbidden/",
    name: "forbidden",
    component: Forbidden
  },
  {
    path: "/login",
    component: Auth,
    redirect: { name: "login" },
    children: [
      {
        path: "/login",
        name: "login",
        component: Login
      },
      {
        path: "/registration-completed",
        name: "registration-completed",
        component: RegistrationCompleted
      },
      {
        path: "/register",
        name: "register",
        component: Register
      },
      {
        path: "/forgot-password",
        name: "forgot-password",
        component: ForgotPassword
      },
      {
        path: "/reset-password/:token",
        name: "reset-password",
        component: ResetPassword
      }
    ]
  },
  { path: "*", name: "not-found", component: NotFound }
];

export default routes;
