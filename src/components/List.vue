<template>
  <div>
    <v-card
      class="pa-3 ma-2"
      :class="{ 'done' : todo.status === 'done', 'edit' : todo.status === 
      'edit', 'test': isTest }" :id="todo.id">
      <p>{{
        todo.memo
        }}</p>
      <v-btn
        v-if="todo.status === 'created'"
        @click="statusControl({id:todo.id, status:'done', memo: todo.memo})"
        fab
        flat
        small
        color="green">
        <v-icon>check</v-icon>
      </v-btn>
      <v-btn
        v-if="todo.status === 'done'"
        @click="statusControl({id:todo.id, status:'created', memo: todo.memo})"
        fab
        flat
        small
        color="blue">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn
        @click="deleteList(todo.id)"
        fab
        flat
        small
        color="red">
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn
        v-if="todo.status ==='created'"
        @click="editMode(todo.id)"
        fab
        flat
        small
        color="yellow">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        @click="toggleClass"
        fab
        flat
        small
        color="blue">
        <v-icon>check</v-icon>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import * as types from "../mutation-types"

export default {
  props: ["todo"],
  methods: {
    ...mapActions({
      editMode: types.EDIT_MODE,
      deleteList: types.DELETE_TODO,
      statusControl: types.CTRL_STATUS
    }),
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
