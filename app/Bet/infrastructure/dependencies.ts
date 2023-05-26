import { BetUseCases } from '../application/betUseCases'
import { BetController } from './bet.controller'
import { BetMongoRepository } from './bet.repository'

export const betMongoRepository = new BetMongoRepository()
export const betUseCases = new BetUseCases(betMongoRepository)
export const betController = new BetController(betUseCases)
