<template>
  <div>
    <v-textarea outline
                v-model="memo"
                label="투두리스트를 입력해주세요."
                value></v-textarea>
    <v-btn v-if="this.editIdx === -1"
           @click="addList(memo)">리스트 추가</v-btn>
    <v-flex v-else>
      <v-btn @click="editList({ memo, id: editIdx })">리스트 수정</v-btn>
      <v-btn @click="cancelEdit(editIdx)">취소</v-btn>
    </v-flex>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as types from "../mutation-types";

export default {
  computed: {
    ...mapState(["editIdx"]),
    memo: {
      get() {
        return this.$store.state.editMemo;
      },
      set(value) {
        this.$store.commit("updateEditMemo", value);
      }
    }
  },
  created() {},
  methods: {
    ...mapActions({
      addList: types.ADD_TODO,
      editList: types.EDIT_TODO,
      cancelEdit: types.ADD_MODE
    })
  }
};
</script>
