<template>
  <div>
    <v-card
      class="pa-3 ma-2"
      :class="{ 'done' : todo.status === 'done', 'edit' : todo.status === 
      'edit', 'test': isTest }"
      v-for="(todo, idx) in todoList"
      :key="idx"
    >
      <p>{{ todo.memo }}</p>
      <v-btn
        v-if="todo.status === 'created'"
        @click="statusControl({idx, status:'done'})"
        fab
        flat
        small
        color="green"
      >
        <v-icon>check</v-icon>
      </v-btn>
      <v-btn
        v-if="todo.status === 'done'"
        @click="statusControl({idx, status:'created'})"
        fab
        flat
        small
        color="blue"
      >
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn @click="deleteList(idx)" fab flat small color="red">
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn v-if="todo.status ==='created'" @click="editMode(idx)" fab flat small color="yellow">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn @click="toggleClass" fab flat small color="blue">
        <v-icon>check</v-icon>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import * as types from "../mutation-types";

export default {
  props: ["todoList"],
  methods: {
    ...mapActions({
      editMode: types.EDIT_MODE,
      deleteList: types.TODO_DELETE,
      statusControl: types.CTRL_STATUS
    }),
    toggleClass() {
      this.isTest = !this.isTest;
    }
  },
  data: function() {
    return {
      isTest: true
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
