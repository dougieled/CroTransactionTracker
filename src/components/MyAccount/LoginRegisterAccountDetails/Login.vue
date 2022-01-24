<template>
  <v-layout class="mt-3" row align-center justify-center>
    <v-flex xs11>
      <v-card class="elevation-12">
        <v-card-text>
          <v-form ref="login" v-model="valid" lazy-validation>
            <v-text-field
              prepend-icon="person"
              name="Username"
              label="Username"
              type="text"
              :rules="usernameRules"
              required
              v-model="username"
            ></v-text-field>
            <v-text-field
              id="password"
              prepend-icon="lock"
              name="password"
              label="Password"
              type="password"
              :rules="passwordRules"
              required
              v-model="password"
              @keyup.enter.prevent="login"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-row justify="center">
            <v-col cols="12 pb-0 pt-0">
              <v-btn color="red darken-2" @click="goToRegisterPage" block
                >Register</v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-btn color="primary" @click="login" block>Login</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      valid: true,
      username: "",
      password: "",
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) => v.length > 5 || "Username must be a minimum of 6 characters",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length > 5 || "Password must be a minimum of 6 characters",
      ],
    };
  },
  methods: {
    login() {
      if (this.$refs.login.validate()) {
        let data = { username: this.username, password: this.password };
        this.$store.dispatch("user/login", data);
      }
    },
    goToRegisterPage() {
      this.$emit("show-register");
    },
  },
};
</script>
<style></style>
