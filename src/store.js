import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import db from './firebase'
// import firebase from 'firebase'
// import todos from './modules/todos'
import pgv from './modules/pgv'
import { ADD_TODO, EDIT_TODO, DELETE_TODO, EDIT_MODE, ADD_MODE, CTRL_STATUS, GET_LIST } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pgv
  },
  state: {
    todoList: [],
    editIdx: -1,
    editMemo: '',
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
    [GET_LIST](state, list) {
      state.todoList = list;
    },
    [ADD_TODO](state, memo) {
      state.todoList.push({ memo, status: "created" })
    },
    [EDIT_TODO](state, newTodo) {
      state.todoList[newTodo.id].memo = newTodo.memo
    },
    [DELETE_TODO](state, idx) {
      state.todoList.splice(idx, 1);
    },
    [EDIT_MODE](state, id) {
      state.editIdx = id
      state.editMemo = state.todoList.filter((todo) => todo.id === id)[0].memo
    },
    [CTRL_STATUS](state, { id, status }) {
      state.todoList.filter((todo) => todo.id === id)[0].status = status
    },
    updateEditMemo(state, memo) {
      state.editMemo = memo
    },
    resetMemo(state) {
      state.editIdx = -1
      state.editMemo = ''
    },
    updateList(state, newList) {
      state.todoList = newList
    },
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
    [GET_LIST]({ commit }, userId) {
      axios.get('http://localhost:3000/todoList/' + userId).then((result) => {
        commit('GET_LIST', result.data.todoList)
      })
    },
    [ADD_TODO]({ commit }, payload) {
      if (!payload) {
        return alert('no message input!')
      }
      axios.post('http://localhost:3000/todoList', { id: new Date().getTime(), memo: payload, status: "created" }).then((result) => {
        this.dispatch('GET_LIST')
      })
      commit('resetMemo')
    },
    [EDIT_TODO]({ commit }, newTodo) {
      axios.put('http://localhost:3000/todoList/' + newTodo.id, { id: newTodo.id, memo: newTodo.memo, status: "created" }).then((result) => {
        this.dispatch('GET_LIST')
        this.dispatch('ADD_MODE', newTodo.id)
      })
    },
    [DELETE_TODO]({ commit, state }, id) {
      let test = state.todoList.filter(todo => todo.status === 'edit')
      if (test.length > 0) {
        return alert('완료되지 않은 항목이 있습니다.')
      } else {
        axios.delete('http://localhost:3000/todoList/' + id).then((result) => {
          this.dispatch('GET_LIST')
        })
      }
    },
    [EDIT_MODE]({ commit, state }, id) {
      let test = state.todoList.filter(todo => todo.status === 'edit')
      if (test.length > 0) {
        return alert('완료되지 않은 항목이 있습니다.')
      } else {
        commit('EDIT_MODE', id)
        commit('CTRL_STATUS', { id, status: 'edit' })
      }
    },
    [CTRL_STATUS]({ commit }, payload) {
      // commit('CTRL_STATUS', payload)
      axios.put('http://localhost:3000/todoList/' + payload.id, { id: payload.id, status: payload.status, memo: payload.memo }).then((result) => {
        this.dispatch('GET_LIST')
        // this.dispatch('ADD_MODE', newTodo.id)
      })
    },

    [ADD_MODE]({ commit }, id) {
      commit('CTRL_STATUS', { id, status: 'created' })
      commit('resetMemo')
    },

    updateList({ commit }, newList) {
      commit('updateList', newList)
    },

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
