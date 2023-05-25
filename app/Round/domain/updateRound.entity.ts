import { RoundEntity } from './round.entity'

export interface UpdateRoundEntity
  extends Pick<RoundEntity, 'open' | 'winner' | 'end_date' | 'result'> {}
