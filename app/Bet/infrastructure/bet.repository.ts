import { BetEntity } from '../domain/bet.entity'
import { BetRepository } from '../domain/bet.repository'
import betModel from './bet.model'

export class BetMongoRepository implements BetRepository {
  public createBet = async (bet: BetEntity): Promise<BetEntity> => {
    const betCreated = await betModel.create(bet)
    return betCreated
  }
  public getWinner = async (filter: any): Promise<BetEntity | null> => {
    const betWinner = await betModel.findOne({ ...filter })
    if (!betWinner) {
      return null
    }
    return betWinner
  }
}
