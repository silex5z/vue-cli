<template>
  <v-container>
    <v-layout row
      wrap>
      <v-flex xs12
        text-xs-center>
        <h1>투두 리스트</h1>
        <p>전체 할일: {{ todoList.length }} / 완료된 할일: {{ countDone }} / 남은 할일: {{ todoList.length - countDone }}</p>
      </v-flex>
      <v-flex xs6
        pa-2>
        <draggable :options="{animation:300}" v-model="myList">
          <List v-for="(todo, idx) in myList"
            class="list"
            :todo="todo"
            :key="idx"></List>
        </draggable>
      </v-flex>
      <v-flex xs6
        pa-2>
        <ListAdd class="list-add" />
      </v-flex>
      <div :class="{'dimmed': editIdx !== -1}"></div>
    </v-layout>
  </v-container>
</template>

<script>
import List from "../components/List";
import ListAdd from "../components/ListAdd";
import { mapState, mapActions } from "vuex";
import * as types from "../mutation-types";
import draggable from "vuedraggable";

export default {
  components: {
    List,
    ListAdd,
    draggable
  },
  computed: {
    countDone() {
      let count = 0;
      this.todoList.forEach(list => {
        if (list.status === "done") count++;
      });
      return count;
    },
    myList: {
      get() {
        return this.$store.state.todos.todoList
      },
      set(value) {
        this.$store.dispatch('updateList', value)
      }
    },
    ...mapState('todos',['todoList', 'editIdx'])
  },
  methods: {
    ...mapActions({ getList: types.GET_LIST })
  },
  mounted() {
    this.getList();
  }
};
</script>

<style>
.dimmed {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  transition: all 0.4s ease-in-out;
}

.list {
  position: relative;
}

.list-add {
  position: relative;
  z-index: 2;
  background-color: white;
}
</style>