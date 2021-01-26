import Vue from "vue";
import Vuex from "vuex";
import { Meteor } from "meteor/meteor";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
  },
  state: {
    currentLocale: null,
    windowTitle: "",
    notifyMessage: ""
  },
  getters: {
  },
  mutations: {
    updateCurrentLocale(state, locale) {
      state.currentLocale = locale;
    },
    notify(state, message) {
      state.notifyMessage = message;
    },
    updateWindowTitle(state, windowTitle) {
      let fullTitle = get(
        Meteor.settings,
        "public.seo.titlePrefix",
        "dgn"
      );
      if (windowTitle) {
        const titleValue = typeof windowTitle === "function" ? windowTitle.call(this) : windowTitle;
        fullTitle = `${fullTitle} - ${titleValue}`;
      }
      state.windowTitle = fullTitle;
    }
  },
  actions: {
    setCurrentLocale(context, locale) {
      context.commit("updateCurrentLocale", locale);
    },

    setWindowTitle(context, windowTitle) {
      context.commit("updateWindowTitle", windowTitle);
    },
    notify(context, message) {
      context.commit("notify", message);
    },
    notifyError(context, error) {
      if (error && error.reason) {
        context.commit("notify", error.reason);
      } else {
        context.commit("notify", error.error);
      }
    }
  }
});
