<template>
  <v-container>
    <v-layout justify-center
      wrap
      v-show="bottomNav == 'buy'">
      <v-flex sm6
        ma-2
        mb-4>
        <v-card>
          <v-card-title>
            <v-chip>
              {{ userId }}
            </v-chip>
            <v-spacer></v-spacer>
            <v-btn color="purple"
              class="white--text"
              @click="logOut">로그아웃</v-btn>
          </v-card-title>

          <div class="px-4">
            <v-switch v-model="toggleSwitch"
              :label="toggleSwitch ? '날짜 기준 선택' : '영화관 기준 선택'"></v-switch>
          </div>

          <aside class="px-4 mb-3">
            <v-card dark
              class="pa-3">
              <div class="info__row">
                <b>영화관: </b>
                <v-chip v-show="theatre"
                  color="primary"
                  text-color="white">{{ theatre }}</v-chip>
              </div>
              <div class="info__row">
                <b>날짜: </b>
                <v-chip v-show="picker"
                  color="orange"
                  text-color="white">{{ picker }}</v-chip>
              </div>
              <div class="info__row">
                <b>영화제목: </b>
                <v-chip v-show="movie"
                  color="green"
                  text-color="white">{{ movie }}</v-chip>
              </div>
              <div class="info__row">
                <b>좌석: </b>
                <v-chip v-for="(seat, idx) in pgvSelectedSeats"
                  :key="idx"
                  v-show="seat"
                  color="red"
                  text-color="white">{{ seat }}</v-chip>
              </div>
              <div class="info__row">
                <b>예매가능좌석: {{ countAvailableSeats }} / {{ countTotalSeats }}</b>
              </div>
            </v-card>
          </aside>

          <v-expansion-panel focusable
            v-model="panel">
            <!-- <v-layout column transition="fade-transition"> -->
            <transition-group name="slide"
              tag="div"
              class="layout column wrap">
              <v-flex :order-sm2="toggleSwitch"
                :order-sm1="!toggleSwitch"
                :key="'a'">

                <v-spacer></v-spacer>
                <v-expansion-panel-content>
                  <template v-slot:header>
                    <div>Theatre</div>
                  </template>
                  <v-combobox v-model="theatre"
                    :items="toggleSwitch ? availableTheatre : itemsT"
                    chips
                    label="Select a Theater"
                    class="px-4"></v-combobox>

                  <v-btn color="purple"
                    class="white--text mx-auto d-block"
                    @click="onClickNext">다음</v-btn>
                </v-expansion-panel-content>
              </v-flex>

              <v-flex :order-sm1="toggleSwitch"
                :order-sm2="!toggleSwitch"
                :key="'b'">

                <v-spacer></v-spacer>
                <v-expansion-panel-content>
                  <template v-slot:header>
                    <div>Date</div>
                  </template>
                  <div class="text-xs-center">
                    <v-date-picker v-model="picker"
                      :allowed-dates="allowedDates">
                    </v-date-picker>
                  </div>
                  <v-btn color="purple"
                    class="white--text mx-auto d-block"
                    @click="onClickNext">다음</v-btn>
                </v-expansion-panel-content>

              </v-flex>

            </transition-group>
            <!-- </v-layout> -->
            <v-expansion-panel-content>
              <template v-slot:header>
                <div>Movie</div>
              </template>
              <v-combobox v-model="movie"
                :items="filteredByDate"
                chips
                label="Select a Movie"
                class="px-4"></v-combobox>
              <v-btn color="purple"
                class="white--text mx-auto d-block"
                @click="onClickNext">다음</v-btn>
            </v-expansion-panel-content>

            <v-expansion-panel-content>
              <template v-slot:header>
                <div>Seats</div>
              </template>
              <div>

                <v-alert :value="warning"
                  type="warning"
                  transition="slide-y-transition">
                  이미 다른 사용자가 선택한 좌석입니다.
                </v-alert>

                <v-layout column
                  wrap
                  align-content-center>
                  <!-- <v-flex v-for="(seat, idx) in filteredByMovie['seats'][0]"
                      :key="idx"> -->
                  <v-flex v-for="(seat, idx) in pgvSeatList"
                    :key="idx"
                    class="d-flex">
                    <v-checkbox v-for="(item, i) in seat"
                      :key="idx + '-' +i"
                      :disabled="item ? true : false"
                      :input-value="item"
                      :label="idx + '-' +i"
                      class="d-inline-flex mr-1"
                      @change="onChange($event, {idx, i})">
                    </v-checkbox>
                  </v-flex>
                </v-layout>
              </div>
              <v-btn color="purple"
                class="white--text mx-auto d-block"
                @click="onClickNext">다음</v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-card-text class="text-xs-center mb-4">
            <v-btn color="primary"
              @click="createDataForUpdate">예매하기</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
    <v-layout justify-center
      wrap
      v-show="bottomNav == 'my'">
      <v-flex sm6
        ma-2>
        <v-card>
          <v-card-title>
            My Ticket
          </v-card-title>

          <v-container>
            <v-layout row
              wrap
              justify-space-between>
              <v-flex v-for="(item, idx) in myHistory"
                :key="idx"
                sm5
                ma-2>
                <v-card dark>
                  <v-card-title class="light-blue darken-2">
                    <span>내역 {{ idx }}</span>
                    <v-spacer></v-spacer>
                    <v-btn fab
                      icon
                      small
                      @click="createDataForDelete(item)">
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-card-text>
                    <div>
                      <b>영화관: <v-chip color="primary"
                          text-color="white">{{ item.theatreId }}</v-chip></b>
                    </div>
                    <div>
                      <b>날짜: <v-chip color="orange"
                          text-color="white">{{ item.dateId }}</v-chip></b>
                    </div>
                    <div>
                      <b>영화제목: <v-chip color="green"
                          text-color="white">{{ item.movieName }}</v-chip></b>
                    </div>

                  </v-card-text>
                </v-card>

              </v-flex>
              <v-flex v-if='myHistory == ""'>
                <p>예매내역이 없습니다.</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

        <v-layout row
          justify-center>
          <v-dialog v-model="dialog"
            persistent
            max-width="290">
            <v-card>
              <v-card-title class="headline">예매완료</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1"
                  flat
                  @click="closeDialog">확인</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-bottom-nav :active.sync="bottomNav"
      :value="true"
      fixed
      color="">
      <v-btn color="teal"
        flat
        value="buy">
        <span>Buy Ticket</span>
        <v-icon>theaters</v-icon>
      </v-btn>

      <v-btn color="teal"
        flat
        value="my">
        <span>My Ticket</span>
        <v-icon>note</v-icon>
      </v-btn>
    </v-bottom-nav>

  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import firebase from "firebase";
