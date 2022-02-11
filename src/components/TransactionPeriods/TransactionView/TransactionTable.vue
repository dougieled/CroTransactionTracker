<template>
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
</template>

<script>
export default {
  name: 'Daily',
  props:['records'],
  components: {},
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Timestamp', value: 'timestampFormatted' },
        { text: 'Description', value: 'description' },
        { text: 'Amount', value: 'amountFormatted' },
        { text: 'Deposit', value: 'isDepositFormatted' }
      ]
    }
  },
  methods: {
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
