<template>
  <v-col class="mt-0">
    <v-row v-if="userDetails" class="mt-0" justify="center">
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
          :class="showCroActions ? 'teal--text' : 'grey--text'"
          @click="showCroActionsInfo"
        >
          CRO Actions
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class="mb-3">
      <v-slide-y-transition mode="out-in">
        <login-register-account-details key="accountDetails" v-if="showAccountDetails" />
        <cro-actions key="croActions" cols="12" v-if="showCroActions"/>
      </v-slide-y-transition>
    </v-row>
  </v-col>
</template>
<script>
import LoginRegisterAccountDetails from "../components/MyAccount/LoginRegisterAccountDetails.vue";
import CroActions from '../components/MyAccount/CroActions/CroActions.vue'
export default {
  name: "MyAccount",
  components: { LoginRegisterAccountDetails,CroActions },
  data() {
    return {
      showAccountDetails: true,
      showCroActions: false,
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
      this.showCroActions = false;
    },
    showCroActionsInfo() {
      this.showAccountDetails = false;
      this.showCroActions = true;
    },
  },
};
</script>
<style></style>
