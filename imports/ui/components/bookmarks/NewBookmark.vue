<template>
  <div>
    <v-dialog v-model="showDialog" max-width="700px">
      <v-form v-model="valid" @submit.prevent>
        <v-card>
          <v-progress-linear v-show="isProcessing" absolute indeterminate />
          <v-card-title>
            <span class="headline">New bookmark</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="url"
                    label="URL*"
                    :rules="urlRules"
                    required
                    autofocus
                    append-outer-icon="mdi-cloud-search"
                    @click:append-outer="crawlTitle"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="title"
                    label="Title*"
                    :rules="titleRules"
                    required
                  />
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click.stop="showDialog = false">
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              :loading="isProcessing"
              :disabled="!valid"
              @click.stop="createBookmark"
            >
              Create bookmark
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";

export default {
  data() {
    return {
      showDialog: false,
      valid: false,
      title: "",
      url: "",
      titleRules: [(v) => !!v || "Title is mandatory"],
      urlRules: [(v) => !!v || "Title is mandatory"],
      isProcessing: false
    };
  },
  methods: {
    open() {
      this.showDialog = true;
    },

    close() {
      this.showDialog = false;
    },

    notifyAndClose() {
      this.$emit("created");
      this.close();
    },

    crawlTitle() {
      this.isProcessing = true;
      Meteor.call("bookmarks.crawlTitle", {
        url: this.url
      }, (error, title) => {
        this.isProcessing = false;
        if (error) {
          this.$notifyError(error);
        }
        this.title = title;
      });
    },

    createBookmark() {
      this.isProcessing = true;
      const bookmark = {
        url: this.url,
        title: this.title
      };

      Meteor.call("bookmarks.insert", bookmark, (error) => {
        if (error) {
          this.$notifyError(error);
        } else {
          this.notifyAndClose();
        }
      });
    }
  }
};
</script>
