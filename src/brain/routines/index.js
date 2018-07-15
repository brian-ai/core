import { serializer } from '../utils'
import { feelings } from '../knowledge'
import Memory from '../memory'
// Initializing memory piece
const Shred = new Memory()

const loadBriansBrain =  (piece) => Shred.getMemories(piece)
const loadFeelings = (cortex) => cortex.train(serializer.processTrainingData(feelings))
// const makeAnAppointment = (description, context, timestamp) => memory.createEvent(description, timestamp)
const saveMasterInfo = (userData) => Shred.saveMasterInfo(userData)

const DeviceInteraction = (deviceKind, context, action) => {
  const device = Shred.getHeadQuartersConfig(deviceKind)
  
  return  congnition.interact(device, context)
    .then(deviceCallback => console.log(deviceCallback))
}

export {
  loadFeelings,
  // makeAnAppointment,
  saveMasterInfo,
  loadBriansBrain,
}