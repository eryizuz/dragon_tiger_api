import Route from '@ioc:Adonis/Core/Route'
import { roundController } from './dependencies'

const RoundRoutes = () => {
  Route.put('/start', roundController.startRound)
  Route.put('/end', roundController.closeRound)
}

export default RoundRoutes
