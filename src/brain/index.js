import nlp from 'compromise'
import memory from './memory'
import { conversation } from './actions';

const initPoliteSophie = (conversation, person) => {
  const visitor = (person[0] || {}).firstName;
  
  if (Boolean(visitor)) {
    conversation.sayHi(visitor)
  } else {
    memory.rememberPerson(conversation, memory);
  } 
}

const init = (input) => {
  const phrase = input.toLowerCase();
  const person = nlp(phrase)
    .people()
    .data();

  return initPoliteSophie(input, person);
}

export { init }