<template>
  <v-container fluid>
    <v-row>
       <v-col cols="8">
        <v-file-input
        accept=".csv"
          label="Choose Transaction CSV file"
          @change="selectFile"
        ></v-file-input>
      </v-col>
      <v-col cols="4" class="pl-2">
        <v-btn color="success" dark small @click="upload">
          Upload
          <v-icon right dark>mdi-file</v-icon>
        </v-btn>
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
      currentFile: null
    }
  },
  methods: {
    gotoHome() {
      this.$router.push('/')
    },
    selectFile(file) {
      this.currentFile = file;
    },
    upload(){
      console.log(this.currentFile)
      transactionManager.UploadFile(this.currentFile).then(res => {
        if (res.status === 200) {
          console.log('file uploaded')
          this.currentFile = null
        }
      })
    }
  },
  computed: {}
}
</script>
<style></style>
