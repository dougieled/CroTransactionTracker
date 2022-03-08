<template>
  <v-card dark>
    <v-card-title
      class="text-h7 justify-center"
      v-text="'Daily Spend'"
    ></v-card-title>
    <bar-example
      ref="daily_spend_chart"
      :chart-data="chartData"
      :options="options"
    >
    </bar-example>
  </v-card>
</template>

<script>
import randomColor from 'randomcolor'
import BarExample from './Example/BarExample.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  components: { BarExample },
  data() {
    return {
      options: {
        yAxisID:'test',
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 0
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
  computed: {
    ...mapGetters('transaction', ['transactionNoDeposit', 'currencySymbol']),
    transactionChartData() {
      let timestamps = this.transactionNoDeposit.map(x =>
        x.timestamp.format('DD/MM/YYYY')
      )
      const unique = [...new Set(timestamps)]
      let data = unique.map(x => {
        let filteredTransactions = this.transactionNoDeposit.filter(
          c => c.timestamp.format('DD/MM/YYYY') === x
        )
        let amountTotalOfMonth = parseFloat(
          filteredTransactions
            .map(x => x.amountFormatted)
            .reduce((a, b) => {
              return a + b
            }, 0)
            .toFixed(2)
        )
        return {
          date: x,

          transactions: filteredTransactions,
          amountTotal: amountTotalOfMonth,
          label: `${x} (${this.currencySymbol}${amountTotalOfMonth})`,
          randomColor: randomColor()
        }
      })
      return data.sort(
        (a, b) =>
          new moment(a.date).format('DD/MM/YYYY') -
          new moment(b.date).format('DD/MM/YYYY')
      )
    },
    chartData() {
      return {
        labels: this.transactionChartData.map(x => x.label),
        datasets: [
          {
            backgroundColor: this.transactionChartData.map(x => x.randomColor),
            data: this.transactionChartData.map(x => x.amountTotal)
          }
        ]
      }
    }
  },
  mounted() {}
}
</script>

<style></style>
