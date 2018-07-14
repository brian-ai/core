import { feelings } from './feelings'
import NaturalElements from './natual-sentences-classification'

const baseKnowledge = [...feelings, ...NaturalElements]

export {
  feelings,
  NaturalElements
}

export default baseKnowledge