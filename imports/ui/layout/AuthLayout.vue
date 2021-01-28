<template>
  <v-app>
    <router-view />
    <v-snackbar v-model="showSnackbar" :timeout="timeout" bottom app>
      {{ notifyMessage }}
      <template #action="{ attrs }">
        <v-btn dark icon text v-bind="attrs" @click="showSnackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      showSnackbar: false,
      timeout: 6000,
    };
  },
  computed: {
    ...mapState(["windowTitle", "notifyMessage"]),
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
    },
  },  
};
</script>

<style />
