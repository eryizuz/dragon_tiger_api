import { betController } from './dependencies'
import Route from '@ioc:Adonis/Core/Route'

const BetRoutes = () => {
  Route.post('/create', betController.createBet)
  Route.get('/winner', betController.getWinner)
}

export default BetRoutes
