export interface BetFields {
  dragon: number
  tiger: number
  tie: number
  perfectTie: number
}

export interface BetEntity {
  transactionId: string
  player: string
  round: string
  dragonTiger: string
  currency: string
  totalAmount: number
  bet: BetFields
  uuid?: string
}
