import { OperatorUseCases } from '../application/OperatorUseCases'
import { OperatorController } from './operator.controller'
import { OperatorMongoRepository } from './operator.repository'

const operatorRepository = new OperatorMongoRepository()
export const operatorUseCases = new OperatorUseCases(operatorRepository)
const operatorController = new OperatorController(operatorUseCases)

export default operatorController
