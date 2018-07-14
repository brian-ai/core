import { serializer } from '../knowledge/utils'

const processText = (neural, input) => neural.run(serializer.encode(input))

export {
  processText,
}