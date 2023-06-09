import {
  Card,
  corazonCartas,
  diamanteCartas,
  picaCartas,
  tigerDragonWinnersTypes,
  treblolCartas,
} from '../../Bet/domain/Card'
import { randomNumber } from './randomNumber'
import { DragonTigerWinners } from '../../Round/domain/round.entity'
import { DragonTigerEntity } from '../../Dragon-tiger/domain/dragonTiger.entity'
import { BetEntity } from '../../Bet/domain/bet.entity'
import betModel from '../../Bet/infrastructure/bet.model'
import RoundModel from '../../Round/infrastructure/round.model'
import { AxiosAdapter } from '../Adapters/axios.adapter'
import DragonTigerModel from '../../Dragon-tiger/infrastructure/dragonTiger.model'

export const getRandomCard = () => {
  const randomNum = randomNumber(1, 4)
  let randomCardTypes: Card[] = []
  switch (randomNum) {
    case 1: {
      randomCardTypes = treblolCartas
      break
    }
    case 2: {
      randomCardTypes = diamanteCartas
      break
    }
    case 3: {
      randomCardTypes = picaCartas
      break
    }
    case 4: {
      randomCardTypes = corazonCartas
      break
    }
  }
  return randomCardTypes[randomNumber(0, randomCardTypes.length - 1)]
}

export const getWinner = (card1: Card, card2: Card): string => {
  if (card1.value > card2.value) {
    return tigerDragonWinnersTypes.DRAGON
  }
  if (card1.value < card2.value) {
    return tigerDragonWinnersTypes.TIGER
  }

  if (card1.value === card2.value && card1.type !== card2.type) {
    return tigerDragonWinnersTypes.TIE
  }
  if (card1.value === card2.value && card1.type === card2.type) {
    return tigerDragonWinnersTypes.PERFECTTIE
  }
  return 'none'
}
export const useWinnerFilter = (roundWinner: DragonTigerWinners) => {
  const filter = {}
  switch (roundWinner) {
    case 'dragon': {
      Object.assign(filter, {
        'bet.dragon': {
          $gt: 0,
        },
      })
      break
    }
    case 'tiger': {
      Object.assign(filter, {
        'bet.tiger': {
          $gt: 0,
        },
      })
      break
    }
    case 'tie': {
      Object.assign(filter, {
        'bet.tie': {
          $gt: 0,
        },
      })
      break
    }
    case 'perfectTie': {
      Object.assign(filter, {
        'bet.perfectTie': {
          $gt: 0,
        },
      })
      break
    }
  }

  return filter
}

export const useGoldenK = (card1: Card, card2: Card): boolean => {
  const isGoldeK1 = card1.name === 'KGold'
  const isGoldeK2 = card2.name === 'KGold'

  return Boolean(isGoldeK1 || isGoldeK2)
}

export const getBetEarnings = (
  roundWinner: DragonTigerWinners,
  dragonTiger: DragonTigerEntity,
  bet: BetEntity,
  isGoldenK: boolean,
) => {
  const { chanceSimple, tie, perfectTie, goldenK } = dragonTiger
  const {
    bet: { dragon, tiger, perfectTie: perfectTieAmount, tie: tieAmount },
  } = bet
  const earning = {}
  switch (roundWinner) {
    case 'dragon': {
      let auxEarning = dragon * chanceSimple
      if (isGoldenK) auxEarning = dragon * goldenK
      Object.assign(earning, {
        amountOriginal: dragon,
        bet: 'dragon',
        earning: auxEarning,
      })
      break
    }
    case 'tiger': {
      let auxEarning = tiger * chanceSimple
      if (isGoldenK) auxEarning = tiger * goldenK
      Object.assign(earning, {
        amountOriginal: tiger,
        bet: 'tiger',
        earning: auxEarning,
      })
      break
    }
    case 'tie': {
      let auxEarning = tie * tieAmount
      if (isGoldenK) auxEarning = tie * goldenK
      Object.assign(earning, {
        amountOriginal: tieAmount,
        bet: 'tie',
        earning: auxEarning,
      })
      break
    }
    case 'perfectTie': {
      let auxEarning = perfectTieAmount * perfectTie
      if (isGoldenK) auxEarning = perfectTieAmount * goldenK
      Object.assign(earning, {
        amountOriginal: perfectTieAmount,
        bet: 'perfectTie',
        earning: auxEarning,
      })
      break
    }
  }
  return earning
}

export const betJackpotUpdater = async (dragonTigerId: string, roundId: string) => {
  const round = await RoundModel.findOne({ uuid: roundId })
  if (!round) {
    console.log('round no encontrado')
    return
  }
  const bets = await betModel.find({
    'dragonTiger': dragonTigerId,
    'bet.jackpot.rounds': {
      $lt: 7,
      $gte: 0,
    },
  })

  if (!bets.length) {
    console.log('no bets con jackpots validos')
    return
  }
  const { winner } = round
  const betTolose = bets.filter((bet) => bet.bet.jackpot.winner !== winner)
  const betToKeepWinning = bets.filter((bet) => bet.bet.jackpot.winner === winner)

  const betsLosersSaved = betTolose.map((b) => {
    return betModel.findOneAndUpdate(
      { uuid: b.uuid },
      {
        'bet.jackpot.rounds': -1,
      },
    )
  })

  const betsWinnersSaved = betToKeepWinning.map((b) => {
    return betModel.findOneAndUpdate(
      { uuid: b.uuid },
      {
        'bet.jackpot.rounds': b.bet.jackpot.rounds + 1,
      },
    )
  })

  try {
    const betsSaved = await Promise.all([...betsLosersSaved, ...betsWinnersSaved])
    console.log('betsSaved', betsSaved)
  } catch (err) {
    console.log('err', err)
  }
}

export const jackpotPayer = async (dragonTigerId: string, roundId: string) => {
  const round = await RoundModel.findOne({ uuid: roundId })
  if (!round) {
    console.log('round no encontrado')
    return
  }
  const bets = await betModel.find({
    'dragonTiger': dragonTigerId,
    'bet.jackpot.rounds': 7,
  })

  if (!bets.length) {
    console.log('no hay ganaderes de jackpot')
    return
  }

  await betModel.updateMany(
    {
      'dragonTiger': dragonTigerId,
      'bet.jackpot.rounds': 7,
    },
    { 'bet.jackpot.rounds': -1 },
  )
  console.log('jackpot winner sent')
  const dragonTiger = await DragonTigerModel.findOne({ uuid: dragonTigerId })
  const { jackpot } = dragonTiger as DragonTigerEntity

  const request = new AxiosAdapter(`${process.env.BACK_URL}bet/jackpot` as string)

  try {
    const response = await request.post({ bets, jackpot })

    return response
  } catch (error) {
    console.log('err sending winners to socket', error)
  }
}
