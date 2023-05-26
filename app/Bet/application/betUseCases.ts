import { BetEntity } from '../domain/bet.entity'
import { BetRepository } from '../domain/bet.repository'
import { Bet } from '../domain/bet.values'

export class BetUseCases {
  constructor(private readonly betRepository: BetRepository) {}

  public createBet = async (bet: BetEntity) => {
    const newBet = new Bet(bet)
    const betCreated = this.betRepository.createBet(newBet)
    return betCreated
  }

  public getWinner = async (filter: any) => {
    const betWinner = await this.betRepository.getWinner(filter)

    return betWinner
  }
}
