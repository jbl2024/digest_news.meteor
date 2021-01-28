<template>
  <div>
    <v-app>
      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon />
        <v-toolbar-title class="app-title">
          Digest
          <span class="app-subtitle">News</span>
        </v-toolbar-title>
        <v-spacer />
        <v-avatar v-if="currentUser" dark>
          <v-menu offset-y eager>
            <template #activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon> mdi-account-circle </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="logout()">
                <v-list-item-action>
                  <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{
                      $t("login.logout")
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-avatar>
      </v-app-bar>
      <v-main class="main-content">
        <v-container class="page-container" fluid>
          <router-view />
        </v-container>
      </v-main>
      <v-snackbar v-model="showSnackbar" :timeout="timeout" bottom app>
        {{ notifyMessage }}
        <template #action="{ attrs }">
          <v-btn dark icon text v-bind="attrs" @click="showSnackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { mapState } from "vuex";

export default {
  data() {
    return {
      showSnackbar: false,
      timeout: 6000
    };
  },
  meteor: {
    currentUser() {
      if (!Meteor.userId()) {
        this.$router.push({ name: "login" }).catch((err) => {
          if (
            err.name !== "NavigationDuplicated"
            && !err.message.includes(
              "Avoided redundant navigation to current location"
            )
          ) {
            log.error(err);
          }
        });
      }
      return Meteor.user();
    }
  },
  computed: {
    ...mapState(["windowTitle", "notifyMessage"])
  },
  watch: {
    notifyMessage(message) {
      if (message) {
        this.showSnackbar = true;
      }
    },
    showSnackbar(show) {
      if (!show) {
        this.$notify("");
      }
    },
    windowTitle(title) {
      document.title = title;
    }
  },
  methods: {
    logout() {
      this.$confirm(this.$t("login.logoutConfirm"), {
        title: this.$t("common.confirm"),
        cancelText: this.$t("common.cancel"),
        confirmText: this.$t("login.logout")
      }).then((res) => {
        if (res) {
          Meteor.logout((err) => {
            if (err) {
              this.$notifyError(err);
            }
          });
        }
      });
    }
  }
};
</script>
