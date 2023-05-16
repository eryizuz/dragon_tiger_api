import { ChipUseCase } from '../application/ChipUseCase'
import { ChipController } from './chip.controller'
import { MongoChipRepository } from './chip.repository'

export const chipMongoRepository = new MongoChipRepository()
export const chipUseCase = new ChipUseCase(chipMongoRepository)
export const chipController = new ChipController(chipUseCase)
