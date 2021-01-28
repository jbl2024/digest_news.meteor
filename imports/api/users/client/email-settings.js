import { Meteor } from "meteor/meteor";

Accounts.config({
  forbidClientAccountCreation: true,
  sendVerificationEmail: Meteor.settings.public.emailVerificationNeeded
});

/* eslint no-underscore-dangle: "off" */
delete Accounts._accountsCallbacks["verify-email"];
Accounts.onEmailVerificationLink(function (token, done) {
  Accounts.verifyEmail(token, (err) => {
    if (err) {
      /* eslint no-console:off */
      console.log("Error: ", err);
    } else {
      /* eslint no-console:off */
      console.log("Success");
      // Do whatever you want to on completion, the
      // done() call is the default one.
      done();
    }
  });
});