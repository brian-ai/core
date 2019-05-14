import { classifySubjects } from './text'
import Speak from '../../communication'

const greeting = [
	'Hi There!',
	'Hi muchacho!',
	'May the force be with you.',
	`What's up?!`
]

const greet = async () =>
	Speak(`
    <speak>
        <amazon:effect vocal-tract-length="+5%">
            <amazon:auto-breaths>
                ${greeting[Math.floor(Math.random() * greeting.length)]}
            </amazon:auto-breaths>
        </amazon:effect>
    </speak>
`)

const IDontKnowThat = ({ data }) => {
	Speak(`
    <speak>
        <amazon:effect vocal-tract-length="+5%">
            <amazon:auto-breaths>
                Sorry, But I don't know yet what means ${data}. Could you teach me?
            </amazon:auto-breaths>
        </amazon:effect>
    </speak>
`)
}

const analyseSentence = sentence => {
	const phrase = JSON.parse(sentence)
	const kind = classifySubjects(phrase.data)

	if (kind === 'greeting') return greet()

	return IDontKnowThat(phrase)
}

export { analyseSentence, IDontKnowThat, greet }
