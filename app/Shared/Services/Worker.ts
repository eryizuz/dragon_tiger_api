import { parentPort } from 'worker_threads'
import { connect } from 'mongoose'
import { betJackpotUpdater } from '../Helpers/dragon-tiger-utils'

const MONGO_URL = <string>process.env.MONGO_URI

const connectDatabase = async () => {
  await connect(MONGO_URL)
}

connectDatabase()
  .then(() => console.log('DB IS CONNECT'))
  .catch((error) => console.log(error))

parentPort?.on('message', async (data) => {
  const { cmd } = data

  switch (cmd) {
    case 'jackpot-update': {
      const { dragonTigerId, roundId } = data
      betJackpotUpdater(dragonTigerId, roundId)

      break
    }
  }
})
