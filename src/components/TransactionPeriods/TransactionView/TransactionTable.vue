<template>
  <v-row>
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
      showFirstLastPage: true,
      firstIcon: 'keyboard_double_arrow_left',
      lastIcon: 'keyboard_double_arrow_right',
      prevIcon: 'keyboard_arrow_left',
      nextIcon: 'keyboard_arrow_right'
    }"
      ></v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TransactionTable',
  props: ['records'],
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
