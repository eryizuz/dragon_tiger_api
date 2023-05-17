import { DragonTigerEntity } from './dragonTiger.entity'
import { DragonTigerLimits } from './limits.entity'
import { UpdateDragonTigerEntity } from './updateDragonTiger.entity'

export interface DragonTigerRepository {
  createDragonTiger(dragonTiger: DragonTigerEntity): Promise<DragonTigerEntity>
  getDragonTigerByUuid(uuid: string): Promise<DragonTigerEntity | null>
  getAllDragonTigers(): Promise<DragonTigerEntity[] | []>
  updateDragonTiger(
    uuid: string,
    dataToUpdate: UpdateDragonTigerEntity,
  ): Promise<DragonTigerEntity | null>
  deleteDragonTiger(uuid: string): Promise<DragonTigerEntity | null>
  addOperatorToDragonTiger(uuid: string, operatorUuid: string): Promise<DragonTigerEntity | null>
  getDragonTigerByOperator(operatorUuid: string): Promise<DragonTigerEntity | null>
  updateOperatorInDragonTiger(uuid: string, operatorUuid: string): Promise<DragonTigerEntity | null>
  addCroupierToDragonTiger(uuid: string, croupierUuid: string): Promise<DragonTigerEntity | null>
  DragonTigersInTheClient(dragonTigers: string[]): Promise<DragonTigerEntity[] | []>
  DragonTigersAvailableOnTheClient(dragonTigers: string[]): Promise<DragonTigerEntity[] | []>
  changeDragonTigerLimits(
    uuid: string,
    limits: DragonTigerLimits,
  ): Promise<DragonTigerEntity | null>
}
