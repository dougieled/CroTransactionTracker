<template>
  <v-container fluid class="p-0 mt-2">
    <v-row no-gutters>
      <v-col>
        <v-card :to="'/'" class="pa-2 text-center" outlined tile color="#385F73" dark>
          Back to Home
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <daily v-if="periodicity === 'Daily'" />
        <weekly v-if="periodicity === 'Weekly'" />
        <monthly v-if="periodicity === 'Monthly'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Daily from '../components/TransactionPeriods/Daily.vue'
import Weekly from '../components/TransactionPeriods/Weekly.vue'
import Monthly from '../components/TransactionPeriods/Monthly.vue'
export default {
  name: 'TransactionPeriods',
  props: ['periodicity'],
  components: { Daily, Weekly, Monthly },
  computed: {}
}
</script>
