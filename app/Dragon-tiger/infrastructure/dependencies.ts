import { DragonTigerUseCases } from '../application/DragonTigerUseCases'
import { DragonTigerController } from './dragonTiger.controller'
import { DragonTigerMongoRepository } from './dragonTiger.repository'

export const dragonTigerMongoRepository = new DragonTigerMongoRepository()
export const dragonTigerUseCases = new DragonTigerUseCases(dragonTigerMongoRepository)
export const dragonTigerController = new DragonTigerController(dragonTigerUseCases)
