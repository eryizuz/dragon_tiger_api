import { BetEntity } from './bet.entity'

export interface BetRepository {
  createBet(bet: BetEntity): Promise<BetEntity>
  getWinner(filter: any): Promise<BetEntity | null>
}
