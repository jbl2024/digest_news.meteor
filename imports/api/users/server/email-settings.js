import { Meteor } from "meteor/meteor";
import { MJML } from "/imports/mjml";
import i18n from "/imports/i18n/server/";

/**
 * By default, meteor add '#' for reset password url
 * We override this setting to match our url
 */
Meteor.startup(function () {
  Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl(`reset-password/${token}`);
  };
});

Accounts.config({
  forbidClientAccountCreation: true,
  sendVerificationEmail: Meteor.settings.public.emailVerificationNeeded
});


Accounts.emailTemplates.from = Meteor.settings.email?.from || "noreply@localhost";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    const locale = Meteor.settings.defaultLocale || "en";
    const i18nHelper = i18n(locale.split("-")[0]);

    const prefix = Meteor.settings.email?.prefix || "";
    return `${prefix}${i18nHelper.t("login.activate-email.subject")}`;
  },
  text(user, url) {
    const locale = Meteor.settings.defaultLocale || "en";
    const i18nHelper = i18n(locale.split("-")[0]);
    return i18nHelper.t("login.activate-email.body", { url: url });
  },

  html(user, url) {
    const locale = Meteor.settings.defaultLocale || "en";
    const i18nHelper = i18n(locale.split("-")[0]);

    const email = new MJML(Assets.absoluteFilePath(i18nHelper.t("login.activate-email.template")));
    email.helpers({
      url
    });
    return email.compile();
  }
};
