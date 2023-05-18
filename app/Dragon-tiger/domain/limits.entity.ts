import { DragonTigerEntity } from './dragonTiger.entity'

export interface DragonTigerLimits extends Pick<DragonTigerEntity, 'minBet' | 'maxBet'> {}