// import * as Types from "../mutation-types";

export default {
  data: function() {
    return {
      picker: "",
      theatre: "",
      itemsT: ["theatreA", "theatreB", "theatreC"],
      movie: "",
      itemsM: [],
      userId: "",
      toggleSwitch: false,
      bottomNav: "buy",
      movieId: "",
      warning: false,
      panel: 0
    };
  },

  computed: {
    ...mapState({
      movies: state => state.pgv.movies,
      myHistory: state => state.pgv.myHistory,
      pgvSeatList: state => state.pgv.pgvSeatList,
      pgvSelectedSeats: state => state.pgv.pgvSelectedSeats,
      dialog: state => state.pgv.dialog
    }),

    ...mapGetters([
      "availableDate",
      "filteredByDate",
      "filteredByMovie",
      "availableTheatre"
    ]),

    countAvailableSeats() {
     if (this.pgvSeatList) {
        return Object.values(this.pgvSeatList).reduce(function(acc, cur) {
          cur.map(function(val) {
            val == false ? acc++ : acc;
          });
          return acc;
        }, 0);
        /* this.pgvSeatList.reduce(function(acc, cur) {
          cur.map(function(val) {
            val == 0 ? acc++ : acc;
          });
          return acc;
        }, 0) */
      } else {
        return []
      }
    },

    countTotalSeats() {
      return this.pgvSeatList["a"] ? this.pgvSeatList["a"].length * 4 : 0;
    }
  },

  created: function() {
    // this.$store.dispatch('testFirebase')
    // this.picker = this.getToday();
    // this.addFirebase();
    // this.getMovies("theatreA")
    // this.$store.dispatch('testFirebaseUpdate')
    if (firebase.auth().currentUser) {
      this.userId = firebase.auth().currentUser.email;
      this.$store.commit("SET_USER", this.userId);
    }
  },

  methods: {
    ...mapActions([
      "getMovies",
      "setSeatBooked",
      "getHistory",
      "addFirebase",
      "checkSeatAvailable",
      "createDataForUpdate",
      "createDataForDelete"
    ]),
    initForm() {
      (this.picker = ""),
        (this.theatre = ""),
        (this.movie = ""),
        (this.movieId = "");
      this.$store.commit("RESET_SELECTED_SEAT");
    },
    allowedDates(val) {
      // var d = new Date().toISOString().split('T')[0]
      // console.log(d)
      // return val >= d
      // console.log(this.availableDate.indexOf(val))
      if (this.toggleSwitch) {
        var d = new Date().toISOString().split("T")[0];
        return val >= d;
      } else {
        return this.availableDate.indexOf(val) >= 0;
      }
    },
    getToday() {
      return new Date().toISOString().split("T")[0];
    },
    setMovieList(date) {
      // console.log(date)
      this.itemsM = [];
      // console.log(this.movies)
      this.movies.forEach(el => {
        if (el.date == date) {
          this.itemsM.push(el.movieName);
        }
      });
    },
    setSeatList(movie, date) {
      // console.log(movie, date)
      this.seats = [];
      var temp = this.movies
        .filter(function(el) {
          return el.date == date;
        })
        .filter(function(el) {
          return el.movieName == movie;
        })
        .shift();
      // temp.seats[0].forEach(function(val){
      //   console.log(val)
      // })

      // this.seats = temp.seats[0];
      this.seats = Object.values(temp.seats[0]);
      this.movieId = temp.id;
    },
    onChange(event, { idx, i }) {
      // console.log(event)
      if (event) {
        const index = {
          a: 0,
          b: 1,
          c: 2,
          d: 3
        };

        this.checkSeatAvailable({ row: index[idx], col: i })
          .then(res => {
            // console.log(res)
            if (res == false) {
              this.warning = true;
              console.log("다른사용자가 이미 선택한 좌석입니다.");
              setTimeout(() => {
                this.warning = false;
              }, 3000);
              if (this.toggleSwitch) {
                /* this.getMovies({ prop: "dateId", val: this.picker }); */
                this.$store.dispatch("getSeatList");
                console.log("a");
              } else {
                this.$store.dispatch("getSeatList");
                /* this.getMovies({ prop: "theatreId", val: this.theatre }); */
                console.log("b");
              }
            } else {
              // this.warning = false;
              console.log("예매 가능");
              this.$store.commit("ADD_SELECTED_SEAT", { row: idx, col: i });
            }
          })
          .catch(err => console.log(err));

        // this.userSeats.push(idx + "-" + i)
      } else {
        this.$store.commit("REMOVE_SEAT", { row: idx, col: i });
        // this.userSeats.splice(this.userSeats.indexOf([idx + "-" + i][0]), 1)
      }
    },

    closeDialog() {
      this.$store.commit("CLOSE_DIALOG", false);
      this.bottomNav = "my";
    },

    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    },

    removeHistory(item) {
      console.log(item);
    },

    onClickNext() {
      
      this.panel++
    }
  },

  watch: {
    toggleSwitch: function(boolean) {
      // console.log(boolean);
      this.$store.commit("SET_MODE", boolean);
      this.initForm();
    },
    theatre: function(theatreId) {
      // console.log(val)
      if (this.toggleSwitch == false) {
        this.getMovies({ prop: "theatreId", val: theatreId });
      } else {
        this.$store.commit("SET_THEATRE", theatreId);
      }
      // console.log(this.itemsT.indexOf(this.theatre) + 1)
      // console.log(this.availableDate)
    },
    picker: function(val) {
      // console.log(val)
      if (this.toggleSwitch == false) {
        this.movie = "";
        this.userSeats = [];
        // this.setMovieList(val);
        this.$store.commit("SET_DATE", val);
        // console.log(this.filteredByDate)
      } else {
        this.getMovies({ prop: "dateId", val });
      }
    },
    movie: function(val) {
      if (val) {
        console.log(val);
        this.userSeats = [];
        // this.setSeatList(this.movie, this.picker);
        this.$store.commit("SET_MOVIE_NAME", val);

        // console.log(this.filteredByMovie)

        this.$store.commit("SET_MOVIE_ID", this.filteredByMovie.id);

        this.$store.dispatch("getSeatList");
        // console.log(this.filteredByMovie['seats'][0])
      }
    },
    bottomNav: function(val) {
      if (val === "my") {
        this.getHistory();
      } else {
        this.initForm();
      }
    }
  }
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  /* transition: all 2.5s ease-out; */
}

.slide-enter,
.slide-leave-to {
  /* opacity: 0; */
}

.slide-move {
  transition: all 0.5s ease;
}

.info__row {
  height: 40px;
}

.info__row > b {
  padding-top: 9px;
  display: inline-block;
}
</style>
