<template>
      <v-data-table
        dense
        :headers="headers"
        :items="dearestTransactionsCombined"
        :items-per-page="7"
        item-key="id"
        class="elevation-1"
        :loading="isLoading"
        :mobile-breakpoint="0"
        loading-text="Loading... Please wait"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'keyboard_double_arrow_left',
          lastIcon: 'keyboard_double_arrow_right',
          prevIcon: 'keyboard_arrow_left',
          nextIcon: 'keyboard_arrow_right'
        }"
      >
      </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
  name: 'MostSpentRecurringTable',
  data() {
    return {
      headers: [
        { text: 'Description', value: 'description' },
        { text: 'Total', value: 'total' },
      ]
    }
  },
  methods: {
  },
  computed: {
    ...mapFields('transaction', ['isLoading']),
    ...mapGetters('transaction', ['dearestTransactionsCombined'])
    
  }
}
</script>
