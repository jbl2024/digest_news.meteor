import { Meteor } from "meteor/meteor";


if (Meteor.isServer) {
  Accounts.validateLoginAttempt(function (attemptObj) {
    if (!attemptObj.user) {
      return false;
    }

    if (
      !Meteor.settings.public.emailVerificationNeeded
      || attemptObj.user.emails[0].verified === true
    ) {
      return true;
    }
    throw new Meteor.Error(
      "email-not-verified",
      "You must verify your email address before you can log in"
    );
  });
}

export const checkLoggedIn = () => {
  if (!Meteor.userId()) {
    throw new Meteor.Error("not-authorized");
  }
};
