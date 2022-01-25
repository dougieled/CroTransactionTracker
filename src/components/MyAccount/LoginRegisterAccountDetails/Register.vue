<template>
  <v-layout class="mt-3" row align-center justify-center>
    <v-flex xs11>
      <v-card class="elevation-12">
        <v-card-text>
          <v-form ref="register" v-model="valid" lazy-validation>
            <v-text-field
              prepend-icon="person"
              name="First Name"
              label="First Name"
              type="text"
              :rules="firstNameRules"
              required
              v-model="firstName"
            ></v-text-field>
            <v-text-field
              prepend-icon="person"
              name="Last Name"
              label="Last Name"
              type="text"
              :rules="lastNameRules"
              required
              v-model="lastName"
            ></v-text-field>
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
              name="Password"
              label="Password"
              type="password"
              :rules="passwordRules"
              required
              v-model="password"
            ></v-text-field>
            <v-text-field
              id="password"
              prepend-icon="lock"
              name="Confirm Password"
              label="Confirm Password"
              type="password"
              :rules="confirmPasswordRules"
              required
              v-model="confirmPassword"
              @keyup.enter.prevent="register"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-2" @click="goToLoginPage">back to Login</v-btn>
          <v-btn color="#061122" @click="register">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      valid: true,
      firstName:"",
      lastName:"",
      username: "",
      password: "",
      confirmPassword:"",
      firstNameRules: [
        v => !!v || 'First Name is required',
      ],
      lastNameRules: [
        v => !!v || 'Last Name is required',
      ],
      usernameRules: [
        v => !!v || 'Username is required',
        v => v.length > 5 || 'Username must be a minimum of 6 characters',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length > 5 || 'Password must be a minimum of 6 characters',
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm Password is required",
        (v) => v.length > 5 || "Confirm Password must be a minimum of 6 characters",
        (v) => v === this.password|| "Passwords must match",
      ],
    };
  },
  methods: {
    register() {
      if (this.$refs.register.validate()) {
      let data = { firstName:this.firstName,lastName:this.lastName,username: this.username, password: this.password }
        this.$store.dispatch('user/register', data)
      }
    },
    goToLoginPage() {
      this.$emit('show-login')
    },
  },
};
</script>
<style></style>
