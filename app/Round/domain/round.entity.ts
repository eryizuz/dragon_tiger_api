import { Card } from '../../Bet/domain/Card'

export interface DragonTigerResultType {
  card1: Card
  card2: Card
}
export type DragonTigerWinners = 'dragon' | 'tiger' | 'tie' | 'perfectTie'
export interface RoundEntity {
  start_date: Date
  end_date: Date
  providerId: string
  dragonTiger: string
  open: boolean
  crupier: string
  result: DragonTigerResultType | null
  winner: DragonTigerWinners | null
  uuid?: string
}
