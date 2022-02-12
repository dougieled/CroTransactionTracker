<template>
   <v-row>
      <v-col class="pb-0 pt-0" cols="4">
        Amount Spent: £{{ totalAmountSpent }}
      </v-col>
      <v-col class="pb-0 pt-0" cols="4">
        Amount Deposited: £{{ totalAmountDeposited }}
      </v-col>
      <v-col class="pb-0 pt-0" cols="4">
        Amount Withdrew: £{{ totalAmountWithdrew }}
      </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Amounts',
  data() {
    return {
    }
  },

  computed: {
     ...mapGetters('transaction', [
      'totalAmountSpent',
      'totalAmountWithdrew',
      'totalAmountDeposited'
    ]),
  },
  methods: {

  }
}
</script>
