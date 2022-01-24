<template>
  <v-layout row>
    <v-flex xs12>
      <h4 class="text-center text-xs-center text-success">
        <strong>{{ teamInLead }}</strong>
      </h4>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'TeamInLead',
  computed: {
    teamInLead () {
      return this.$store.getters['gameInformation/teamInLead']
    }
  }
}
</script>

<style></style>
