<template>
  <v-card>
    <v-layout row wrap align-center justify-center text-xs-center>
      <v-flex md2>
        {{ user.first_name }}
      </v-flex>
      <v-flex md2>
        {{ user.last_name }}
      </v-flex>
      <v-flex md2>
        <v-avatar>
          <img :src="user.avatar">
        </v-avatar>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["user"],
  methods: {
    ...mapActions({}),
    toggleClass() {
      this.isTest = !this.isTest;
    }
  },
  data: function() {
    return {
      isTest: false
    };
  }
};
</script>

<style scoped>
.done {
  background-color: lightgray;
}

.done p {
  color: gray;
  text-decoration: line-through;
}

.edit {
  position: relative;
  z-index: 2;
  outline: 3px solid lightpink;
}

.test {
  outline: 1px solid blue;
}
</style>
