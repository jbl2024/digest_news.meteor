import SimpleSchema from "simpl-schema";
import { HTTP } from "meteor/jkuester:http";

import { Bookmarks } from "../bookmarks";
import { checkLoggedIn } from "/imports/api/permissions/permissions";

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
        name: 1
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
