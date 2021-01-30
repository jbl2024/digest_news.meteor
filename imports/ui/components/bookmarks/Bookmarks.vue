<template>
  <v-container>
    <new-bookmark ref="newBookmark" @created="refresh" />
    <edit-bookmark
      ref="editBookmark"
      :bookmark="selectedBookmark"
      @updated="refresh"
    />
    <v-row>
      <v-col cols="12">
        <div class="title">
          Bookmarks
        </div>
        <v-btn @click="$refs.newBookmark.open()">
          New bookmark
        </v-btn>
        <v-btn @click="$refs.selectLabels.open()">
          Select labels
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <template v-for="bookmark in bookmarks">
        <v-col :key="bookmark._id" cols="12">
          <bookmark-card
            :bookmark="bookmark"
            editable
            @edit="editBookmark(bookmark)"
            @kindle="sendToKindle(bookmark)"
          />
        </v-col>
      </template>
    </v-row>
    <v-row>
      <v-col>
        <div class="text-center">
          <v-pagination
            v-if="pagination.totalPages > 0"
            v-model="page"
            :length="pagination.totalPages"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Meteor } from "meteor/meteor";

import NewBookmark from "/imports/ui/components/bookmarks/NewBookmark.vue";
import EditBookmark from "/imports/ui/components/bookmarks/EditBookmark.vue";
import BookmarkCard from "/imports/ui/components/bookmarks/BookmarkCard.vue";

export default {
  name: "Bookmarks",
  components: {
    NewBookmark,
    EditBookmark,
    BookmarkCard
  },
  data() {
    return {
      bookmarks: [],
      isLoading: false,
      page: 1,
      selectedBookmark: null,
      pagination: {}
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    editBookmark(bookmark) {
      this.selectedBookmark = bookmark;
      this.$refs.editBookmark.open();
    },
    sendToKindle(bookmark) {
      Meteor.call("bookmarks.sendToKindle", {
        id: bookmark._id
      }, (error) => {
        if (error) {
          this.$notifyError(error);
          return;
        }
        this.$notify("Bookmark sent to kindle");
      });
    },
    refresh() {
      this.isLoading = true;
      Meteor.call("bookmarks.find", { page: this.page }, (error, result) => {
        this.isLoading = false;
        if (error) {
          this.$notifyError(error);
          return;
        }
        this.bookmarks = result.elements;
        this.pagination = result.pagination;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bookmark-card a {
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
}

.bookmark-card .headline {
  word-break: normal;
}

.bookmark-card a.dark {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}

.bookmark-card a:hover {
  text-decoration: underline;
}
</style>
