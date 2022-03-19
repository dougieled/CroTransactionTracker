<template>
  <v-container fluid>
    <v-row v-if="!isUploading" >
      <v-col class="mt-2" cols="10" offset="1">
        <v-file-input
          accept=".csv"
          label="Choose Transaction CSV file"
          @change="selectFile"
          :key="componentKey"
        ></v-file-input>
      </v-col>
      <v-col cols="8" offset="2">
        <v-btn color="success" dark block @click="upload">
          Upload
          <v-icon right dark>upload_file</v-icon>
        </v-btn>
      </v-col>
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
    </v-row>
     <v-row v-else class="mt-3">
      <v-col cols="12" class="text-center">
        <h3 class="mb-3">Uploading please wait...</h3>
        <v-progress-circular
          :size="70"
          :width="7"
          color="teal"
          indeterminate
        >
        </v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import transactionManager from '../api/transactionManager.js'
export default {
  name: 'Upload',
  mounted() {},
  data() {
    return {
      currentFile: null,
      showAlert: false,
      componentKey:0,
      isUploading:false
    }
  },
  methods: {
    gotoHome() {
      this.$router.push('/')
    },
    selectFile(file) {
      this.currentFile = file
    },
    upload() {
      let self = this
      self.isUploading = true
      transactionManager.UploadFile(self.currentFile).then(res => {
        if (res.status === 200) {
          self.showAlert = true
          setTimeout(() => {
              self.showAlert = false
              self.gotoHome()
            }, 1500)
          self.currentFile = null
          self.componentKey++
        }
      }).finally(() => {
            self.isUploading = false
          })
    }
  },
  computed: {
  }
}
</script>
<style></style>
