<template>
  <v-card
    class="mx-auto bookmark-card pb-2"
    :color="getColor(bookmark)"
    max-width="700"
    :dark="isDark(bookmark)"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline" v-text="bookmark.title" />
        <v-card-subtitle>
          <a
            :href="bookmark.url"
            target="_blank"
            :class="{ dark: isDark(bookmark) }"
          >{{ bookmark.url }}</a>
        </v-card-subtitle>
        <v-card-subtitle v-if="bookmark.metadata" v-text="bookmark.metadata.excerpt" />
      </div>

      <v-avatar v-if="bookmark.metadata" class="ma-3" size="125" tile>
        <v-img :src="getImage(bookmark)" />
      </v-avatar>
    </div>
    <v-card-actions>
      <v-btn outlined rounded small>
        READ
      </v-btn>
      <v-spacer />
      <v-btn v-if="editable" icon @click="$emit('edit')">
        <v-icon>mdi-pencil</v-icon>
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
      if (bookmark.metadata.image_url && bookmark.metadata.image_url.length > 0) {
        return bookmark.metadata.image_url;
      }
      return null;
    }
  }
};
</script>

<style lang="scss" scoped>
.url-card a {
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
}

.url-card .headline {
  word-break: normal;
}

.url-card a.dark {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}

.url-card a:hover {
  text-decoration: underline;
}
</style>
