import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import Schema from "./schema";
import { checkLoggedIn } from "/imports/api/permissions/permissions";

export const Bookmarks = new Mongo.Collection("bookmarks");
Bookmarks.attachSchema(Schema);
Bookmarks.methods = {};

if (Meteor.isServer) {
  Meteor.startup(() => {
    Bookmarks.rawCollection().createIndex({ userId: 1 });
    Bookmarks.rawCollection().createIndex({ deleted: 1 });
  });
}

Bookmarks.methods.insert = new ValidatedMethod({
  name: "bookmarks.insert",
  validate: new SimpleSchema({
    title: { type: String },
    url: { type: String }
  }).validator(),
  run({ title, url }) {
    checkLoggedIn();

    const now = new Date();
    const userId = Meteor.userId();
    const bookmarkId = Bookmarks.insert({
      userId,
      title,
      url,
      createdAt: now,
      updatedAt: now,
      createdBy: userId,
      updatedBy: userId
    });

    return bookmarkId;
  }
});
