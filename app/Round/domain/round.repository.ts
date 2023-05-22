import { RoundEntity } from './round.entity'

export interface RoundRepository {
  startRound(round: RoundEntity): Promise<RoundEntity>
  getLastRoundByProviderId(dragonTigerId: string, providerId: string): Promise<RoundEntity | null>
  closeRound(uuid: string): Promise<RoundEntity | null>
}
