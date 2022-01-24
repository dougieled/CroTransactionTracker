<template>
  <v-flex xs8 text-xs-center v-if="started == true">
    <h3 class="text-center" id="time" v-html="stopwatch"></h3>
  </v-flex>
</template>

<script>
export default {
  name: 'Timer',
  computed: {
    started () {
      return this.$store.getters['stopWatch/started']
    },
    stopwatch () {
      return this.$store.getters['stopWatch/getStopwatch']
    }
  }
}
</script>
