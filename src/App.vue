<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  data () {
    return {
      test: true
    }
  },
  methods: {
    foo(){
      console.log('rebase test')
    }
  }
}
</script>
