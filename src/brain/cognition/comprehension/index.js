import Speak from '../../communication'

const IDontKnowThat = data => {
	Speak(`
        Sorry... But I don't know what: <break time="200ms" />${data} means.
        <break time="300ms" />
        Could you teach me?
    `)
}

export default IDontKnowThat
