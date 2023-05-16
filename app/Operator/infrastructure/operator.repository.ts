import { OperatorEntity } from '../domain/operator.entity'
import { OperatorRepository } from '../domain/operator.repository'
import { OperatorUrlEntity } from '../domain/operatorUrl.entity'
import { UpdateOperatorEntity } from '../domain/updateOperator.entity'
import OperatorModel from './operator.model'

export class OperatorMongoRepository implements OperatorRepository {
  public createOperator = async (operator: OperatorEntity): Promise<OperatorEntity> => {
    const operatorCreated = await OperatorModel.create(operator)
    return operatorCreated
  }

  public getAllOperators = async (): Promise<OperatorEntity[] | []> => {
    const operators = await OperatorModel.find().exec()
    return operators
  }

  public disableOperator = async (uuid: string): Promise<OperatorEntity | null> => {
    const operator = await OperatorModel.findOneAndUpdate(
      { uuid },
      { available: false },
      { new: true }
    ).exec()
    if (!operator) return null

    return operator
  }

  public enableOperator = async (uuid: string): Promise<OperatorEntity | null> => {
    const operator = await OperatorModel.findOneAndUpdate(
      { uuid },
      { available: true },
      { new: true }
    ).exec()
    if (!operator) return null

    return operator
  }

  public getOperatorByUuid = async (uuid: string): Promise<OperatorEntity | null> => {
    const operator = await OperatorModel.findOne({ uuid }).exec()
    if (!operator) return null

    return operator
  }

  public deleteOperator = async (uuid: string): Promise<OperatorEntity | null> => {
    const operator = await OperatorModel.findOneAndUpdate(
      { uuid },
      { status: false },
      { new: true }
    ).exec()
    if (!operator) return null

    return operator
  }

  public updateOperatorUrls = async (
    uuid: string,
    operatorUrls: OperatorUrlEntity
  ): Promise<OperatorEntity | null> => {
    const operator = await OperatorModel.findOneAndUpdate({ uuid }, operatorUrls, {
      new: true,
    }).exec()
    if (!operator) return null

    return operator
  }

  public updateOperator = async (
    uuid: string,
    dataToUpdate: UpdateOperatorEntity
  ): Promise<OperatorEntity | null> => {
    const operator = await OperatorModel.findOneAndUpdate({ uuid }, dataToUpdate, {
      new: true,
    }).exec()
    if (!operator) return null

    return operator
  }

  public getOperatorsByClient = async (clientUuid: string): Promise<OperatorEntity[] | []> => {
    const operators = await OperatorModel.find({ client: clientUuid }).exec()
    return operators
  }

  public assignChipsToOperator = async (
    uuid: string,
    chipUuid: string
  ): Promise<OperatorEntity | null> => {
    const operator = await OperatorModel.findOneAndUpdate(
      { uuid },
      { $push: { chips: chipUuid } },
      { new: true }
    ).exec()
    if (!operator) return null

    return operator
  }

  public showOperatorChips = this.getOperatorByUuid

  public deleteChipInOperator = async (
    uuid: string,
    chipUuid: string
  ): Promise<OperatorEntity | null> => {
    const operator = await OperatorModel.findOneAndUpdate(
      { uuid },
      { $pull: { chips: chipUuid } },
      { new: true }
    ).exec()
    if (!operator) return null

    return operator
  }
}
