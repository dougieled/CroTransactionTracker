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
      <v-btn
        v-if="!isSelectedDateToday"
        rounded
        color="#061122"
        dark
        @click="getNext"
      >
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
      <transaction-table :records="records" />
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import TransactionTable from './TransactionView/TransactionTable.vue'
import { mapFields } from 'vuex-map-fields'
import { mapGetters } from 'vuex'
export default {
  name: 'Daily',
  components: { TransactionTable },
  data() {
    return {
      activePicker: null,
      menu: false
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
    ...mapFields('transaction', ['date','showTransactions','showDeposits','showATMWithdrawals']),
    ...mapGetters('transaction', [
      'totalAmountSpent',
      'totalAmountWithdrew',
      'totalAmountDeposited',
      'records'
    ]),
    isSelectedDateToday() {
      return moment().isSame(moment(this.date), 'day')
    },
    formatDate() {
      return this.date ? moment(this.date).format('DD/MM/YYYY') : ''
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
    getPrevious() {
      this.date = moment(this.date)
        .subtract(1, 'd')
        .format('YYYY-MM-DD')
    },
    getNext() {
      this.date = moment(this.date)
        .add(1, 'd')
        .format('YYYY-MM-DD')
    }
  }
}
</script>
