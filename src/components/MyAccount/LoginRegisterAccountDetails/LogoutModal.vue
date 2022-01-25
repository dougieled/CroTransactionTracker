<template>
  <v-dialog v-model="showLogoutModal" persistent max-width="290">
    <v-card>
      <v-card-title class="headline justify-center">Are you sure?</v-card-title>
      <v-card-actions>
        <v-btn right color="red darken-2" @click="closeLogoutModal" dark
          >Close</v-btn
        >
        <v-layout align-center justify-end>
          <v-btn left color="#061122" @click="logout" dark
            >Logout</v-btn
          >
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("user/logout", null);
      this.$store.dispatch("user/updateShowLogoutModal", false);
    },
    closeLogoutModal() {
      this.$store.dispatch("user/updateShowLogoutModal", false);
    },
  },
  computed: {
    showLogoutModal() {
      return this.$store.getters["user/showLogoutModal"];
    },
  },
};
</script>
<style></style>
