<template>
  <v-container fluid class="pa-0">
    <v-layout row justify-space-between class="ml-1">
      <v-flex text-xs-left xs2>
        <h5>
          <strong>Goals</strong>
        </h5>
      </v-flex>
      <v-flex text-xs-center xs8>
        <h3 class="text-center">
          <strong>{{ team.name }}</strong>
        </h3>
      </v-flex>
      <v-flex text-xs-right xs2>
        <h5>
          <strong>Points</strong>
        </h5>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-between class="ml-1">
      <v-flex text-xs-left xs2>
         <v-col cols="12" class="pa-0">
           <v-btn
            fab
            dark
            color="#061122"
            small
            @click="addGoal"
            :loading="updatingScore"
            :disabled="updatingScore"
            class="mb-1"
          >
            <v-icon dark>add</v-icon>
        </v-btn>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-btn
            fab
            dark
            color="red darken-2"
            small
            @click="removeGoal"
            :loading="updatingScore"
            :disabled="updatingScore"
          >
           <v-icon dark>remove</v-icon>
        </v-btn>
        </v-col>
      </v-flex>
      <v-flex text-xs-center xs8>
        <h1 class="text-weight-bold mt-0 text-center">{{ team.goals }} : {{ team.points }}</h1>
        <h6 class="text-center">Total: {{ totalScore }}</h6>
      </v-flex>
      <v-flex text-xs-right xs2>
        <v-col cols="12" class="pa-0">
          <v-btn
            fab
            dark
            color="#061122"
            small
            @click="addPoint"
            :loading="updatingScore"
            :disabled="updatingScore"
            class="mb-1"
          >
            <v-icon dark>add</v-icon>
        </v-btn>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-btn
            fab
            dark
            color="red darken-2"
            small
            @click="removePoint"
            :loading="updatingScore"
            :disabled="updatingScore"
          >
          <v-icon dark>remove</v-icon>
        </v-btn>
        </v-col>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: ['letter', 'team'],
  data () {
    return {
      updatingScore: false
    }
  },
  methods: {
    addGoal () {
      let self = this
      this.$store.dispatch('gameInformation/updateTeam' + this.letter + 'Goals', this.team.goals + 1)
        .then(() => {
          self.updatingScore = true
          setTimeout(() => (self.updatingScore = false), 500)
        })
    },
    removeGoal () {
      let self = this
      if (this.team.goals > 0) {
        this.$store.dispatch('gameInformation/updateTeam' + this.letter + 'Goals', this.team.goals - 1)
          .then(() => {
            self.updatingScore = true
            setTimeout(() => (self.updatingScore = false), 500)
          })
      }
    },
    addPoint () {
      let self = this
      this.$store.dispatch('gameInformation/updateTeam' + this.letter + 'Points', this.team.points + 1)
        .then(() => {
          self.updatingScore = true
          setTimeout(() => (self.updatingScore = false), 500)
        })
    },
    removePoint () {
      if (this.team.points > 0) {
        this.$store.dispatch('gameInformation/updateTeam' + this.letter + 'Points', this.team.points - 1)
          .then(() => {
            self.updatingScore = true
            setTimeout(() => (self.updatingScore = false), 500)
          })
      }
    }
  },
  computed: {
    totalScore () {
      return this.team.goals * 3 + this.team.points
    }
  }
}
</script>
