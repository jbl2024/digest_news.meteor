<template>
  <div class="login">
    <div class="centered-container">
      <v-form v-model="valid" @submit.prevent>
        <v-card>
          <v-card-title class="title">
            {{ $t('login.title') }}
          </v-card-title>
          <v-card-text>
            <v-text-field
              id="email"
              v-model="form.email"
              :label="$t('login.email')"
              name="email"
              autocomplete="email"
              type="email"
              :rules="emailRules"
              :disabled="sending"
            />
            <v-text-field
              id="password"
              v-model="form.password"
              :label="$t('login.password')"
              type="password"
              name="password"
              autocomplete="password"
              :rules="passwordRules"
              :disabled="sending"
              @keyup.enter="login()"
            />
            <v-progress-linear v-if="sending" indeterminate />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" :disabled="sending || !valid" @click="login">
              {{ $t('login.login') }}
            </v-btn>
          </v-card-actions>
          <v-divider />
          <v-card-actions>
            <v-btn small text :to="{ name: 'register' }">
              {{ $t('login.register') }}
            </v-btn>
            <v-spacer />
            <v-btn small text :to="{ name: 'forgot-password' }">
              {{ $t('login.lostPassword?') }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <template v-if="oauth2Enabled">
          <v-card class="mt-4">
            <v-btn block color="primary" @click="loginOauth2()">
              {{ oauth2Title }}
            </v-btn>
          </v-card>
        </template>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginWidget",
  data() {
    return {
      valid: false,
      oauth2Enabled: false,
      oauth2Title: "OAuth2",
      form: {
        email: "",
        password: ""
      },
      sending: false,
      emailRules: [
        (v) => !!v || this.$t("login.errors.emailMandatory"),
        (v) => v.length > 1 || this.$t("login.errors.invalidEmail")
      ],
      passwordRules: [
        (v) => !!v || this.$t("login.errors.passwordMandatory"),
        (v) => v.length > 1 || this.$t("login.errors.passwordTooShort")
      ]
    };
  },
  methods: {
    clearForm() {
      this.form.email = null;
      this.form.password = null;
    },
    login() {
      this.sending = true;

      Meteor.loginWithPassword(this.form.email, this.form.password, (err) => {
        this.sending = false;
        if (err) {
          this.$notifyError(err);
        } else {
          this.clearForm();
          this.$router.push({ name: "home" });
        }
      });
    },
    validateLogin() {
      this.login();
    },

    loginOauth2() {
      Meteor.loginWithOidc({ loginStyle: "popup" }, () => {
        const user = Meteor.user();
        if (user) {
          this.$router.push({ name: "dashboard-page" });
        }
      });
    }
  }
};
</script>

<style scoped>
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 64px);
}
</style>
