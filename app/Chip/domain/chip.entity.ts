export interface ChipEntity {
  value: number
  color: ChipColor
  currency: string
  status?: boolean
  uuid?: string
}

export interface ChipColor {
  primary: string
  secondary: string
}
