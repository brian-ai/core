import { serializer } from "../../utils";

const extractFeeling = (sentence, cortex) => cortex.run(serializer.encode(sentence))

export {
  extractFeeling,
}