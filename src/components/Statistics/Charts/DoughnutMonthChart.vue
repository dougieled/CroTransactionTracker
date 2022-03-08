<template>
  <v-card dark>
    <v-card-title
      class="text-h7 justify-center"
      v-text="'Monthly Spend'"
    ></v-card-title>
    <doughnut-example
      ref="skills_chart"
      :chart-data="chartData"
      :options="options"
    >
    </doughnut-example>
  </v-card>
</template>

<script>
import randomColor from 'randomcolor'
import DoughnutExample from './Example/DoughnutExample.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  components: { DoughnutExample },
  data() {
    return {
      options: {
        pieceLabel: {
        mode: 'percentage',
        precision: 1
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
  mounted(){
    this.renderChart(this.chartData, this.options)
  },
  computed: {
    ...mapGetters('transaction', ['transactionNoDeposit']),
    transactionChartData() {
      let timestamps = this.transactionNoDeposit.map(x =>
        x.timestamp.format('MMMM YY')
      )
      const unique = [...new Set(timestamps)]
      let data = unique.map(x => {
        let filteredTransactions = this.transactionNoDeposit.filter(
          c => c.timestamp.format('MMMM YY') === x
        )
        return {
          date: x,
          transactions: filteredTransactions,
          amountTotal: parseFloat(filteredTransactions
            .map(x => x.amountFormatted)
            .reduce((a, b) => {
              return a + b
            }, 0).toFixed(2)),
            randomColor:randomColor()
        }
      })
      return data.sort((a,b) => new moment(a.date).format('YYYYMM') - new moment(b.date).format('YYYYMM'))
    },
    chartData() {
      return {
        labels: this.transactionChartData.map(x => x.date),
        datasets: [
          {
            backgroundColor: this.transactionChartData.map(x => x.randomColor),
            data: this.transactionChartData.map(x => x.amountTotal),
          }
        ]
      }
    }
  },
  mounted() {}
}
</script>

<style></style>
