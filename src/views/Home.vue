<template>
  <v-container fluid class="p-0 mt-2">
    <v-row no-gutters >
      <v-col cols="4" key="daily">
        <v-card :to="'/TransactionPeriods/Daily'" class="pa-2 text-center" outlined tile>
          Daily
          <br>
          <v-icon
            dark
            large
            class="teal--text"
            >calendar_view_day</v-icon
          >
        </v-card>
      </v-col>
      <v-col cols="4" key="weekly">
        <v-card :to="'/TransactionPeriods/Weekly'" class="pa-2 text-center" outlined tile>
          Weekly
          <br>
           <v-icon
            dark
            large
            class="teal--text"
            >calendar_view_week</v-icon
          >
        </v-card>
      </v-col>
      <v-col cols="4" key="monthly">
        <v-card :to="'/TransactionPeriods/Monthly'" class="pa-2 text-center" outlined tile>
          Monthly
          <br>
           <v-icon
            dark
            large
            class="teal--text"
            >calendar_view_month</v-icon
          >
        </v-card>
      </v-col>
       <v-col class="mt-2" cols="12" key="custom">
        <v-card :to="'/TransactionPeriods/Custom'" class="pa-2 text-center" outlined tile>
          Custom
          <br>
           <v-icon
            dark
            large
            class="teal--text"
            >date_range</v-icon
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  components: {},
  computed: {}
}
</script>
