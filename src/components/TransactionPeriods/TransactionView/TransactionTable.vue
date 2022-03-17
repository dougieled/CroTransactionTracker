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
        <template v-slot:top>
          <v-toolbar flat>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteItem(item)">
            delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters, mapActions } from 'vuex'
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
        { text: 'Deposit', value: 'isDepositFormatted' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {}
    }
  },
  methods: {
    ...mapActions('transaction', ['removeTransactionByID']),
    row_classes(item) {
      if (item.isDeposit) {
        return 'green lighten-1'
      } else {
        return 'red lighten-1'
      }
    },
    deleteItem(item) {
      this.editedIndex = this.records.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.removeTransactionByID(this.editedItem)
      this.closeDelete()
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },
  computed: {
    ...mapFields('transaction', ['isLoading'])
  }
}
</script>
