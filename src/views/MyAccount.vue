<template>
  <v-container fluid>
    <v-row v-if="userDetails" justify="center">
      <v-col cols="6">
        <div
          class="pa-2 text-center secondary rounded-0 rounded-pill"
          :class="showAccountDetails ? 'teal--text' : 'grey--text'"
          @click="reset"
        >
          User Details
        </div>
      </v-col>
      <v-col cols="6">
        <div
          class="pa-2 text-center secondary rounded-0 rounded-pill"
          :class="showPreviousMatches ? 'teal--text' : 'grey--text'"
          @click="showPreviousMatchesInfo"
        >
          Previous Matches
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" v-if="showAccountDetails">
        <login-register-account-details />
      </v-col>
      <v-col cols="12" v-if="showPreviousMatches">
        <previous-matches/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import LoginRegisterAccountDetails from "../components/MyAccount/LoginRegisterAccountDetails.vue";
import PreviousMatches from '../components/MyAccount/PreviousMatches/PreviousMatches.vue'
export default {
  name: "MyAccount",
  components: { LoginRegisterAccountDetails,PreviousMatches },
  data() {
    return {
      showAccountDetails: true,
      showPreviousMatches: false,
    };
  },
  created() {
    this.reset();
  },
  computed: {
    userDetails() {
      return this.$store.getters["user/userDetails"];
    },
  },
  methods: {
    reset() {
      this.showAccountDetails = true;
      this.showPreviousMatches = false;
    },
    showPreviousMatchesInfo() {
      this.showAccountDetails = false;
      this.showPreviousMatches = true;
    },
  },
};
</script>
<style></style>
