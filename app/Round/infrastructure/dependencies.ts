import { RoundUseCases } from '../application/RoundUseCases'
import { RoundController } from './round.controller'
import { RoundMongoRepository } from './round.repository'

export const roundMongoRepository = new RoundMongoRepository()
export const roundUseCases = new RoundUseCases(roundMongoRepository)
export const roundController = new RoundController(roundUseCases)
