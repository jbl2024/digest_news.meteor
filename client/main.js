import Vue from "vue";

import "../imports/ui/plugins";

import App from "../imports/ui/App.vue";

Meteor.startup(() => {
  // eslint-disable-next-line no-new
  new Vue({
    el: "#app",
    ...App
  });
});
