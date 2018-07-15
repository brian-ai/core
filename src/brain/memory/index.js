import { getFirebaseKnowledge } from '../knowledge'

class Memory {
  constructor(type) {
    this.type = type
  }

  saveMasterInfo(userData) {
    return console.log(this.type, userData)
  }

  searchKnowledge(piece = null) {
    const firebaseKnowledge = getFirebaseKnowledge()
    const data = firebaseKnowledge.ref(piece)
    
    return data.on('value', (snapshot) => console.log(snapshot.val()))
  }

  async getMemories(piece) {
    const creator = {
      name: 'Caio',
    }

    return this.searchKnowledge(piece)
  }
}

export default Memory
