<template>
  <v-dialog v-model="showResetModal" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Reset Game Data ?</v-card-title>
      <v-card-actions>
        <v-btn right color="red darken-2" @click="closeResetModal" dark>Close</v-btn>
        <v-layout align-center justify-end>
          <v-btn left color="green darken-2" @click="resetData" dark>Reset</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  methods: {
    resetData () {
      this.$store.dispatch('gameInformation/updateTeamA', { name: 'Team A', goals: 0, points: 0 })
      this.$store.dispatch('gameInformation/updateTeamB', { name: 'Team B', goals: 0, points: 0 })
      this.$store.dispatch('gameInformation/updateHashtagArray', ['GAAScoreTracker'])
      this.$store.dispatch('gameInformation/updateCompetitionName', 'Test Competition')
      this.$store.dispatch('stopWatch/updateHalfOption', '1st Half')
      this.$store.dispatch('stopWatch/updateStarted', false)
      this.$store.dispatch('gameInformation/updateShowResetModal', false)
    },
    closeResetModal () {
      this.$store.dispatch('gameInformation/updateShowResetModal', false)
    }
  },
  computed: {
    showResetModal () {
      return this.$store.getters['gameInformation/showResetModal']
    }
  }
}
</script>
<style></style>
