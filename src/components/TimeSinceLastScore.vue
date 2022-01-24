<template>
  <v-layout row>
    <v-flex xs12>
      <h4 class="text-center mb-0">
        <b>{{ team.name }}</b> last Scored:
        <span class="text-danger">
          <b v-html="timeSince"/>
        </span>
      </h4>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'TimeSinceLastScored',
  props: ['timeSince', 'team']
}
</script>
