<template>
  <v-container fluid class="p-0">
    <score-board letter="A" :team="teamA" />
    <hr class="m-1 mt-2 mb-1" />
    <stop-watch :team-a="teamA" :team-b="teamB" />
    <hr class="m-1 mb-2 mt-1" />
    <score-board :team="teamB" letter="B" />
  </v-container>
</template>

<script>
import ScoreBoard from '../components/ScoreBoard.vue'
import StopWatch from '../components/StopWatch.vue'

export default {
  name: 'home',
  components: {
    ScoreBoard,
    StopWatch
  },
  computed: {
    teamA () {
      return this.$store.getters['gameInformation/teamA']
    },
    teamB () {
      return this.$store.getters['gameInformation/teamB']
    }
  }
}
</script>
