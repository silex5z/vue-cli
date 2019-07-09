<template>
  <v-container>
    <v-layout justify-center
      wrap>
      <v-flex md4
        ma-5>
        <v-card>
          <v-card-title>
            <b>구구단</b>
          </v-card-title>
        </v-card>
        <v-flex mt-3>
          <p class="display-1">Q. {{ first }} * {{ second }} ?</p>
        </v-flex>
        <v-flex mt-4>
          <label for="">정답</label>
          <v-text-field label="Enter your answer"
            hint="At least 8 characters"
            v-model="userAnswer" ref="answer">
          </v-text-field>
        </v-flex>

        <v-flex text-xs-center>
          <v-btn @click="checkAnswer" color="primary">정답 확인</v-btn>
        </v-flex>
      </v-flex>

    </v-layout>
    <v-layout row
      justify-center>
      <v-dialog v-model="dialog"
        persistent
        max-width="300">
        <v-card >
          <v-card-title class="display-1 justify-center"><span>{{ message + '!' }}</span></v-card-title>
          <v-card-actions class="justify-center">
            <v-btn v-if="parseInt(this.userAnswer) === this.correctAnswer" color="green darken-1"
              flat
              @click="anotherRound">다른문제풀기</v-btn>
            <v-btn v-else color="red darken-1"
              flat
              @click="closeDialog">다시입력</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  methods: {
    makaRandomExam() {
      this.first = Math.ceil(Math.random() * 8)+1;
      this.second = Math.ceil(Math.random() * 8)+1;
    },
    checkAnswer() {
      this.message = parseInt(this.userAnswer) === this.correctAnswer ? '정답' : '땡';
      this.dialog  = true;
    },
    closeDialog() {
      this.dialog = false
      this.userAnswer = ''
      this.$refs.answer.focus()
    },
    anotherRound() {
      this.dialog = false
      this.makaRandomExam()
      this.userAnswer = ''
      this.$refs.answer.focus()
    }
  },
  data: function() {
    return {
      userAnswer: '',
      first: null,
      second: null,
      dialog: false,
      message: ''
    }
  },
  created: function(){
    this.makaRandomExam()
  },
  computed: {
    correctAnswer() {
      return this.first * this.second
    }
  }
};
</script>

<style scoped>
</style>
