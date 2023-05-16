import { OperatorRepository } from '../domain/operator.repository'
import { OperatorEntity } from '../domain/operator.entity'
import { Operator } from '../domain/operator.value'
import { OperatorUrlEntity } from '../domain/operatorUrl.entity'
import { UpdateOperatorEntity } from '../domain/updateOperator.entity'

export class OperatorUseCases {
  constructor(private readonly operatorRepository: OperatorRepository) {}

  public createOperator = async (operator: OperatorEntity) => {
    const newOperator = new Operator(operator)
    const operatorCreated = await this.operatorRepository.createOperator(newOperator)

    return operatorCreated
  }

  public getAllOperators = async () => {
    const operators = await this.operatorRepository.getAllOperators()
    return operators
  }

  public disableOperator = async (uuid: string) => {
    const operator = await this.operatorRepository.disableOperator(uuid)
    return operator
  }

  public enableOperator = async (uuid: string) => {
    const operator = await this.operatorRepository.enableOperator(uuid)
    return operator
  }

  public getOperatorByUuid = async (uuid: string) => {
    const operator = await this.operatorRepository.getOperatorByUuid(uuid)
    return operator
  }

  public deleteOperator = async (uuid: string) => {
    const operator = await this.operatorRepository.deleteOperator(uuid)
    return operator
  }

  public updateOperatorUrls = async (uuid: string, operatorUrl: OperatorUrlEntity) => {
    const operator = await this.operatorRepository.updateOperatorUrls(uuid, operatorUrl)
    return operator
  }

  public updateOperator = async (uuid: string, dataToUpdate: UpdateOperatorEntity) => {
    const operator = await this.operatorRepository.updateOperator(uuid, dataToUpdate)
    return operator
  }

  public getOperatorsByClient = async (clientUuid: string) => {
    const operators = await this.operatorRepository.getOperatorsByClient(clientUuid)
    return operators
  }

  public assignChipsToOperator = async (uuid: string, chipUuid: string) => {
    const operator = await this.operatorRepository.assignChipsToOperator(uuid, chipUuid)
    return operator
  }

  public showOperatorChips = this.getOperatorByUuid

  public deleteChipInOperator = async (uuid: string, chipUuid: string) => {
    const operator = await this.operatorRepository.deleteChipInOperator(uuid, chipUuid)
    return operator
  }
}
