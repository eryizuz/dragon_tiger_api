import { Schema, model } from 'mongoose'
import { BetEntity } from '../domain/bet.entity'

const BetDragonTigerSchema = new Schema<BetEntity>(
  {
    transactionId: {
      type: String,
    },
    player: {
      type: String,
    },
    round: {
      type: String,
    },
    dragonTiger: {
      type: String,
    },
    currency: {
      type: String,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    bet: {
      dragon: {
        // the amount of the bet
        type: Number,
        default: 0,
      },
      tiger: {
        // the amount of the bet
        type: Number,
        default: 0,
      },
      tie: {
        // the amount of the bet
        type: Number,
        default: 0,
      },
      perfectTie: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true },
)

export default model('BetDragonTiger', BetDragonTigerSchema)
