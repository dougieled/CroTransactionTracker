<template>
  <v-row justify="center">
    <v-col cols="4" class="pb-0 pt-0" key="daily">
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
    <v-col class="pb-0 pt-0" cols="12">
      Amount spent: £{{totalAmountSpent}}
    </v-col>
    <v-col class="pb-0 pt-0" cols="12">
      <v-data-table
        dense
        :headers="headers"
        :items="transactions"
        :items-per-page="100"
        :item-class="row_classes"
        class="elevation-1"
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
        // { text: 'ID', value: 'id' },
        //   {
        //     text: 'Dessert (100g serving)',
        //     align: 'start',
        //     sortable: false,
        //     value: 'name',
        //   }
      ]
    }
  },
  mounted() {
    this.date = new Date().toISOString().slice(0, 10)
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  computed: {
    formatDate() {
      return this.date ? moment(this.date).format('DD/MM/YYYY') : ''
    },
    transactions() {
      return this.$store.getters['transaction/transactions']
    },
    totalAmountSpent() {
      let amounts = this.transactions
        .filter(x => !x.isDeposit)
        .map(x => x.amountFormatted)
      var sum = 0
      for (var i = 0; i < amounts.length; i++) {
        sum += amounts[i]
      }
      return sum
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
    }
  }
}
</script>
