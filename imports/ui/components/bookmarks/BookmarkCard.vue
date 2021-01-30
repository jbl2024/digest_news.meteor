<template>
  <v-card class="mx-auto bookmark-card pb-2" max-width="576">
    <div class="d-flex flex-no-wrap ">
      <v-avatar class="ma-3 mt-4 avatar" size="48">
        <v-img v-if="bookmark.metadata" :src="getThumbnail(bookmark)" />
      </v-avatar>
      <div>
        <v-card-title class="card-title" v-text="bookmark.title" />
        <v-card-subtitle class="card-subtitle">
          <a
            :href="bookmark.url"
            target="_blank"
          >{{ bookmark.url }}</a>
        </v-card-subtitle>
      </div>
    </div>
    <v-card-subtitle
      v-if="bookmark.metadata"
      class="excerpt"
      v-text="bookmark.metadata.excerpt"
    />

    <v-card-text>
      <v-img class="image" :src="getImage(bookmark)" />
    </v-card-text>
    <v-card-actions>
      <v-btn outlined rounded small>
        READ
      </v-btn>
      <v-spacer />
      <v-btn v-if="editable" icon @click="$emit('edit')">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('delete')">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('kindle')">
        <v-icon>mdi-book-open-blank-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { colors } from "/imports/ui/colors";

export default {
  name: "BookmarkCard",
  props: {
    bookmark: {
      type: Object,
      default: () => {}
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    openbookmark(bookmark) {
      window.open(bookmark, "_blank");
    },

    getColor(bookmark) {
      if (!bookmark.metadata) {
        return null;
      }
      if (!bookmark.metadata.colors) {
        return "#0000";
      }
      return bookmark.metadata.colors[0];
    },

    isDark(bookmark) {
      const color = this.getColor(bookmark);
      return colors.isDark(color);
    },

    getImage(bookmark) {
      if (!bookmark.metadata) {
        return null;
      }
      if (bookmark.metadata.imageUrl && bookmark.metadata.imageUrl.length > 0) {
        return bookmark.metadata.imageUrl;
      }
      return null;
    },

    getThumbnail(bookmark) {
      if (!bookmark.metadata) {
        return null;
      }
      if (bookmark.metadata.thumbnail && bookmark.metadata.thumbnail.length > 0) {
        return bookmark.metadata.thumbnail;
      }
      return null;
    }
  }
};
</script>

<style lang="scss" scoped>
.bookmark-card {
  border-radius: 0.75rem;
  box-shadow: none !important;
  border: 1px solid rgb(229, 231, 235);

  a {
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }

  .card-title {
    word-break: normal;
    font-weight: 700;
    font-size: 0.975rem;
    line-height: 1.25;
    padding-left: 4px;
  }
  .card-subtitle {
    padding-left: 4px;
  }

  a.dark {
    color: rgba(255, 255, 255, 0.7) !important;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .excerpt {
    color: black;
    font-size: 1rem;
    font-weight: 400;
  }

  .image {
    border-radius: 1rem;
  }

  .avatar {
    border: 1px solid rgb(229, 231, 235);
  }
}

</style>
