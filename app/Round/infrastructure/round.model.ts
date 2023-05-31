import { model, Schema } from 'mongoose'
import { RoundEntity } from '../domain/round.entity'

const RoundSchema = new Schema<RoundEntity>(
  {
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    result: {
      card1: {
        value: {
          type: Number,
        },
        type: {
          type: String,
        },
        name: {
          type: String,
        },
      },
      card2: {
        value: {
          type: Number,
        },
        type: {
          type: String,
        },
        name: {
          type: String,
        },
      },
    },
    winner: {
      type: String,
    },
    providerId: {
      type: String,
    },
    dragonTiger: {
      type: String,
    },
    open: {
      type: Boolean,
      default: true,
    },
    crupier: {
      type: String,
    },
    uuid: {
      type: String,
    },
  },
  { timestamps: true },
)

const RoundModel = model('round', RoundSchema)

export default RoundModel
