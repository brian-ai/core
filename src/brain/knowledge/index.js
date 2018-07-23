import { feelings } from './feelings'
import NaturalElements from './natural-sentences'
import firebase from 'firebase'

const baseKnowledge = [...feelings, ...NaturalElements]

const getFirebaseKnowledge = () => {
  const config = {
    apiKey: "AIzaSyCexFmvQpRptW5YSjUf8iJtsldMUHNDumg",
    authDomain: "sofia-3ed7b.firebaseapp.com",
    databaseURL: "https://sofia-3ed7b.firebaseio.com",
    projectId: "sophie-3ed7b",
    storageBucket: "",
    messagingSenderId: "542396136506"
  }

  return firebase
    .initializeApp(config)
    .database();
}

export {
  feelings,
  NaturalElements,
  getFirebaseKnowledge
}

export default baseKnowledge