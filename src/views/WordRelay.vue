<template>
  <v-container>
    <v-layout justify-center
      wrap>
      <v-flex md4
        ma-5>
        <v-card>
          <v-card-title>
            <b>끝말잇기</b>
          </v-card-title>
        </v-card>
        <v-layout>
          <v-flex mt-3 md5>
            <p class="display-1">{{ relayedWord }} -> </p>
          </v-flex>
          <v-flex mt-3 md5>
            <p class="display-1">{{ resultMessage }}</p>
          </v-flex>
        </v-layout>
        <v-flex mt-4>
          <label for="">정답</label>
          <v-text-field label="Enter your answer"
            hint="At least 8 characters"
            v-model="userWord" ref="answer" @keyup.enter="checkAnswer">
          </v-text-field>
        </v-flex>

        <v-flex text-xs-center>
          <v-btn @click="checkAnswer" color="primary">입력</v-btn>
        </v-flex>
      </v-flex>

    </v-layout>
  
  </v-container>
</template>

<script>

export default {
  methods: {
    checkAnswer() {
      if(this.userWord[0] === this.relayedWord[this.relayedWord.length-1]) {
        this.resultMessage = '딩동댕'
        this.relayedWord = this.userWord
        this.userWord = ''
        this.$refs.answer.focus()
      } else {
        this.resultMessage = '땡'
        this.userWord = ''
        this.$refs.answer.focus()
      }
    }
  },
  data: function() {
    return {
      userWord: '',
      relayedWord: '테스트',
      resultMessage: ''
    }
  },
  created: function(){
    this.$refs.answer.focus()
  }
};
</script>

<style scoped>
</style>
