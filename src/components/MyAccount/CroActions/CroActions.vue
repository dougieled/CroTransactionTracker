<template>
    <v-row>
      <v-col cols="10" offset="1">
        <v-card>
          <v-card-text>
            <v-form ref="updateSettings" v-model="valid" lazy-validation>
              <v-select
                :items="utcOffsetOptions"
                v-model="utcOffsetLocal"
                label="UTC Offset"
                item-text="label"
                item-value="label"
                :rules="utcOffsetRules"
                outlined
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="6" offset="3">
                <v-alert
                  :value="showAlert"
                  v-model="showAlert"
                  dense
                  type="success"
                  icon="check_circle_outline"
                  >Updated Successfully!</v-alert
                >
              </v-col>
               <v-col cols="10" offset="1">
                <v-btn
                  block
                  right
                  color="red"
                  @click="resetTransactions"
                  dark
                  class="mb-3"
                  >Reset All Transactions</v-btn
                >
              </v-col>
              <v-col cols="10" offset="1">
                <v-btn
                  block
                  right
                  color="#061122"
                  @click="update"
                  dark
                  class="mb-3"
                  >Save changes</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
       <v-dialog v-model="dialogReset" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete all your transactions?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeReset">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="resetTransactionsConfirm">Yes</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CROActions',
  data() {
    return {
      valid: true,
      isLoading: false,
      utcOffsetLocal: '',
      utcOffsetRules: [v => !!v || 'UTC Offset is required'],
      showAlert: false,
      dialogReset: false,
    }
  },
  computed: {
    userDetails() {
      return this.$store.getters['user/userDetails']
    },
    utcOffset() {
      return this.$store.getters['setting/utcOffset']
    },
    utcOffsetOptions() {
      return this.$store.getters['setting/utcOffsetOptions']
    }
  },
  mounted() {
    this.utcOffsetLocal = this.utcOffset
  },
  methods: {
    ...mapActions('transaction', ['removeAllMyTransactions']),
    update() {
      let self = this
      if (this.$refs.updateSettings.validate()) {
        this.showAlert = true
        this.$store
          .dispatch('setting/updateUtcOffset', this.utcOffsetLocal)
          .then(res => {
            setTimeout(() => {
              self.showAlert = false
            }, 5000)
          })
      }
    },
    resetTransactions() {
      this.dialogReset = true
    },
    resetTransactionsConfirm() {
      this.removeAllMyTransactions()
      this.closeReset()
    },

    closeReset() {
      this.dialogReset = false
    }
  }
}
</script>
<style></style>
