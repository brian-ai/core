const firebase = require('firebase');
const nlp = require('compromise');
const Voice = require('../speaker')
const query = require('cli-interact').getYesNo;

const  MEET_PHRASE = `Hello! Sorry, but I don't know you yet :3, What's your name?`;

module.exports = {
  getInstance: () => {
    const config = {
      apiKey: "AIzaSyCexFmvQpRptW5YSjUf8iJtsldMUHNDumg",
      authDomain: "sofia-3ed7b.firebaseapp.com",
      databaseURL: "https://sofia-3ed7b.firebaseio.com",
      projectId: "sophie-3ed7b",
      storageBucket: "",
      messagingSenderId: "542396136506"
    };

    return firebase.initializeApp(config).database();
  },
  rememberPerson:  (data, memory) => {
    let dictionary = {
      'camila': 'FemaleName',
      'caio': 'MaleName'
    };
    const sophieMemories = memory
      .getInstance()
      .ref('/dictionary');
    
    sophieMemories.on('value', function(memory) {
      dictionary = memory.val();
    });

    const analyzedPhrase = nlp(data, dictionary);
    const person = analyzedPhrase.people().data();
   
    try {
      Voice.speak(`Hi, ${person[0].firstName}! How are you today? My name is Sophie and I'm here to help.`);
    } catch(err) {
      console.log(err)
      setTimeout(() => {
        Voice.speak(`Hi, ${person[0].firstName}! How are you today? My name is Sophie and I'm here to help.`)
      }, 500)
    }
  },
  forget: (data, memoryType) => {}
}