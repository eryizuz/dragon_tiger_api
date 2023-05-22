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
          default: 0,
        },
        type: {
          type: String,
          require: true,
        },
        name: {
          required: true,
          type: String,
        },
      },
      card2: {
        value: {
          type: Number,
          default: 0,
        },
        type: {
          type: String,
          require: true,
        },
        name: {
          required: true,
          type: String,
        },
      },
      default: null,
    },
    winner: {
      type: String,
      default: null,
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
  },
  { timestamps: true },
)

const RoundModel = model('round', RoundSchema)

export default RoundModel
