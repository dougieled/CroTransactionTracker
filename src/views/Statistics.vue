<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card
          :to="'/'"
          class="pa-2 text-center"
          outlined
          tile
          color="#385F73"
          dark
        >
          Back to Home
        </v-card>
      </v-col>
      <!-- <v-col class="mt-2" cols="4">
        <v-card dark>
          <v-card-title
            class="text-h7 justify-center"
            v-text="'Highest Daily Spend'"
          ></v-card-title>

          <v-card-actions>
            <v-btn class="" outlined rounded block color="teal">
              {{ currencySymbol }} {{ averageDailySpend }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col> -->
      <v-col class="mt-2" cols="12">
        <v-card dark>
          <v-card-title
            class="text-h7 justify-center"
            v-text="'Average Daily Spend'"
          ></v-card-title>

          <v-card-actions>
            <v-btn class="" outlined rounded block color="teal">
              {{ currencySymbol }} {{ averageDailySpend }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <!-- <v-col class="mt-2" cols="4">
        <v-card dark>
          <v-card-title
            class="text-h7 justify-center"
            v-text="'Lowest Daily Spend'"
          ></v-card-title>

          <v-card-actions>
            <v-btn class="" outlined rounded block color="teal">
              {{ currencySymbol }} {{ averageDailySpend }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Upload',
  mounted() {},
  data() {
    return {}
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('transaction/getMyRecords').then(res => {})
    }
  },
  computed: {
    ...mapGetters('transaction', [
      'transactions',
      'currencySymbol',
      'averageDailySpend'
    ])
  }
}
</script>
<style></style>
