import { DragonTigerEntity } from '../infrastructure/dragonTiger.model'

export interface DragonTigerLimits extends Pick<DragonTigerEntity, 'minBet' | 'maxBet'> {}
