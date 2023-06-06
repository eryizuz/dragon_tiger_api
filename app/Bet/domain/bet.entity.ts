import { DragonTigerWinners } from '../../Round/domain/round.entity'

export interface JackpotBet {
  amount: number
  winner: DragonTigerWinners
  rounds: number
}

export interface BetFields {
  dragon: number
  tiger: number
  tie: number
  perfectTie: number
  jackpot: JackpotBet
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
