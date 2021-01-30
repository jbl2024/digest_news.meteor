import SimpleSchema from "simpl-schema";
import { HTTP } from "meteor/jkuester:http";

import { Bookmarks } from "../bookmarks";
import { checkLoggedIn } from "/imports/api/permissions/permissions";

Bookmarks.methods.update = new ValidatedMethod({
  name: "bookmarks.update",
  validate: new SimpleSchema({
    id: { type: String },
    title: { type: String },
    url: { type: String }
  }).validator(),
  run({ id, title, url }) {
    checkLoggedIn();

    const now = new Date();
    const userId = Meteor.userId();

    const existingBookmark = Bookmarks.findOne({ _id: id });
    if (!existingBookmark) {
      throw new Meteor.Error("not-found");
    }

    const bookmark = {
      title: title,
      url: url,
      updatedBy: userId,
      updatedAt: now
    };

    Bookmarks.update({ _id: id }, { $set: bookmark });
    Meteor.call("bookmarks.crawlMetadata", { id: id });

    // if (true /* existingBookmark.url !== bookmark.url */) {
    //   Meteor.call("bookmarks.crawlMetadata", { id: bookmark._id });
    // }
  }
});

Bookmarks.methods.find = new ValidatedMethod({
  name: "bookmarks.find",
  validate: new SimpleSchema({
    page: { type: Number },
    name: { type: String, optional: true }
  }).validator(),
  run({ page, title }) {
    checkLoggedIn();

    const perPage = 10;
    const skip = (page - 1) * perPage;

    const query = {};

    if (title && title.length > 0) {
      query.title = {
        $regex: `.*${title}.*`,
        $options: "i"
      };
    }

    const count = Bookmarks.find(query).count();
    const data = Bookmarks.find(query, {
      skip,
      limit: perPage,
      sort: {
        updatedAt: -1
      }
    }).fetch();

    const totalPages = perPage !== 0 ? Math.ceil(count / perPage) : 0;

    return {
      pagination: {
        rowsPerPage: perPage,
        totalItems: count,
        totalPages: totalPages
      },
      elements: data
    };
  }
});

Bookmarks.methods.find = new ValidatedMethod({
  name: "bookmarks.crawlTitle",
  validate: new SimpleSchema({
    url: { type: String }
  }).validator(),
  run({ url }) {
    checkLoggedIn();

    const data = HTTP.get(url);
    const content = data?.content || "";
    const regex = /<title>(.*?)<\/title>/gm;
    const found = regex.exec(content);
    if (found && found.length >= 2) {
      return found[1];
    }
    return url;
  }
});

Bookmarks.methods.crawlMetadata = new ValidatedMethod({
  name: "bookmarks.crawlMetadata",
  validate: new SimpleSchema({
    id: { type: String }
  }).validator(),
  run({ id }) {
    checkLoggedIn();
    Meteor.defer(() => {
      const bookmark = Bookmarks.findOne({ _id: id });
      if (!bookmark) {
        throw new Meteor.Error("not-found");
      }

      const { siteExtractorUrl } = Meteor.settings;
      if (!siteExtractorUrl) {
        return;
      }

      const response = HTTP.post(siteExtractorUrl, {
        data: {
          url: bookmark.url
        }
      });

      const data = response.data || {};
      const metadata = {
        excerpt: data.article?.excerpt,
        content: data.article?.content,
        textContent: data.article?.textContent,
        keywords: data.keywords?.keywords,
        imageUrl: data.imageUrl,
        colors: data.screenshot?.colors?.palette,
        thumbnail: data.screenshot?.thumbnail
      };

      Bookmarks.update({
        _id: id
      }, {
        $set: {
          metadata: metadata
        }
      });
    });
  }
});
