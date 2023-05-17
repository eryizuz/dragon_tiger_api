export interface DragonTigerEntity {
  name: string
  maxBet: number
  minBet: number
  providerId: string
  operator: string
  uuid?: string
  active?: boolean
  status?: boolean
  manualDisable?: boolean
  croupier?: string // croupiers uuid
  // !Note: Add game logic properties here
  chanceSimple: number
  tie: number
  perfectTie: number
  goldenK: number
  jackpot: number
  nameOfDragon: string
  nameOfTiger: string
  roundDuration: number
}
