<template>
  <v-app>
    <v-app-bar fixed color="#061122" dark app>
      <router-link to="/">
        <v-img
          class="mr-7"
          src="./assets/cro-logo.svg"
          max-height="50"
          max-width="50"
          contain
        ></v-img>
      </router-link>
      <v-toolbar-title>CRO Transaction Tracker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="userDetails" class="name-title"
        >Hi {{ userDetails.username }}</v-toolbar-title
      >
    </v-app-bar>
    <v-main style="padding: 56px 0px 0px 0px;">
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-slide-y-transition>
    </v-main>
    <v-bottom-navigation grow app>
      <v-btn
        v-if="userDetails"
        ripple
        to="/"
        style="height: 56px;"
        :class="{
          'teal--text': routeName == 'home',
          'grey--text': routeName != 'home'
        }"
      >
        <span>Home</span>
        <v-icon dark>home</v-icon>
      </v-btn>
      <v-btn
        style="height: 56px;"
        v-if="userDetails"
        to="/Upload"
        :class="{
          'teal--text': routeName == 'Upload',
          'grey--text': routeName != 'Upload'
        }"
      >
        <span>Upload</span>
        <v-icon>upload_file</v-icon>
      </v-btn>
      <v-btn
        to="/MyAccount"
        style="height: 56px;"
        :class="{
          'teal--text': routeName == 'MyAccount',
          'grey--text': routeName != 'MyAccount'
        }"
      >
        <span>My Account</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  methods: {
    checkIfHasAuth() {
      if (this.userDetails === null) {
        this.$router.push('/MyAccount')
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.checkIfHasAuth()
      }
    }
  },
  computed: {
    routeName() {
      return this.$root.$route.name
    },
    userDetails() {
      return this.$store.getters['user/userDetails']
    }
  }
}
</script>
<style>
.material-icons.md-12 {
  font-size: 14px;
}
.name-title {
  font-size: 0.9rem !important;
}
</style>
