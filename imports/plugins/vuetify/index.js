import Vue from "vue";
import Vuetify from "vuetify";

import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export const vuetify = new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: "#363636",
        accent: "#F9A825"
      }
    }
  }
});
