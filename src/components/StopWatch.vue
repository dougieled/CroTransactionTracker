<template>
  <v-container fluid class="pa-0">
    <time-since-last-score v-if="started" :team="teamA" :timeSince="timeSinceTeamAScore" />
    <v-layout row align-center class="ml-1">
      <v-flex xs2 xs-left>
        <v-col cols="12" class="pa-0">
          <v-btn
            small
            fab
            dark
            color="blue darken-2 mb-1"
            v-if="started === false || (started && paused)"
            :disabled="isTeamInfoNeeded"
            @click="start"
          >
            <v-icon dark>timer</v-icon>
          </v-btn>
          <v-btn
            small
            v-if="started && !paused"
            fab
            dark
            color="red darken-2 mb-1"
            :disabled="isTeamInfoNeeded"
            @click="pause"
          >
            <v-icon dark>timer</v-icon>
          </v-btn>
          <v-btn
            small
            fab
            dark
            color="red darken-2"
            v-if="started === true"
            :disabled="isTeamInfoNeeded"
            @click="reset"
          >
            <v-icon dark>refresh</v-icon>
          </v-btn>
        </v-col>
      </v-flex>
      <v-flex xs4 v-if="!started">
        <v-select
          v-model="addedMinutes"
          :items="timerOptions"
          item-text="label"
          item-value="value"
          class="caption pt-3"
          label="Start Timer At:"
          outlined
        />
      </v-flex>
      <v-flex xs4 v-if="!started" text-xs-center>
        <v-select
          v-model="halfOption"
          :items="halfOptions"
          item-text="label"
          item-value="value"
          class="caption pt-3"
          label="Half:"
          outlined
        />
      </v-flex>
      <timer ref="timer" />
      <social-media-share />
    </v-layout>
    <time-since-last-score v-if="started" :team="teamB" :timeSince="timeSinceTeamBScore" />
    <team-in-lead v-if="started" />
  </v-container>
</template>
<script>
import TimeSinceLastScore from "./TimeSinceLastScore.vue";
import Timer from "./Timer.vue";
import TeamInLead from "./TeamInLead.vue";
import SocialMediaShare from "./SocialMediaShare.vue";

export default {
  components: {
    TimeSinceLastScore,
    Timer,
    TeamInLead,
    SocialMediaShare
  },
  data() {
    return {
      intervalDateTimeNow: null,
      halfOptions: [
        { label: "1st", value: "1st Half" },
        { label: "HT", value: "Half Time" },
        { label: "2nd", value: "2nd Half" },
        { label: "FT", value: "Full Time" },
        { label: "1st ET", value: "1st Half Extra Time" },
        { label: "HT ET", value: " Half Time Extra Time" },
        { label: "2nd ET", value: "2nd Half Extra Time" },
        { label: "AET", value: "After Extra Time" }
      ],
      halfOption: null,
      addedMinutes: 0
    };
  },
  mounted() {
    this.bindHalfOption();
    this.checkIfGameIsStarted();
  },
  computed: {
    teamA() {
      return this.$store.getters["gameInformation/teamA"];
    },
    teamB() {
      return this.$store.getters["gameInformation/teamB"];
    },
    started() {
      return this.$store.getters["stopWatch/started"];
    },
    paused() {
      return this.$store.getters["stopWatch/paused"];
    },
    timerOptions() {
      var array = [];
      for (var i = 0; i <= 35; i++) {
        var object = { label: `${i} Mins`, value: i };
        array.push(object);
      }
      return array;
    },
    minutes() {
      return this.$store.getters["stopWatch/minutes"];
    },
    timeSinceTeamAScore() {
      return this.$store.getters["gameInformation/totalTimeSinceTeamAScore"];
    },
    timeSinceTeamBScore() {
      return this.$store.getters["gameInformation/totalTimeSinceTeamBScore"];
    },
    // Generic Computed
    isTeamInfoNeeded() {
      return this.$store.getters["gameInformation/isTeamInfoNeeded"];
    }
  },
  methods: {
    checkIfGameIsStarted() {
      if (this.started === true) {
        this.startContinuousDateTimeNow();
      }
    },
    bindHalfOption() {
      if (this.halfOption == null) {
        this.halfOption = this.$store.getters["stopWatch/halfOption"];
      }
    },
    start() {
      if(this.paused){
        this.$store.dispatch("stopWatch/handleUnpause");
      }else{
      var dateNow = new Date();
      var startDateTime = new Date(
        dateNow.getTime() - this.addedMinutes * 60000
      );
      this.$store.dispatch("stopWatch/updateStarted", true);
      this.$store.dispatch(
        "gameInformation/updateTotalDateTimeSinceTeamAScore",
        dateNow
      );
      this.$store.dispatch(
        "gameInformation/updateTotalDateTimeSinceTeamBScore",
        dateNow
      );
      this.$store.dispatch("stopWatch/updateStartDateTime", startDateTime);
      this.$store.dispatch("stopWatch/updateDateTimeNow", dateNow);
      this.startContinuousDateTimeNow();
      this.addedMinutes = 0;
      }
    },
    startContinuousDateTimeNow() {
      clearInterval(this.intervalDateTimeNow);
      this.intervalDateTimeNow = setInterval(this.updateDateTimeNow, 100);
      if(this.minutes > 150){
        this.reset()
      }
    },
    reset() {
      this.$store.dispatch("stopWatch/updateStarted", false);
      this.$store.dispatch("stopWatch/updatePaused", false);
      this.$store.dispatch("stopWatch/updatePausedAtDateTime", null);
    },
    updateDateTimeNow() {
      if (this.started === true && this.paused ===false) {
        this.$store.dispatch("stopWatch/updateDateTimeNow", new Date());
      }
    },
    totalScore(team) {
      const a = team.goals * 3;
      const b = team.points;
      return a + b;
    },
    pause(){
      this.$store.dispatch("stopWatch/updatePaused", true);
      this.$store.dispatch("stopWatch/updatePausedAtDateTime", new Date());
    }
  },
  watch: {
    "teamA.goals"() {
      this.$store.dispatch(
        "gameInformation/updateTotalDateTimeSinceTeamAScore",
        new Date()
      );
    },
    "teamA.points"() {
      this.$store.dispatch(
        "gameInformation/updateTotalDateTimeSinceTeamAScore",
        new Date()
      );
    },
    "teamB.goals"() {
      this.$store.dispatch(
        "gameInformation/updateTotalDateTimeSinceTeamBScore",
        new Date()
      );
    },
    "teamB.points"() {
      this.$store.dispatch(
        "gameInformation/updateTotalDateTimeSinceTeamBScore",
        new Date()
      );
    },
    halfOption() {
      this.$store.dispatch("stopWatch/updateHalfOption", this.halfOption);
    }
  }
};
</script>
<style>
.btn-twitter {
  color: #fff;
  background-color: #1da1f2;
  border-color: #1da1f2;
}
</style>
