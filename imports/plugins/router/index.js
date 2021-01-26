import { Meteor } from "meteor/meteor";
import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  base: new URL(Meteor.absoluteUrl()).pathname,
  routes
});
