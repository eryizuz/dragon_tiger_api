import { RoundEntity } from '../domain/round.entity'
import { RoundRepository } from '../domain/round.repository'
import { Round } from '../domain/round.value'
import { UpdateRoundEntity } from '../domain/updateRound.entity'

export class RoundUseCases {
  constructor(private readonly roundRepository: RoundRepository) {}

  public startRound = async (round: RoundEntity) => {
    const newRound = new Round(round)
    const startedRound = this.roundRepository.startRound(newRound)
    return startedRound
  }

  public getLastRoundByProviderId = async (dragonTigerId: string, providerId: string) => {
    const round = await this.roundRepository.getLastRoundByProviderId(dragonTigerId, providerId)
    return round
  }
  public closeRound = async (uuid: string, dataToUpdate: UpdateRoundEntity) => {
    const round = await this.roundRepository.closeRound(uuid, dataToUpdate)
    return round
  }
}
