import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDo4X1RFYA9pagh7YpDjDwoUrKbBoPBTNo",
  authDomain: "my-pgv-d62d3.firebaseapp.com",
  databaseURL: "https://my-pgv-d62d3.firebaseio.com",
  projectId: "my-pgv-d62d3",
  storageBucket: "my-pgv-d62d3.appspot.com",
  messagingSenderId: "477328762955",
  appId: "1:477328762955:web:4bf1e0dec1927b51"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const firestore = firebaseApp.firestore()
firestore.settings({timestampsInSnapshots:true})

export default firestore