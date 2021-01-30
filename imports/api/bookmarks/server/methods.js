import SimpleSchema from "simpl-schema";

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
    let skip = 0;
    if (page) {
      skip = (page - 1) * perPage;
    }

    if (!skip) {
      skip = 0;
    }
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
