import { DragonTigerEntity } from './dragonTiger.entity'

export interface UpdateDragonTigerEntity extends Pick<DragonTigerEntity, 'name' | 'providerId'> {}
