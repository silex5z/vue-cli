import axios from 'axios'
import db from '../firebase'

export default {
  state: {
    movies: [],
    myHistory: [],
    pgvUser: null,
    pgvDate: '',
    pgvMovie: '',
    pgvMovieId: '',
    pgvTheatre: '',
    pgvMode: false,
    pgvSeatList: [],
    pgvSelectedSeats: [],
    dialog: false,
  },

  getters: {
    // 영화관 선택 후 예매 가능 날짜 목록
    availableDate(state) {
      return state.movies.reduce(function (acc, cur) {
        if (acc.indexOf(cur.date) < 0) {
          acc.push(cur.date)
        }
        return acc
      }, [])
    },

    // 영화 목록
    filteredByDate(state) {
      return state.movies.filter(el => {
        if (state.pgvMode) { // 영화관 -> 날짜 선택 후 가능 영화 목록
          return el.theatreId == state.pgvTheatre
        } else { // 날짜 -> 영화관 선택 후 가능 영화 목록
          return el.date == state.pgvDate
        }
      }).reduce(function (acc, cur) {
        if (acc.indexOf(cur.movieName) < 0) {
          acc.push(cur.movieName)
        }
        return acc
      }, [])
    },

    // 영화관 -> 날짜 -> 영화 선택 후 좌석 목록
    filteredByMovie(state) {
      return state.movies.filter(el => {
        if (state.pgvMode) { // 영화관 -> 날짜 선택 후 가능 영화 목록
          return el.theatreId == state.pgvTheatre
        } else { // 날짜 -> 영화관 선택 후 가능 영화 목록
          return el.date == state.pgvDate
        }
      }).filter(el => {
        return el.movieName == state.pgvMovie
      }).shift()
      // return state.movies.filter(el=>{
      //   return el.date == state.pgvDate
      // }).filter(el => {
      //   return el.movieName == state.pgvMovie
      // })
    },

    // 날짜 선택 후 예매 가능 영화관 목록
    availableTheatre(state) {
      return state.movies.reduce(function (acc, cur) {
        if (acc.indexOf(cur.theatreId) < 0) {
          acc.push(cur.theatreId)
        }
        return acc
      }, []).sort()
    }

  },

  mutations: {
    setMode(state, boolean) {
      state.pgvMode = boolean
    },
    setMovies(state, movies) {
      // console.log(movies)
      state.movies = movies
    },
    setDate(state, date) {
      state.pgvDate = date
    },
    setTheatre(state, theatreId) {
      state.pgvTheatre = theatreId
    },
    setMovieName(state, name) {
      state.pgvMovie = name
    },
    setMovieId(state, id) {
      state.pgvMovieId = id
    },
    setSeatList(state, seatList) {
      state.pgvSeatList = seatList
    },
    addSelectedSeat(state, { row, col }) {
      state.pgvSelectedSeats.push(row + '-' + col)
    },
    removeSeat(state, { row, col }) {
      state.pgvSelectedSeats.splice(state.pgvSelectedSeats.indexOf([row + '-' + col][0]), 1)
    },
    resetSelectedSeat(state){
      state.pgvSelectedSeats = []
    },
    /* setSeatBooked(state, { movieId, userSeats, userId }) {
      // console.log(movieId, userSeats)
      state.movies.forEach(function (val) {
        if (val.id == movieId) {
          // console.log(val)
          // console.log(val.seats)
          userSeats.map(function (seat) {
            // console.log(seat)

            var row = seat.split('-')[0];
            var col = seat[2];
            // console.log(row, col)
            val.seats[row][col] = userId
          })
        }
      })
    }, */
    fetchHistory(state, history) {
      state.myHistory = history;
    },
    closeDialog(state, bl){
      state.dialog = bl
    },
    setMyHistory(state, history){
      state.myHistory = history
    },
    setUser(state, user) {
      state.pgvUser = user
    }
  },

  actions: {
    getMovies({ commit }, { prop, val }) {
      console.log(prop, val)
      // console.log(typeof theatreId)
      /* axios.get(`http://localhost:3000/theatre/${theatreId}/movies`).then(res => 
        {
          // console.log()
          commit('setMovies', res.data)
        }
      ) */
      db.collection('pgv').where(prop, "==", val).get().then(querySnapshot => {
        let movies = querySnapshot.docs.map(doc => {
          // console.log(doc.id)
          // console.log(JSON.stringify(doc.data()))
          // var d = new Date()
          // d.setTime(doc.data().date.seconds * 1000)
          // console.log(d.toISOString())
          // return doc.data()
          // })
          let movieData = doc.data()
          movieData.id = doc.id

          let d = new Date()
          d.setTime(movieData.date.seconds * 1000)
          movieData.date = d.toISOString().split('T')[0]

          return movieData
        })
        // console.log(movies)
        commit('setMovies', movies)
      })
    },
    setSeatBooked({ commit }, { movieId, userSeats, userId }) {
      // console.log('in action')
      // console.log(movieId, userSeats, userId)
      commit('setSeatBooked', { movieId, userSeats, userId })
    },
    /* 예매내역 가져오기 */
    getHistory({ commit, state }) {
      db.collection('pgv').get().then(querySnapshot => {
        let tmpList = []
        querySnapshot.forEach(doc => {
          let temp = doc.data()
          temp.id = doc.id
          tmpList.push(temp)
        })
        
        let result = tmpList.reduce((acc, cur)=> {
          let uniq =[]
          Object.values(cur.seats[0]).map(val => {
            val.forEach(el => {
              // console.log(val)
              // console.log(state.pgvUser)
              if(el == state.pgvUser) {
                if(uniq.indexOf(cur.id) < 0){
                  uniq.push(cur.id)
                  acc.push(cur)
                }
              }
            })
          })
          return acc
        },[])

        
        commit('setMyHistory', result)
          /* Object.values(doc.data().seats[0]).reduce((acc, cur)=>{
            console.log(cur)
          }) */
      })
      .catch(err => console.log(err))
      /* axios.get(`http://localhost:3000/movies`).then(res => {
        var tmp = res.data.reduce(function (acc, cur) {
          cur.seats.forEach(function (val) {
            val.forEach(function (v) {
              if (v == UserId) {
                acc.push(cur)
              }
            })
          })
          return acc
        }, [])
        commit('fetchHistory', tmp)
      }) */

    },

    checkSeatAvailable({ commit, state }, { row, col }) {
      // console.log(row, col)
      return new Promise((resolve, reject) => {
        db.collection('pgv').doc(state.pgvMovieId).get().then(querySnapshot => {
          resolve(Object.values(querySnapshot.data().seats[0])[row][col] == false)
        }).catch(err => reject(err))
      })
    },

    getSeatList({ commit, state }) {
      db.collection('pgv').doc(state.pgvMovieId).get().then(querySnapshot => {
        commit('setSeatList', querySnapshot.data().seats[0])
      }).catch(err => console.log(err))
    },

    makeSeatReserved({ commit, state }, newList) {
      // console.log(newList)
      let newSeatList= [];
      newSeatList.push(newList)
      
      db.collection('pgv').doc(state.pgvMovieId).update({
        seats : newSeatList
      }).then(function () {
        console.log("Document successfully updated!");
        state.dialog = true;
        
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    },

    createDataForUpdate({ commit, dispatch, state }) {
      if(state.pgvSelectedSeats.length == 0) return false
      
      let newSeatList = JSON.parse(JSON.stringify(state.pgvSeatList))
      state.pgvSelectedSeats.forEach(function (val) {
        let arr = val.split('-')
        let row = arr[0]
        let col = arr[1]
        newSeatList[row][col] = state.pgvUser
      })
      // console.log(newSeatList)

      dispatch('makeSeatReserved', newSeatList)
    },

    createDataForDelete({dispatch, state}, payload) {
      // console.log(payload)
      let newSeatList = JSON.parse(JSON.stringify(payload.seats))
      // console.log(newSeatList)

      if(payload) {
        // console.log(payload.seats[0])
      let newList = Object.keys(payload.seats[0]).reduce((acc, cur)=>{
        
        /* payload.seats[0][cur].map(val=>{
          if(val == state.pgvUser) {
            val = ''
          }
          return val
        }) */
        
        acc[cur] = payload.seats[0][cur].map(val=>{
          if(val == state.pgvUser) {
            val = ''
          }
          return val
        })

        return acc
        
        /* return el.map(val=> {
          if(val == state.pgvUser) {
            val = ''
          }
          return val
        }) */

      },{})

      // console.log(newList)
        dispatch('makeSeatCanceled', {payload:newList, id:payload.id})
      }
    },

    makeSeatCanceled({commit, state, dispatch}, {payload, id}) {
      // console.log(payload)
      
      /*console.log(id) */
      let newSeatList= [];
      newSeatList.push(payload)
      console.log(newSeatList)
      
      db.collection('pgv').doc(id).update({
        seats : newSeatList
      }).then(function () {
        console.log("Document successfully updated!");
        dispatch('getHistory')
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });  
    }

  }
}