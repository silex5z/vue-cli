<template>
  <v-container>
    <v-layout row
      wrap
      justify-center>
      <v-flex xs12
        text-xs-center
        mb-3>
        <h1>Users</h1>
      </v-flex>
      <v-flex xs10
        sm6>
        <draggable v-model="userList">
          <UserList v-for="(user, idx) in userList"
            :key="idx"
            :user="user">
          </UserList>
        </draggable>
      </v-flex>
    </v-layout>

    <v-layout row
      wrap
      justify-center
      mt-5>
      <v-flex xs12
        text-xs-center
        mb-3>
        <h1>Drag and Drop</h1>
      </v-flex>
      <v-flex xs2
        text-xs-center
        px-3>
        <!-- <draggable v-model="myArray1" class="wrap1"
          options="{group:'test'}">
            <div v-for="(item, idx) in myArray1"
              :key="idx">
              {{ item }}
            </div>
        </draggable>

        <draggable v-model="myArray2"
          options="{group:'test'}">
            <div v-for="(item, idx) in myArray2"
              :key="idx">
              {{ item }}
            </div>
        </draggable> -->
        <v-card>
          <h3>Assigned</h3>
        </v-card>
        <Container @drop="onDrop('items1', $event)"
          :get-child-payload="getChildPayload1"
          group-name="col">
          <Draggable v-for="item in items1"
            :key="item.id" class="pa-1">
            <div :class="item.class"
              class="draggable-item">
              {{item.data}}
            </div>
          </Draggable>
        </Container>

      </v-flex>
      
      <v-flex xs2
        text-xs-center
        px-3>
        <v-card>
          <h3>In progress</h3>
        </v-card>
        <Container @drop="onDrop('items2', $event)"
          :get-child-payload="getChildPayload2"
          group-name="col">
          <Draggable v-for="item in items2"
            :key="item.id" class="pa-1">
            <div :class="item.class"
              class="draggable-item">
              {{item.data}}
            </div>
          </Draggable>
        </Container>
      </v-flex>

      <v-flex xs2
        text-xs-center
        px-3>
        <v-card>
          <h3>Done</h3>
        </v-card>
        <Container @drop="onDrop('items3', $event)"
          :get-child-payload="getChildPayload3"
          group-name="col">
          <Draggable v-for="item in items3"
            :key="item.id" class="pa-1">
            <div :class="item.class"
              class="draggable-item">
              {{item.data}}
            </div>
          </Draggable>
        </Container>
      </v-flex>
    </v-layout>
    <v-layout row
      wrap
      justify-center>
      <v-flex xs3>
        <pre>
          {{ items1 }}
        </pre>
      </v-flex>
      <v-flex xs3>
        <pre>
          {{ items2 }}
        </pre>
      </v-flex>
      <v-flex xs3>
        <pre>
          {{ items3 }}
        </pre>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import draggable from "vuedraggable";
import UserList from "../components/UserList";
import { Container, Draggable } from "vue-smooth-dnd";

export default {
  components: {
    draggable,
    UserList,
    Container,
    Draggable
  },
  computed: {
    ...mapState(["userList"])
    /* myArray1: {
      get() {
        return this.$store.state.myArray1;
      },
      set(value) {}
    },
    myArray2: {
      get() {
        return this.$store.state.myArray2;
      },
      set(value) {}
    } */
  },
  methods: {
    ...mapActions(["fetchUserList"]),

    onDrop(collection, dropResult) {
      this[collection] = this.applyDrag(this[collection], dropResult);
    },

    getChildPayload1(index) {
      return this.items1[index];
    },

    getChildPayload2(index) {
      return this.items2[index];
    },

    getChildPayload3(index) {
      return this.items3[index];
    },

    applyDrag(arr, dragResult) {
      /* console.log(dragResult)
      console.log(arr) */
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;
      console.log(dragResult)
      console.log(arr[0].class)
      
      // itemToAdd.class = result[0].class

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        itemToAdd.class = result[0].class;
        result.splice(addedIndex, 0, itemToAdd);
      }

      return result;
    },

    generateItems(count, creator) {
      const result = [];
      for (let i = 0; i < count; i++) {
        result.push(creator(i));
      }
      return result;
    }
  },
  created() {
    this.fetchUserList();
  },
  data() {
    return {
      items1: this.generateItems(20, i => ({
        id: "0" + i,
        data: "Draggable0-" + i,
        class: "drag0"
      })),
      items2: this.generateItems(10, i => ({
        id: "1" + i,
        data: "Draggable1-" + i,
        class: "drag1"
      })),
      items3: this.generateItems(15, i => ({
        id: "2" + i,
        data: "Draggable2-" + i,
        class: "drag2"
      }))
    };
  }
};
</script>

<style scoped>
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

.wrap1 {
  margin-bottom: 10px;
}

.drag0 {
  background-color: lightsalmon;
}

.drag1 {
  background-color: lightblue;
}

.drag2 {
  background-color: lightgreen;
}
</style>

