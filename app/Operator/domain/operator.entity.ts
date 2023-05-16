export interface OperatorEntity {
  name: string
  client: string
  status?: boolean
  minBet: number
  operatorId: number
  maxBet: number
  endpointAuth: string
  endpointBet: string
  endpointWin: string
  endpointRollback: string
  casinoToken: string
  available?: boolean
  uuid?: string
  chips?: string[]
}
