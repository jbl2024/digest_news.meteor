import Vue from "vue";

import { vuetify } from "../imports/plugins/vuetify";
import { router } from "../imports/plugins/router";
import { i18n } from "../imports/plugins/i18n";
import { store } from "../imports/store";
import App from "../imports/ui/App.vue";

Meteor.startup(() => {
  // eslint-disable-next-line no-new
  new Vue({
    vuetify,
    router,
    store,
    i18n,
    render: (h) => h(App)
  }).$mount("#app");

  Vue.prototype.$notifyError = function (error) {
    store.dispatch("notifyError", error);
  };

  Vue.prototype.$notify = function (message) {
    store.dispatch("notify", message);
  };
});
