import { GenerateId } from '../../Shared/Helpers/generate-id.helpers'
import { BetEntity, BetFields } from './bet.entity'

export class Bet implements BetEntity {
  public uuid: string
  public transactionId: string
  public bet: BetFields
  public currency: string
  public dragonTiger: string
  public player: string
  public round: string
  public totalAmount: number

  constructor(Bet: BetEntity) {
    const { uuid } = new GenerateId()
    this.uuid = uuid
    this.transactionId = Bet.transactionId
    this.bet = Bet.bet
    this.currency = Bet.currency
    this.dragonTiger = Bet.dragonTiger
    this.player = Bet.player
    this.round = Bet.round
    this.totalAmount = Bet.totalAmount
  }
}
