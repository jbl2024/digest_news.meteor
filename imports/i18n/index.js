import VueI18n from "vue-i18n";
import Vue from "vue";
import messages from "./i18n";

let { language } = navigator;
if (language.startsWith("en-")) {
  language = "en";
}

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: language,
  fallbackLocale: "en",
  silentTranslationWarn: true,
  messages
});
