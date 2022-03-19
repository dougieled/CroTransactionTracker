<template>
  <v-container fluid>
    <v-row v-if="transactions.length > 0 && !isLoading">
      <v-col cols="12">
        <v-card
          :to="'/'"
          class="pa-2 text-center"
          outlined
          tile
          color="#385F73"
          dark
        >
          Back to Home
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-2 pb-0" sm="12" md="4">
        <v-card dark>
          <v-card-title
            class="text-h7 justify-center"
            v-text="'Highest Daily Spend'"
          ></v-card-title>

          <v-card-actions>
            <v-btn
              class=""
              outlined
              rounded
              block
              color="teal"
              :loading="isLoading"
              :to="dearestDayLink"
            >
              {{ currencySymbol }} {{ dearestDay.total }} ({{
                dearestDay.formattedDate
              }})
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-2 pb-0" sm="12" md="4">
        <v-card dark>
          <v-card-title
            class="text-h7 justify-center"
            v-text="'Average Daily Spend'"
          ></v-card-title>

          <v-card-actions>
            <v-btn
              class=""
              outlined
              rounded
              block
              color="teal"
              :loading="isLoading"
            >
              {{ currencySymbol }} {{ averageDailySpend }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-2 pb-0" sm="12" md="4">
        <v-card dark>
          <v-card-title
            class="text-h7 justify-center"
            v-text="'Lowest Daily Spend'"
          ></v-card-title>

          <v-card-actions>
            <v-btn
              class=""
              outlined
              rounded
              block
              color="teal"
              :loading="isLoading"
              :to="cheapestDayLink"
            >
              {{ currencySymbol }} {{ cheapestDay.total }} ({{
                cheapestDay.formattedDate
              }})
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-2 pb-0" sm="12" md="4">
        <v-card dark class="pb-12">
          <v-card-title
            class="text-h7 justify-center"
            v-text="'Most spent Recurring'"
          ></v-card-title>

          <most-spent-recurring-table />
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-2 pb-0" sm="12" md="4">
        <v-card dark class="pb-12">
          <v-card-title
            class="text-h7 justify-center"
            v-text="'Weekday Spending Average'"
          ></v-card-title>
          <weekday-spending-average-table />
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-2 pb-0" sm="12" md="4">
        <v-card dark>
          <v-card-title
            class="text-h7 justify-center"
            v-text="'Monthly Spend'"
          ></v-card-title>
          <doughnut-month-chart class="" />
        </v-card>
      </v-col>
      <v-col cols="12" class="pb-8" sm="12" md="12">
        <bar-daily-chart class="pa-6" />
      </v-col>
      <v-col cols="12" class="pb-8" md="12"> </v-col>
    </v-row>
    <v-row v-else-if="transactions.length === 0 && isLoading" class="mt-3">
      <v-col cols="12" class="text-center">
        <h3 class="mb-3">Loading please wait...</h3>
        <v-progress-circular
          :size="70"
          :width="7"
          color="teal"
          indeterminate
        >
        </v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else class="mt-3">
      <v-col cols="12">
        <v-alert dense type="error" icon="error_outline"
          >You have no Transactions!</v-alert
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import DoughnutMonthChart from '../components/Statistics/Charts/DoughnutMonthChart.vue'
import BarDailyChart from '../components/Statistics/Charts/BarDailyChart.vue'
import MostSpentRecurringTable from '../components/Statistics/MostSpentRecurring/MostSpentRecurringTable.vue'
import WeekdaySpendingAverageTable from '../components/Statistics/WeekdaySpendingAverage/WeekdaySpendingAverageTable.vue'
export default {
  name: 'Statistics',
  components: {
    DoughnutMonthChart,
    BarDailyChart,
    MostSpentRecurringTable,
    WeekdaySpendingAverageTable
  },
  data() {
    return {}
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        if (to.name === 'Statistics') {
          this.doOnPageLoad()
        }
      }
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('transaction/getMyRecords').then(res => {})
    },
    doOnPageLoad() {
      this.getData()
      this.period = 'All'
    }
  },
  computed: {
    ...mapFields('transaction', ['period', 'isLoading']),
    ...mapGetters('transaction', [
      'transactions',
      'currencySymbol',
      'averageDailySpend',
      'cheapestDay',
      'dearestDay'
    ]),
    dearestDayLink() {
      return {
        path: '/TransactionPeriods/Daily',
        query: { selectedDate: this.dearestDay.formattedDate }
      }
    },
    cheapestDayLink() {
      return {
        path: '/TransactionPeriods/Daily',
        query: { selectedDate: this.cheapestDay.formattedDate }
      }
    }
  }
}
</script>
<style></style>
