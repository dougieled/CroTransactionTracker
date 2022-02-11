<template>
  <v-container fluid>
    
    <v-row justify="center">
      <v-flex xs11>
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
            <v-layout class="mt-3" row align-center justify-center>
              <v-flex xs5>
                <v-alert
      :value="showAlert"
      v-model="showAlert"
      dense
      type="success"
      icon="mdi-check-circle"
      >Updated Successfully!</v-alert
    >
              </v-flex>
              <v-flex xs11>
                <v-btn
                  block
                  right
                  color="#061122"
                  @click="update"
                  dark
                  class="mb-3"
                  >Save changes</v-btn
                >
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'CROActions',
  data() {
    return {
      valid: true,
      isLoading: false,
      utcOffsetLocal: '',
      utcOffsetRules: [v => !!v || 'UTC Offset is required'],
      showAlert: false
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
    }
  }
}
</script>
<style></style>
