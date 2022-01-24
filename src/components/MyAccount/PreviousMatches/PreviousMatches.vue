<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="matchesTotalScore"
          class="elevation-1"
          :loading="isLoading"
          loading-text="Loading... Please wait"
          disable-sort
        >
          <template v-slot:item.createdAt="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>
          <template v-slot:item.teamAScoreText="{ item }">
            <v-chip :color="getColor(item.teamAScore, item.teamBScore)" dark>
              {{ item.teamAScoreText }} ({{ item.teamAScore }})
            </v-chip>
          </template>
          <template v-slot:item.teamBScoreText="{ item }">
            <v-chip :color="getColor(item.teamBScore, item.teamAScore)" dark>
              {{ item.teamBScoreText }} ({{ item.teamAScore }})
            </v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import moment from "moment";
export default {
  name: "PreviousMatches",
  data() {
    return {
      isLoading:false,
      headers: [
        {
          text: "Team A",
          align: "start",
          sortable: false,
          value: "teamAName",
        },
        { text: "-", value: "teamAScoreText" },
        { text: "-", value: "teamBScoreText" },
        { text: "Team B", value: "teamBName" },
        { text: "Created", value: "createdAt" },
      ]
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters["user/userDetails"];
    },
    matches() {
      return this.$store.getters["match/matches"];
    },
    matchesTotalScore() {
      return this.matches.map((x) => {
        return {
          ...x,
          teamAScoreText: `${x.teamAGoals}-${x.teamAPoints}`,
          teamBScoreText: `${x.teamBGoals}-${x.teamBPoints}`,
          teamAScore: this.calculateScore(x.teamAGoals, x.teamAPoints),
          teamBScore: this.calculateScore(x.teamBGoals, x.teamBPoints),
        };
      });
    },
  },
  created() {
    this.bindDetails();
  },
  methods: {
    bindDetails() {
      this.isLoading = true
      this.$store.dispatch("match/getMyMatches", this.userDetails.id).then(() => {
        this.isLoading = false
      });
    },
    calculateScore(goals, points) {
      return goals * 3 + points;
    },
    getColor(mainTeamScore, secondaryTeamScore) {
      if (mainTeamScore === secondaryTeamScore) return "orange";
      else if (mainTeamScore > secondaryTeamScore) return "green";
      else if (secondaryTeamScore > mainTeamScore) return "red";
      else return "";
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
};
</script>
<style></style>
