import { OperatorEntity } from './operator.entity'
import { GenerateId } from '../../Shared/Helpers/generate-id.helpers'

export class Operator implements OperatorEntity {
  public available: boolean
  public casinoToken: string
  public client: string
  public endpointAuth: string
  public name: string
  public endpointBet: string
  public endpointRollback: string
  public endpointWin: string
  public maxBet: number
  public minBet: number
  public status: boolean
  public uuid: string
  public operatorId: number
  public chips: string[]

  constructor(operator: OperatorEntity) {
    const { uuid } = new GenerateId()
    this.status = true
    this.uuid = uuid
    this.available = true
    this.casinoToken = operator.casinoToken
    this.client = operator.client
    this.endpointAuth = operator.endpointAuth
    this.name = operator.name
    this.endpointBet = operator.endpointBet
    this.endpointRollback = operator.endpointRollback
    this.endpointWin = operator.endpointWin
    this.maxBet = operator.maxBet
    this.minBet = operator.minBet
    this.operatorId = operator.operatorId
    this.chips = []
  }
}
