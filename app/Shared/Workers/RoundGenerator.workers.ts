import axios from 'axios'
// import { randomNumber } from '../Helpers/randomNumber'
import { getRandomCard } from '../Helpers/dragon-tiger-utils'
import { GenerateId } from '../Helpers/generate-id.helpers'
const cron = require('node-cron')

// "*/10 * * * * *" symbols to cron function every 10 segs
// "*/1 * * * *" symbols to cron function every min

const roundGenerator = () => {
  cron.schedule('*/15 * * * * *', async () => {
    // cron.schedule("*/1 * * * *", () => {
    const { uuid } = new GenerateId()
    const roundId = uuid
    axios
      .put(`${process.env.BACK_URL as string}round/start`, {
        providerId: '101',
        roundId,
      })
      .then((res) => res)
      .catch((err) => console.log('err gen', err.response.data))

    setTimeout(() => {
      const card1 = getRandomCard()
      const card2 = getRandomCard()

      axios
        .put(`${process.env.BACK_URL as string}round/end`, {
          providerId: '101',
          roundId,
          result: {
            card1,
            card2,
          },
        })
        .then((res) => res)
        .catch((err) => console.log('err gen', err.response.data))
      // }, 45000);
    }, 13000)
  })
}
roundGenerator()
