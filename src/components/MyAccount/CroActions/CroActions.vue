<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        CRO actions incoming
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "CROActions",
  data() {
    return {
      isLoading:false,
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters["user/userDetails"];
    },
  },
  created() {
  },
  methods: {
  },
};
</script>
<style></style>
