import { RoundEntity } from '../domain/round.entity'
import { RoundRepository } from '../domain/round.repository'
import RoundModel from './round.model'

export class RoundMongoRepository implements RoundRepository {
  public startRound = async (round: RoundEntity): Promise<RoundEntity> => {
    const roundCreated = await RoundModel.create(round)
    return roundCreated
  }

  public getLastRoundByProviderId = async (
    dragonTigerId: string,
    providerId: string,
  ): Promise<RoundEntity | null> => {
    const round = await RoundModel.findOne({ dragonTiger: dragonTigerId, providerId })
      .sort({ createdAt: -1 })
      .exec()
    if (!round) return null

    return round
  }

  public closeRound = async (uuid: string): Promise<RoundEntity | null> => {
    const round = await RoundModel.findOneAndUpdate({ uuid }, { open: false }, { new: true })
      .sort({ createdAt: -1 })
      .exec()
    if (!round) return null

    return round
  }
}
