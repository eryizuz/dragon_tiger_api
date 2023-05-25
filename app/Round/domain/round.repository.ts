import { RoundEntity } from './round.entity'
import { UpdateRoundEntity } from './updateRound.entity'

export interface RoundRepository {
  startRound(round: RoundEntity): Promise<RoundEntity>
  getLastRoundByProviderId(dragonTigerId: string, providerId: string): Promise<RoundEntity | null>
  closeRound(uuid: string, dataToUpdate: UpdateRoundEntity): Promise<RoundEntity | null>
}
