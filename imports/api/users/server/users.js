import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";

// Disable client insert/remove/update
Meteor.users.deny({
  insert() {
    return true;
  },
  remove() {
    return true;
  },
  update() {
    return true;
  }
});

Meteor.methods({
  "users.create"(userData) {
    check(userData, Object);
    if (Meteor.settings.disableAccountCreation) {
      throw new Meteor.Error("not-authorized");
    }
    const userId = Accounts.createUser(userData);
    if (Meteor.settings.public.emailVerificationNeeded) {
      Accounts.sendVerificationEmail(userId);
    }
  },

  /**
   * This is useful to force log out from
   * oauth2 id provider for example
   */
  "users.getRedirectUrlAfterLogout"() {
    const user = Meteor.user();
    if (!user) {
      return Meteor.absoluteUrl("/");
    }
    if (!user.services?.oidc) {
      return Meteor.absoluteUrl("/");
    }
    const redirectUrl = Meteor.absoluteUrl("/login");
    const redirectParameter = Meteor.settings.auth?.oauth2?.logoutRedirectParameter;
    const baseUrl = Meteor.settings.auth?.oauth2.serverUrl;
    let logoutUrl = Meteor.settings.auth?.oauth2?.logoutUrl;

    if (!logoutUrl || !baseUrl) {
      return null;
    }
    if (redirectParameter) {
      if (logoutUrl.indexOf("?") === -1) {
        logoutUrl = `${logoutUrl}?${redirectParameter}=${redirectUrl}`;
      }
    }
    return `${baseUrl}${logoutUrl}`;
  }
});
