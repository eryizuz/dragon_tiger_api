import {
  Card,
  corazonCartas,
  diamanteCartas,
  picaCartas,
  tigerDragonWinnersTypes,
  treblolCartas,
} from 'App/Bet/domain/Card'
import { randomNumber } from './randomNumber'

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
