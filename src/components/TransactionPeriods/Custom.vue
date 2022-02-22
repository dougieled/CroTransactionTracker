<template>
  <v-container fluid class="p-0 mt-2">
    <v-row>
      <v-col cols="2"/>
      <v-col cols="4" class="pt-0" key="start">
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
              label="Selected Start Date"
              prepend-icon="calendar_today"
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
      <v-col cols="4" class="pt-0" key="start">
        <v-menu
          ref="endMenu"
          v-model="endMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endFormatDate"
              label="Selected End Date"
              prepend-icon="calendar_today"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            :active-picker.sync="endActivePicker"
            :max="
              new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
            "
            min="2015-01-01"
            @change="endSave"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <show-checkboxes />
    <amounts/>
        <transaction-table :records="records" />
  </v-container>
</template>

<script>
import moment from 'moment'
import TransactionTable from './TransactionView/TransactionTable.vue'
import ShowCheckboxes from './TransactionView/ShowCheckboxes.vue'
import Amounts from './TransactionView/Amounts.vue'
import { mapFields } from 'vuex-map-fields'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Weekly',
  components: { TransactionTable, ShowCheckboxes,Amounts },
  data() {
    return {
      activePicker: null,
      endActivePicker: null,
      menu: false,
      endMenu: false
    }
  },
  mounted() {
    this.date = null
    this.endDate = null
    this.getData()
    this.period = 'Custom'
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'DATE'))
    },
    endMenu(val) {
      val && setTimeout(() => (this.endActivePicker = 'DATE'))
    }
  },
  computed: {
    ...mapFields('transaction', [
      'date',
      'endDate',
      'period'
    ]),
    ...mapGetters('transaction', [
      'totalAmountSpent',
      'totalAmountWithdrew',
      'totalAmountDeposited',
      'records'
    ]),
    formatDate() {
      return this.date ? moment(this.date).format('DD/MM/YYYY') : ''
    },
    endFormatDate() {
      return this.endDate ? moment(this.endDate).format('DD/MM/YYYY') : ''
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
    endSave(date) {
      this.$refs.endMenu.save(date)
    },
    getData() {
      this.$store.dispatch('transaction/getMyRecords').then(res => {})
    }
  }
}
</script>
