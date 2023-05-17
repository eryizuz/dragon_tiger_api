import { Schema, model } from 'mongoose'
import { DragonTigerEntity } from '../domain/dragonTiger.entity'

const DragonTigerSchema = new Schema<DragonTigerEntity>(
  {
    active: {
      type: Boolean,
      default: true,
    },
    croupier: {
      type: String,
    },
    manualDisable: {
      type: Boolean,
      default: false,
    },
    maxBet: {
      type: Number,
      required: true,
    },
    minBet: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    operator: {
      type: String,
    },
    providerId: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    uuid: {
      type: String,
    },

    // !Note: Add game logic properties here.

    // Pagos
    chanceSimple: {
      type: Number,
      default: 2,
    },
    tie: {
      type: Number,
      default: 12,
    },
    perfectTie: {
      type: Number,
      default: 75,
    },
    goldenK: {
      type: Number,
      default: 4,
    },
    jackpot: {
      type: Number,
      default: 75,
    },
    roundDuration: {
      type: Number,
      default: 10,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const DragonTigerModel = model('dragonTiger', DragonTigerSchema)

export default DragonTigerModel
