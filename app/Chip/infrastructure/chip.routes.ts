import Route from '@ioc:Adonis/Core/Route'
import { chipController } from './dependencies'

const ChipRoutes = () => {
  Route.post('/create', chipController.createChip).middleware(['validateToken', 'createChip'])
  Route.get('/all', chipController.getAllChips).middleware(['validateToken'])
}

export default ChipRoutes
