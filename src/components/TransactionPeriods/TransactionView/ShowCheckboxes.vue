<template>
  <v-row>
    <v-col class="pb-0 pt-0" cols="4">
      <v-checkbox
        v-model="showTransactions"
        dense
        label="Show Transactions?"
        :on-icon="'check_box'"
        :off-icon="'check_box_outline_blank'"
      ></v-checkbox>
    </v-col>
    <v-col class="pb-0 pt-0" cols="4">
      <v-checkbox
        v-model="showDeposits"
        dense
        label="Show Deposits?"
        :on-icon="'check_box'"
        :off-icon="'check_box_outline_blank'"
      ></v-checkbox>
    </v-col>
    <v-col class="pb-0 pt-0" cols="4">
      <v-checkbox
        v-model="showATMWithdrawals"
        dense
        label="Show ATM Withdrawals?"
        :on-icon="'check_box'"
        :off-icon="'check_box_outline_blank'"
      ></v-checkbox>
    </v-col>
  </v-row>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
export default {
  name: 'ShowCheckboxes',
  data() {
    return {}
  },

  computed: {
    ...mapFields('transaction', [
      'showTransactions',
      'showDeposits',
      'showATMWithdrawals'
    ])
  },
  methods: {}
}
</script>
