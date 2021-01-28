// Tests for the behavior of the bookmarks collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from "meteor/meteor";
import { assert } from "chai";
import { initData } from "/tests/fixtures/fixtures";
import { createStubs, restoreStubs } from "/tests/stubs";

import { Bookmarks } from "/imports/api/bookmarks/bookmarks.js";

if (Meteor.isServer) {
  describe("Bookmarks collection", function () {
    beforeEach(function () {
      initData();
      createStubs();
    });

    afterEach(function () {
      restoreStubs();
    });

    it("insert correctly", function () {
      const bookmarkId = Meteor.call("bookmarks.insert", {
        title: "meteor homepage",
        url: "https://www.meteor.com"
      });
      const added = Bookmarks.find({ _id: bookmarkId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, "bookmarks");
      assert.equal(count, 1);
    });
  });
}
