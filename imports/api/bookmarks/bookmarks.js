import { Meteor } from "meteor/meteor";
import Schema from "./schema";

export const Bookmarks = new Mongo.Collection("bookmarks");
Bookmarks.attachSchema(Schema);
Bookmarks.methods = {};

if (Meteor.isServer) {
  Meteor.startup(() => {
    Bookmarks.rawCollection().createIndex({ userId: 1 });
    Bookmarks.rawCollection().createIndex({ deleted: 1 });
  });
}
