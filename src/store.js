import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import db from './firebase'
// import firebase from 'firebase'
import todos from './modules/todos'
import pgv from './modules/pgv'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pgv,
    todos
  },
  state: {
    userList: [],
    // 로그인 정보
    user: null
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    
    fetchUserList(state, userList) {
      state.userList = userList
      // console.log(userList)
    },

    autoSignIn(state, payload) {
      state.user = payload
    },

    setUser(state, payload) {
      state.user = payload
    }

  },
  actions: {
    fetchUserList({ commit }) {
      axios.get('https://reqres.in/api/users').then(result => {
        // console.log(result.data)
        commit('fetchUserList', result.data.data)
      })
    },

    testFirebase({ commit }) {
      db.collection('pgv').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log(doc.id)
          console.log(JSON.stringify(doc.data()))
          var d = new Date()
          d.setTime(doc.data().date.seconds * 1000)
          // console.log(d.toISOString())
        })
      })
      commit('testFirebase', [])
    },

    addFirebase({ commit, state }) {
      db.collection('pgv').add(state.data).
        then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        })
    },

    autoSignIn({commit}, payload) {
      commit('autoSignIn', payload)
    },

    logOut({commit}) {
      commit('setUser', null)
    }
  }
})
