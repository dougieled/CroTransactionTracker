<template>
  <v-app>
    <v-app-bar fixed color="#061122" dark>
      <v-img
        class="mr-7"
        src="./assets/gst5050.png"
        max-height="50"
        max-width="50"
        contain
      ></v-img>
      <v-toolbar-title>CRO Transaction Tracker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="userDetails" class="name-title">Hi {{userDetails.username}}</v-toolbar-title>
    </v-app-bar>
    <v-main style="padding: 56px 0px 0px 0px;">
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-slide-y-transition>
      <v-bottom-navigation grow app>
        <v-btn v-if="userDetails" ripple to="/">
          <span
            :class="{
              'teal--text': routeName == 'home',
              'grey--text': routeName != 'home'
            }"
            >Home</span
          >
          <v-icon
            dark
            :class="{
              'teal--text': routeName == 'home',
              'grey--text': routeName != 'home'
            }"
            >home</v-icon
          >
        </v-btn>
        <v-btn v-if="userDetails" to="/settings">
          <span
            :class="{
              'teal--text': routeName == 'settings',
              'grey--text': routeName != 'settings'
            }"
            >Settings</span
          >
          <v-icon
            :class="{
              'teal--text': routeName == 'settings',
              'grey--text': routeName != 'settings'
            }"
            >settings</v-icon
          >
        </v-btn>
        <v-btn to="/MyAccount">
          <span
            :class="{
              'teal--text': routeName == 'MyAccount',
              'grey--text': routeName != 'MyAccount'
            }"
            >My Account</span
          >
          <v-icon
            :class="{
              'teal--text': routeName == 'MyAccount',
              'grey--text': routeName != 'MyAccount'
            }"
            >account_circle</v-icon
          >
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",

  methods: {
    checkIfHasAuth() {
        if (this.userDetails === null) {
          this.$router.push("/MyAccount");
        }
    }
  },
  watch: {
    $route(to, from) {
      this.checkIfHasAuth()
    }
  },
  computed: {
    routeName() {
      return this.$root.$route.name;
    },
    userDetails() {
      return this.$store.getters["user/userDetails"];
    }
  }
};
</script>
<style>
.material-icons.md-12 {
  font-size: 14px;
}
.name-title {
  font-size: 0.9rem !important;
}
</style>
