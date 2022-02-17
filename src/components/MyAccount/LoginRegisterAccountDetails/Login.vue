<template>
  <v-col class="mt-1 mb-10" cols="10" offset="1" align-center justify-center>
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
          <v-row>
            <v-col cols="10" offset="1">
              <v-btn color="red darken-2" @click="goToRegisterPage" block
                >Register</v-btn
              >
            </v-col>
            <v-col cols="10" offset="1">
              <v-btn color="#061122" @click="login" block>Login</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
  </v-col>
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
        v => !!v || "Username is required",
        v => v.length > 5 || "Username must be a minimum of 6 characters"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length > 5 || "Password must be a minimum of 6 characters"
      ]
    };
  },
  methods: {
    login() {
      if (this.$refs.login.validate()) {
        let data = { username: this.username, password: this.password };
        this.$store.dispatch("user/login", data).then(res => {
          if (res === true) {
            this.$router.push("/");
          }
        });
      }
    },
    goToRegisterPage() {
      this.$emit("show-register");
    }
  }
};
</script>
<style></style>
