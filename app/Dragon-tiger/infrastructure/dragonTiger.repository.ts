import { DragonTigerEntity } from '../domain/dragonTiger.entity'
import { DragonTigerRepository } from '../domain/dragonTiger.repository'
import { DragonTigerLimits } from '../domain/limits.entity'
import { UpdateDragonTigerEntity } from '../domain/updateDragonTiger.entity'
import DragonTigerModel from './dragonTiger.model'

export class DragonTigerMongoRepository implements DragonTigerRepository {
  public createDragonTiger = async (dragonTiger: DragonTigerEntity): Promise<DragonTigerEntity> => {
    const dragonTigerCreated = await DragonTigerModel.create(dragonTiger)
    return dragonTigerCreated
  }

  public getDragonTigerByUuid = async (uuid: string): Promise<DragonTigerEntity | null> => {
    const dragonTiger = await DragonTigerModel.findOne({ uuid }).exec()
    if (!dragonTiger) return null

    return dragonTiger
  }

  public getAllDragonTigers = async (): Promise<DragonTigerEntity[] | []> => {
    const dragonTigers = await DragonTigerModel.find({ status: true }).exec()
    return dragonTigers
  }

  public updateDragonTiger = async (
    uuid: string,
    dataToUpdate: UpdateDragonTigerEntity,
  ): Promise<DragonTigerEntity | null> => {
    const dragonTiger = await DragonTigerModel.findOneAndUpdate({ uuid }, dataToUpdate, {
      new: true,
    }).exec()
    if (!dragonTiger) return null

    return dragonTiger
  }

  public deleteDragonTiger = async (uuid: string): Promise<DragonTigerEntity | null> => {
    const dragonTiger = await DragonTigerModel.findOneAndUpdate(
      { uuid },
      { active: false, status: false },
      { new: true },
    ).exec()
    if (!dragonTiger) return null

    return dragonTiger
  }

  public addOperatorToDragonTiger = async (
    uuid: string,
    operatorUuid: string,
  ): Promise<DragonTigerEntity | null> => {
    const dragonTiger = await DragonTigerModel.findOneAndUpdate(
      { uuid },
      { operator: operatorUuid },
      { new: true },
    ).exec()
    if (!dragonTiger) return null

    return dragonTiger
  }

  public getDragonTigerByOperator = async (
    operatorUuid: string,
  ): Promise<DragonTigerEntity | null> => {
    const dragonTiger = await DragonTigerModel.findOne({ operator: operatorUuid }).exec()
    if (!dragonTiger) return null

    return dragonTiger
  }
  public getDragonTigerByProviderId = async (
    providerId: string,
  ): Promise<DragonTigerEntity | null> => {
    const dragonTiger = await DragonTigerModel.findOne({ providerId }).exec()
    if (!dragonTiger) return null

    return dragonTiger
  }

  public updateOperatorInDragonTiger = this.addOperatorToDragonTiger

  public addCroupierToDragonTiger = async (
    uuid: string,
    croupierUuid: string,
  ): Promise<DragonTigerEntity | null> => {
    const dragonTiger = await DragonTigerModel.findOneAndUpdate(
      { uuid },
      { croupier: croupierUuid },
      { new: true },
    ).exec()
    if (!dragonTiger) return null

    return dragonTiger
  }

  public dragonTigersInTheClient = async (
    dragonTigers: string[],
  ): Promise<DragonTigerEntity[] | []> => {
    const allDragonTigers = await DragonTigerModel.find({ uuid: { $in: dragonTigers } }).exec()
    return allDragonTigers
  }

  public dragonTigersAvailableOnTheClient = async (
    dragonTigers: string[],
  ): Promise<DragonTigerEntity[] | []> => {
    const allDragonTigers = await DragonTigerModel.find({
      uuid: { $in: dragonTigers },
      active: true,
    }).exec()
    return allDragonTigers
  }

  public changeDragonTigerLimits = async (
    uuid: string,
    limits: DragonTigerLimits,
  ): Promise<DragonTigerEntity | null> => {
    const dragonTiger = await DragonTigerModel.findOneAndUpdate({ uuid }, limits, {
      new: true,
    }).exec()
    if (!dragonTiger) return null
    return dragonTiger
  }
}
