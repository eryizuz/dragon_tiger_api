import { GenerateId } from '../../Shared/Helpers/generate-id.helpers'
import { DragonTigerEntity } from './dragonTiger.entity'

export class DragonTiger implements DragonTigerEntity {
  public active: boolean
  public manualDisable: boolean
  public maxBet: number
  public minBet: number
  public name: string
  public providerId: string
  public operator: string
  public status: boolean
  public uuid: string
  // game logic
  public chanceSimple: number
  public tie: number
  public perfectTie: number
  public goldenK: number
  public jackpot: number
  public nameOfDragon: string
  public nameOfTiger: string
  public roundDuration: number

  constructor(DragonTiger: DragonTigerEntity) {
    const { uuid } = new GenerateId()
    this.active = true
    this.manualDisable = false
    this.maxBet = DragonTiger.maxBet
    this.minBet = DragonTiger.minBet
    this.name = DragonTiger.name
    this.providerId = DragonTiger.providerId
    this.operator = DragonTiger.operator
    this.status = true
    this.uuid = uuid
    this.chanceSimple = DragonTiger.chanceSimple
    this.tie = DragonTiger.tie
    this.perfectTie = DragonTiger.perfectTie
    this.goldenK = DragonTiger.goldenK
    this.jackpot = DragonTiger.jackpot
    this.nameOfDragon = DragonTiger.nameOfDragon
    this.nameOfTiger = DragonTiger.nameOfTiger
    this.roundDuration = DragonTiger.roundDuration
  }
}
