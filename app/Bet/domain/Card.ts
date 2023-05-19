const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export interface Card {
  value: number
  type: string
  name: string
}

export const cardTypes = {
  TREBOL: 'trebol',
  DIAMANTE: 'diamante',
  PICA: 'pica',
  CORAZON: 'corazon',
}

export const tigerDragonWinnersTypes = {
  TIGER: 'tiger',
  DRAGON: 'dragon',
  TIE: 'tie',
  PERFECTTIE: 'perfectTie',
}

const specialCards = [
  { value: 1, name: 'A' },
  { value: 11, name: 'J' },
  { value: 12, name: 'Q' },
  { value: 13, name: 'K' },
]

export const treblolCartas: Card[] = numbers.map((n) => {
  const auxCard = {
    type: cardTypes.TREBOL,
    name: n.toString(),
    value: n,
  }
  const specialCard = specialCards.find((c) => c.value === n)
  if (specialCard) {
    Object.assign(auxCard, { ...specialCard })
  }
  return auxCard
})

export const diamanteCartas: Card[] = numbers.map((n) => {
  const auxCard = {
    type: cardTypes.DIAMANTE,
    name: n.toString(),
    value: n,
  }
  const specialCard = specialCards.find((c) => c.value === n)
  if (specialCard) {
    Object.assign(auxCard, { ...specialCard })
  }
  return auxCard
})

export const picaCartas: Card[] = numbers.map((n) => {
  const auxCard = {
    type: cardTypes.PICA,
    name: n.toString(),
    value: n,
  }
  const specialCard = specialCards.find((c) => c.value === n)
  if (specialCard) {
    Object.assign(auxCard, { ...specialCard })
  }
  return auxCard
})

export const corazonCartas: Card[] = numbers.map((n) => {
  const auxCard = {
    type: cardTypes.CORAZON,
    name: n.toString(),
    value: n,
  }
  const specialCard = specialCards.find((c) => c.value === n)
  if (specialCard) {
    Object.assign(auxCard, { ...specialCard })
  }
  return auxCard
})
