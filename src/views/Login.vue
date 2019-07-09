<template>
  <v-container>
    <v-layout justify-center
      wrap>
      <v-flex md4
        ma-5>
        <v-card>
          <v-card-title>
            Login
          </v-card-title>
        </v-card>

        <v-flex mt-4>
          <label for="">ID</label>
          <v-text-field label="Enter your id"
            hint="At least 8 characters"
            v-model="userId">
          </v-text-field>
        </v-flex>
        <v-flex mt-4>
          <label for="">PASSWORD</label>
          <v-text-field type="password"
            hint="At least 8 characters"
            label="Enter your password"
            v-model="userPassword">
          </v-text-field>
        </v-flex>

        <v-flex text-xs-center>
          <v-btn @click="logIn" color="primary">Login</v-btn>
        </v-flex>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex"
import firebase from 'firebase'
// import * as types from "../mutation-types";

export default {
  methods: {
    ...mapActions(['setUser']),
    logIn() {
      firebase.auth().signInWithEmailAndPassword(this.userId, this.userPassword).then(user => {
        this.$router.push('/pgv')
        
      }).catch(err=>alert(err))
      
    }
  },
  data: function() {
    return {
      userId: 'test@email.com',
      userPassword: 'aaaaaa'
    }
  }
};
</script>

<style scoped>
</style>
