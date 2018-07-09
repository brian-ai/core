import nlp from 'compromise'
import memory from './memory'
import { conversation } from './actions';

const initPoliteBrian = (context, person) => {
  const visitor = (person[0] || {}).firstName;
  
  if (Boolean(visitor)) {
    conversation.sayHi(visitor)
  } else {
    memory.rememberPerson(context, memory);

    conversation.talkAboutWeather();
  }
}

const init = (input) => {
  const phrase = input.toLowerCase();
  const person = nlp(phrase)
    .people()
    .data();

  return initPoliteBrian(input, person);
}

export { init }