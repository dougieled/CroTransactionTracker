<template>
  <v-app>
    <v-app-bar fixed color="green darken-2" dark>
      <v-img class="mr-7" src="./assets/gst5050.png" max-height="50" max-width="50" contain></v-img>
      <v-toolbar-title>GAA Score Tracker</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main style="padding: 56px 0px 0px 0px;">
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-slide-y-transition>
      <v-bottom-navigation grow app>
        <v-btn ripple to="/">
          <span
            :class="{ 'teal--text': routeName == 'home', 'grey--text': routeName != 'home' }"
          >Home</span>
          <v-icon
            dark
            :class="{ 'teal--text': routeName == 'home', 'grey--text': routeName != 'home' }"
          >home</v-icon>
        </v-btn>
        <v-btn to="/settings">
          <span
            :class="{'teal--text': routeName == 'settings','grey--text': routeName != 'settings'}"
          >Settings</span>
          <v-icon
            :class="{'teal--text': routeName == 'settings','grey--text': routeName != 'settings'}"
          >settings</v-icon>
        </v-btn>
        <v-btn to="/MyAccount">
          <span
            :class="{'teal--text': routeName == 'MyAccount','grey--text': routeName != 'MyAccount'}"
          >My Account</span>
          <v-icon
            :class="{'teal--text': routeName == 'MyAccount','grey--text': routeName != 'MyAccount'}"
          >account_circle</v-icon>
        </v-btn>
        <v-btn @click="openResetModal">
          <span class="red--text">Reset Data</span>
          <v-icon class="red--text">refresh</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <reset-data-modal />
    </v-main>
  </v-app>
</template>

<script>
import ResetDataModal from "./components/ResetDataModal.vue";

export default {
  name: "App",
  components: {
    ResetDataModal
  },
  methods: {
    openResetModal() {
      this.$store.dispatch("gameInformation/updateShowResetModal", true);
    },
    checkIfHasAuth(){
      this.$store.dispatch("user/getCurrentUser");
    }
  },
  mounted(){
    this.checkIfHasAuth()
  },
  computed: {
    routeName() {
      return this.$root.$route.name;
    }
  }
};
</script>
<style>
.material-icons.md-12 {
  font-size: 14px;
}

</style>
