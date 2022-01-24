<template>
  <v-container fluid>
    <v-form ref="settings" v-model="valid" lazy-validation>
      <v-layout row justify-space-between class="pl-1  pr-1">
        <v-text-field
          label="Team A Name"
          :rules="teamANameRules"
          required
          v-model="teamAName"
        ></v-text-field>
      </v-layout>
      <v-layout row justify-space-between class="pl-1  pr-1">
        <v-text-field
          label="Team B Name"
          :rules="teamBNameRules"
          required
          v-model="teamBName"
        ></v-text-field>
      </v-layout>
      <v-layout row justify-space-between class="pl-1  pr-1">
        <v-text-field
          label="Competition Name"
          :rules="competitionRules"
          required
          v-model="competitionName"
        ></v-text-field>
      </v-layout>
    </v-form>
    <v-layout row justify-space-between class="pl-1  pr-1">
      <v-text-field
        label="Insert Hashtag"
        ref="hashtagField"
        :rules="selectedHashtagRules"
        v-model="selectedHashtag"
      ></v-text-field>
      <v-btn block color="green darken-2" @click="addToArray" dark>Add</v-btn>
    </v-layout>
    <v-layout row justify-space-between class="pl-1  pr-1">
      <v-select
        v-model="hashtagArray"
        :items="hashtagArray"
        chips
        label="Hashtags"
        class="caption"
        small-chips
        multiple
      ></v-select>
    </v-layout>
    <v-layout row justify-space-between class="pl-1  pr-1 mb-2">
      <v-btn block color="green darken-3" @click="updateSettings" dark>Update</v-btn>
    </v-layout>
  </v-container>
</template>
<script>

export default {
  name: 'settings',
  mounted () {
    this.bindStateData()
  },
  data () {
    return {
      valid: true,
      teamAName: '',
      teamANameRules: [v => !!v || 'Team A Name is required'],
      teamBName: '',
      teamBNameRules: [v => !!v || 'Team B Name is required'],
      competitionName: '',
      competitionRules: [v => !!v || 'Competition Name is required'],
      selectedHashtag: '',
      selectedHashtagRules: [
        v => (!!v && v.length >= 3) || 'Hashtag must be a minimum of 3 characters'
      ],
      hashtagArray: []
    }
  },
  methods: {
    bindStateData () {
      this.teamAName = this.teamA.name
      this.teamBName = this.teamB.name
      this.competitionName = this.competition
      this.hashtagArray = this.hashtagArrayComputed
    },
    addToArray () {
      let self = this
      if (this.$refs.hashtagField.validate()) {
        this.hashtagArray.push(this.selectedHashtag.replace('#', ''))
        this.selectedHashtag = ''
        this.$store.dispatch('gameInformation/updateHashtagArray', this.hashtagArray)
          .then(() => {
            self.hashtagArray = self.hashtagArrayComputed
          })
      }
    },
    gotoHome () {
      this.$router.push('/')
    },
    updateSettings () {
      if (this.$refs.settings.validate()) {
        this.$store.dispatch('gameInformation/updateTeamAName', this.teamAName)
        this.$store.dispatch('gameInformation/updateTeamBName', this.teamBName)
        this.$store.dispatch('gameInformation/updateCompetitionName', this.competitionName)
        this.$store.dispatch('gameInformation/updateHashtagArray', this.hashtagArray)
        this.gotoHome()
      }
    }
  },
  computed: {
    teamA () {
      return this.$store.getters['gameInformation/teamA']
    },
    teamB () {
      return this.$store.getters['gameInformation/teamB']
    },
    competition () {
      return this.$store.getters['gameInformation/competition']
    },
    hashtagArrayComputed () {
      return this.$store.getters['gameInformation/hashtagArray']
    }
  }
}
</script>
<style></style>
