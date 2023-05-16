import { OperatorEntity } from './operator.entity'
import { OperatorUrlEntity } from './operatorUrl.entity'
import { UpdateOperatorEntity } from './updateOperator.entity'

export interface OperatorRepository {
  createOperator(operator: OperatorEntity): Promise<OperatorEntity>
  getAllOperators(): Promise<OperatorEntity[] | []>
  disableOperator(uuid: string): Promise<OperatorEntity | null>
  enableOperator(uuid: string): Promise<OperatorEntity | null>
  getOperatorByUuid(uuid: string): Promise<OperatorEntity | null>
  deleteOperator(uuid: string): Promise<OperatorEntity | null>
  updateOperatorUrls(uuid: string, operatorUrls: OperatorUrlEntity): Promise<OperatorEntity | null>
  updateOperator(uuid: string, dataToUpdate: UpdateOperatorEntity): Promise<OperatorEntity | null>
  getOperatorsByClient(clientUuid: string): Promise<OperatorEntity[] | []>
  assignChipsToOperator(uuid: string, chipUuid: string): Promise<OperatorEntity | null>
  showOperatorChips(uuid: string): Promise<OperatorEntity | null>
  deleteChipInOperator(uuid: string, chipUuid: string): Promise<OperatorEntity | null>
}
