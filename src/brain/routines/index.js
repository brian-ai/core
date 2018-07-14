import { serializer } from '../utils'
import { feelings } from '../knowledge'

const loadFeelings = (cortex) => cortex.train(serializer.processTrainingData(feelings))

export {
  loadFeelings,
}