import Vue from "vue";

import { vuetify } from "../imports/plugins/vuetify";
import { router } from "../imports/plugins/router";
import { i18n } from "../imports/i18n";
import confirm from "/imports/ui/confirm/confirm";
import "../imports/ui/plugins";
import { store } from "../imports/store";
import App from "../imports/ui/App.vue";

Vue.use(confirm, { vuetify });

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
