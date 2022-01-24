<template>
  <v-flex xs2 class="pl-1">
    <v-col cols="12" class="pa-0">
       <v-btn v-if="!isTeamInfoNeeded"
        small
        fab
        dark
        color="blue lighten-1 mb-1"
        :href="'https://twitter.com/intent/tweet?text='+encodeURI(tweetInformation + '\n')+'&hashtags='+encodeURI(hashtagString)"
        target="_blank"
        >
        <i class="icon icon-twitter"></i>
    </v-btn>
    </v-col>
    <v-col cols="12" class="pa-0">
      <v-btn v-if="!isTeamInfoNeeded"
      small
      fab
      dark
      color="rgba(37,211,102 ,1 )"
      :href="'https://api.whatsapp.com/send?text='+encodeURI(tweetInformation)"
      target="_blank"
      >
      <i class="icon icon-whatsapp"></i>
    </v-btn>
    </v-col>
</v-flex>
</template>

<script>
export default {
  name: 'SocialMediaShare',
  data () {
    return {
      updatingScore: false
    }
  },
  computed: {
    isTeamInfoNeeded () {
      return this.$store.getters['gameInformation/isTeamInfoNeeded']
    },
    tweetInformation () {
      return this.$store.getters['gameInformation/tweetInformation']
    },
    hashtagString () {
      return this.$store.getters['gameInformation/hashtagArray'].join(',')
    }
  }
}
</script>
<style>
  .icon{
    font-size: 25px
  }
</style>
