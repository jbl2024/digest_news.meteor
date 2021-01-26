<template>
  <div>
    <v-app>
      <v-app-bar app flat short clipped-left class="outlined">
        <v-app-bar-nav-icon />
        <v-toolbar-title class="app-title">
          Digest
          <span class="app-subtitle">News</span>
        </v-toolbar-title>
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      showSnackbar: false,
      timeout: 6000
    };
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
  }
};
</script>

<style>
/* override vuetify default theme */
html {
  font-size: 14px;
}

/* app theme */
#app {
  background-color: #e5e5e5;
  font-family: 'Inter', sans-serif;
}
</style>