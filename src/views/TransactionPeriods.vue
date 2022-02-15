<template>
  <v-container fluid class="p-0 mt-2">
    <v-row no-gutters>
      <v-col>
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
    </v-row>
    <v-row no-gutters>
      <v-col class="d-flex justify-center align-center mt-2 mb-2">
        <div
          class="text-h5 transition-swing font-weight-medium"
          v-text="periodicityWithDate"
        />
      </v-col>
    </v-row>
    <daily v-if="periodicity === 'Daily'" />
    <weekly v-if="periodicity === 'Weekly'" />
    <monthly v-if="periodicity === 'Monthly'" />
  </v-container>
</template>

<script>
import Daily from '../components/TransactionPeriods/Daily.vue'
import Weekly from '../components/TransactionPeriods/Weekly.vue'
import Monthly from '../components/TransactionPeriods/Monthly.vue'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  name: 'TransactionPeriods',
  props: ['periodicity'],
  components: { Daily, Weekly, Monthly },
  computed: {
    ...mapGetters('transaction', [
      'dateWithTime'
    ]),
    userDetails() {
      return this.$store.getters['user/userDetails']
    },
    formatDateDay() {
      return this.dateWithTime ? moment(this.dateWithTime).format('DD/MM/YYYY') : ''
    },
    formatDateWeekly() {
      let endDate = moment(this.dateWithTime).add(6, 'd')
      return this.dateWithTime ? `${moment(this.dateWithTime).format('DD/MM/YYYY')} - ${moment(endDate).format('DD/MM/YYYY')}` : ''
    },
    formatDateMonthly() {
      return this.dateWithTime ? moment(this.dateWithTime).format('MMMM') : ''
    },
    periodicityWithDate() {
      if (this.periodicity === 'Daily') {
        return `${this.periodicity} (${this.formatDateDay})`
      } else if (this.periodicity === 'Weekly') {
        return `${this.periodicity} (${this.formatDateWeekly})`
      } else {
        return `${this.periodicity} (${this.formatDateMonthly})`
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('transaction/getMyRecords').then(res => {})
    }
  }
}
</script>
