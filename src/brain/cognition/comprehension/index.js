import Speak from '../../communication'

const IDontKnowThat = data => {
	Speak(`
    <speak>
        <amazon:effect vocal-tract-length="+5%">
            <amazon:auto-breaths>
                Sorry... But I don't know what: <break time="200ms" />${data} means.
                <break time="300ms" />
                Could you teach me?
            </amazon:auto-breaths>
        </amazon:effect>
    </speak>
`)
}

export default IDontKnowThat
