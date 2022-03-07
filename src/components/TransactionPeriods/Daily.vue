<template>
  <v-container fluid class="p-0 mt-2">
    <v-row>
      <v-col cols="4" class="d-flex justify-start">
        <v-btn rounded color="#061122" dark @click="getPreviousDay">
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
      <v-col class="d-flex justify-end" cols="4">
        <v-btn
          v-if="!isSelectedDateToday"
          rounded
          color="#061122"
          dark
          @click="getNextDay"
        >
          <v-icon dark large>arrow_forward_ios</v-icon>
        </v-btn>
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
  name: 'Daily',
  components: { TransactionTable, ShowCheckboxes,Amounts },
  data() {
    return {
      activePicker: null,
      menu: false
    }
  },
  mounted() {
    if(this.$route.query.selectedDate){
      console.log('update date')
      console.log(moment(this.$route.query.selectedDate,'DD/MM/YYYY').format('YYYY-MM-DD'))
      this.date = moment(this.$route.query.selectedDate,'DD/MM/YYYY').format('YYYY-MM-DD')
    }else{
      this.setDate()
    }
    this.getData()
    this.period = 'Daily'
    
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'DATE'))
    }
  },
  computed: {
    ...mapFields('transaction', [
      'date',
      'period'
    ]),
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
    ...mapActions('transaction', ['getPreviousDay', 'getNextDay', 'setDate']),
    save(date) {
      this.$refs.menu.save(date)
    },
    getData() {
      this.$store.dispatch('transaction/getMyRecords').then(res => {})
    }
  }
}
</script>
