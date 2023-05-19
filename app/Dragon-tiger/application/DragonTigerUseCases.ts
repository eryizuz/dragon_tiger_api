import { DragonTigerEntity } from '../domain/dragonTiger.entity'
import { DragonTigerRepository } from '../domain/dragonTiger.repository'
import { DragonTiger } from '../domain/dragonTiger.value'
import { DragonTigerLimits } from '../domain/limits.entity'
import { UpdateDragonTigerEntity } from '../domain/updateDragonTiger.entity'

export class DragonTigerUseCases {
  constructor(private readonly dragonTigerRepository: DragonTigerRepository) {}

  public createDragonTiger = async (dragonTiger: DragonTigerEntity) => {
    const newDragonTiger = new DragonTiger(dragonTiger)
    const dragonTigerCreated = this.dragonTigerRepository.createDragonTiger(newDragonTiger)
    return dragonTigerCreated
  }

  public getDragonTigerByUuid = async (uuid: string) => {
    const dragonTiger = await this.dragonTigerRepository.getDragonTigerByUuid(uuid)
    return dragonTiger
  }

  public getAllDragonTigers = async () => {
    const dragonTigers = await this.dragonTigerRepository.getAllDragonTigers()
    return dragonTigers
  }

  public updateDragonTiger = async (uuid: string, dataToUpdate: UpdateDragonTigerEntity) => {
    const dragonTiger = await this.dragonTigerRepository.updateDragonTiger(uuid, dataToUpdate)
    return dragonTiger
  }

  public deleteDragonTiger = async (uuid: string) => {
    const dragonTiger = await this.dragonTigerRepository.deleteDragonTiger(uuid)
    return dragonTiger
  }

  public addOperatorToDragonTiger = async (uuid: string, operatorUuid: string) => {
    const dragonTiger = await this.dragonTigerRepository.addOperatorToDragonTiger(
      uuid,
      operatorUuid,
    )
    return dragonTiger
  }

  public getDragonTigerByOperator = async (operatorUuid: string) => {
    const dragonTiger = await this.dragonTigerRepository.getDragonTigerByOperator(operatorUuid)
    return dragonTiger
  }

  public updateOperatorInDragonTiger = async (uuid: string, operatorUuid: string) => {
    const dragonTiger = await this.dragonTigerRepository.updateOperatorInDragonTiger(
      uuid,
      operatorUuid,
    )
    return dragonTiger
  }

  public addCroupierToDragonTiger = async (uuid: string, croupierUuid: string) => {
    const dragonTiger = await this.dragonTigerRepository.addCroupierToDragonTiger(
      uuid,
      croupierUuid,
    )
    return dragonTiger
  }

  public DragonTigersInTheClient = async (DragonTigers: string[]) => {
    const allDragonTigers = await this.dragonTigerRepository.dragonTigersInTheClient(DragonTigers)
    return allDragonTigers
  }

  public DragonTigersAvailableOnTheClient = async (DragonTigers: string[]) => {
    const allDragonTigers = await this.dragonTigerRepository.dragonTigersAvailableOnTheClient(
      DragonTigers,
    )
    return allDragonTigers
  }

  public changeDragonTigerLimits = async (uuid: string, limits: DragonTigerLimits) => {
    const dragonTiger = await this.dragonTigerRepository.changeDragonTigerLimits(uuid, limits)
    return dragonTiger
  }
}
