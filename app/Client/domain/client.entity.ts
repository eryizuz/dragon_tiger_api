export interface ClientEntity {
  name: string
  endpointAuth: string
  endpointRollback: string
  endpointBet: string
  endpointWin: string
  logo?: string
  loaderLogo?: string
  uuid?: string
  status?: boolean
  available?: boolean
  useLogo?: boolean
  games?: string[]
  currencies?: string[]
}
