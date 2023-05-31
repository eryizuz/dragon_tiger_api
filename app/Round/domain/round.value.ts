import { GenerateId } from '../../Shared/Helpers/generate-id.helpers'
import { DragonTigerResultType, DragonTigerWinners, RoundEntity } from './round.entity'

export class Round implements RoundEntity {
  public uuid: string
  public start_date: Date
  public end_date: Date
  public providerId: string
  public open: boolean
  public crupier: string
  public dragonTiger: string
  public result: DragonTigerResultType | null
  public winner: DragonTigerWinners | null

  constructor(Round: RoundEntity) {
    const { uuid } = new GenerateId()
    this.uuid = uuid
    this.start_date = Round.start_date
    this.end_date = Round.end_date
    this.providerId = Round.providerId
    this.open = Round.open
    this.crupier = Round.crupier
    this.result = Round.result
    this.winner = Round.winner
    this.dragonTiger = Round.dragonTiger
  }
}
