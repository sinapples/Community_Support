import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: "AIzaSyBWqQCMnT_OOmVp842sri3nwuO_8-r3BfM",
  authDomain: "community-support-9024a.firebaseapp.com",
  projectId: "community-support-9024a",
  storageBucket: "community-support-9024a.appspot.com",
  messagingSenderId: "570507957472",
  appId: "1:570507957472:web:f8c49151748713dcb52c85",
  measurementId: "G-N1VH3ERMD3"
}

firebase.initializeApp(config)
