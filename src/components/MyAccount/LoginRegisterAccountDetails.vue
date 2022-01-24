<template>
  <v-container fluid>
    <login v-if="showLogin && !userDetails" @show-register="showRegisterForm()" />
    <register v-if="showRegister && !userDetails" @show-login="showLoginForm()" />
    <account-details v-if="userDetails" @logout="logout()" />
  </v-container>
</template>
<script>
import Login from "../MyAccount/LoginRegisterAccountDetails/Login.vue";
import Register from "../MyAccount/LoginRegisterAccountDetails/Register.vue";
import AccountDetails from "../MyAccount/LoginRegisterAccountDetails/AccountDetails.vue";
export default {
  name: "LoginRegisterAccountDetails",
  components: { Login, Register, AccountDetails },
  data() {
    return {
      showLogin: true,
      showRegister: false,

    };
  },

  computed: {
    userDetails() {
      return this.$store.getters["user/userDetails"]
    },
  },
  methods: {
    showRegisterForm() {
      this.showRegister = true;
      this.showLogin = false;
    },
    showLoginForm() {
      this.showRegister = false;
      this.showLogin = true;
    },
    logout() {
      this.showLogin = true;
      this.$store.dispatch("user/logout")
    },

  },
};
</script>
<style></style>
