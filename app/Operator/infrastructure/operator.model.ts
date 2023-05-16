import { model, Schema } from 'mongoose'

const OperatorSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    client: {
      type: String,
      ref: 'Client',
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    minBet: {
      type: Number,
      required: true,
    },
    maxBet: {
      type: Number,
      required: true,
    },
    endpointAuth: {
      type: String,
      required: true,
    },
    endpointBet: {
      type: String,
      required: true,
    },
    endpointWin: {
      type: String,
      required: true,
    },
    endpointRollback: {
      type: String,
      required: true,
    },
    casinoToken: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    operatorId: {
      type: Number,
      required: true,
    },
    chips: [],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const OperatorModel = model('operators', OperatorSchema)
export default OperatorModel
