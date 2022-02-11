<template>
  <v-row>
    <v-col cols="4" class="d-flex justify-start">
      <v-btn rounded color="#061122" dark @click="getPrevious">
        <v-icon dark large>arrow_back_ios</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="4" class="pt-0" key="daily">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="formatDate"
            label="Selected Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          :active-picker.sync="activePicker"
          :max="
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .substr(0, 10)
          "
          min="2015-01-01"
          @change="save"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col class="d-flex justify-end" cols="4">
      <v-btn v-if="!isSelectedDateToday" rounded color="#061122" dark @click="getNext">
        <v-icon dark large>arrow_forward_ios</v-icon>
      </v-btn>
    </v-col>

    <v-col class="pb-0 pt-0" cols="4">
      <v-checkbox
        v-model="showTransactions"
        dense
        label="Show Transactions?"
      ></v-checkbox>
    </v-col>
    <v-col class="pb-0 pt-0" cols="4">
      <v-checkbox
        v-model="showDeposits"
        dense
        label="Show Deposits?"
      ></v-checkbox>
    </v-col>
    <v-col class="pb-0 pt-0" cols="4">
      <v-checkbox
        v-model="showATMWithdrawals"
        dense
        label="Show ATM Withdrawals?"
      ></v-checkbox>
    </v-col>
    <v-col class="pb-0 pt-0" cols="4">
      Amount Spent: £{{ totalAmountSpent }}
    </v-col>
    <v-col class="pb-0 pt-0" cols="4">
      Amount Deposited: £{{ totalAmountDeposited }}
    </v-col>
    <v-col class="pb-0 pt-0" cols="4">
      Amount Withdrew: £{{ totalAmountWithdrew }}
    </v-col>
    <v-col class="pb-10 pt-0" cols="12">
      <v-data-table
        dense
        :headers="headers"
        :items="records"
        :items-per-page="10"
        :item-class="row_classes"
        item-key="id"
        class="elevation-1"
        :footer-props="{
          showFirstLastPage: true
        }"
      ></v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Daily',
  components: {},
  data() {
    return {
      activePicker: null,
      date: null,
      menu: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Timestamp', value: 'timestampFormatted' },
        { text: 'Description', value: 'description' },
        { text: 'Amount', value: 'amountFormatted' },
        { text: 'Deposit', value: 'isDepositFormatted' }
      ],
      showTransactions: true,
      showDeposits: true,
      showATMWithdrawals: true
    }
  },
  mounted() {
    this.date = new Date().toISOString().slice(0, 10)
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'DATE'))
    }
  },
  computed: {
    isSelectedDateToday() {
      return moment().isSame(moment(this.date), 'day')
    },
    formatDate() {
      return this.date ? moment(this.date).format('DD/MM/YYYY') : ''
    },
    dateWithTime(){
      return moment(this.date).add(12,'hours')
    },
    allStoreTransaction() {
      return this.$store.getters['transaction/transactions']
    },
    storeTransaction() {
      return this.$store.getters['transaction/transactions'].filter(x =>
        moment(moment(x.timestamp)).isSame(moment(this.dateWithTime), 'day')
      )
    },
    deposits() {
      return this.storeTransaction.filter(x => x.isDeposit)
    },
    transactions() {
      return this.storeTransaction.filter(x => !x.isDeposit)
    },
    records() {
      let array = []
      if (this.showTransactions) {
        array = array.concat(
          this.transactions.filter(x => x.description !== 'ATM')
        )
      }
      if (this.showDeposits) {
        array = array.concat(this.deposits)
      }
      if (this.showATMWithdrawals) {
        array = array.concat(
          this.transactions.filter(x => x.description === 'ATM')
        )
      }
      return array.sort((a, b) =>
      a.timestamp > b.timestamp ? 1 : b.timestamp > a.timestamp ? -1 : 0
    )
    },
    totalAmountSpent() {
      let amounts = this.showATMWithdrawals
        ? this.transactions.filter(x => !x.isDeposit)
        : this.transactions.filter(x => !x.isDeposit && x.description !== 'ATM')
      let amountsTotal = amounts.map(x => x.amountFormatted)
      var sum = 0
      for (var i = 0; i < amountsTotal.length; i++) {
        sum += amountsTotal[i]
      }
      return sum.toFixed(2)
    },
    totalAmountWithdrew() {
      let amounts = this.transactions.filter(
        x => !x.isDeposit && x.description === 'ATM'
      )
      let amountsTotal = amounts.map(x => x.amountFormatted)
      var sum = 0
      for (var i = 0; i < amountsTotal.length; i++) {
        sum += amountsTotal[i]
      }
      return sum.toFixed(2)
    },
    totalAmountDeposited() {
      let amounts = this.deposits
        .filter(x => x.isDeposit)
        .map(x => x.amountFormatted)
      var sum = 0
      for (var i = 0; i < amounts.length; i++) {
        sum += amounts[i]
      }
      return sum.toFixed(2)
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
    row_classes(item) {
      if (item.isDeposit) {
        return 'green lighten-1'
      } else {
        return 'red lighten-1'
      }
    },
    getPrevious(){
      this.date = moment(this.date).subtract(1, 'd').format('YYYY-MM-DD')
    },
    getNext(){
      this.date = moment(this.date).add(1, 'd').format('YYYY-MM-DD')
    }
  }
}
</script>
