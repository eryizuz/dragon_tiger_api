import Route from '@ioc:Adonis/Core/Route'
import { clientController } from './dependencies'

const ClientRoutes = () => {
  Route.post('/create', clientController.createClient).middleware(['validateToken', 'createClient'])
  Route.get('/get-one/:uuid', clientController.getClientByUuid).middleware(['validateToken'])
  Route.put('/disable', clientController.disableClient).middleware(['validateToken'])
  Route.put('/enable', clientController.enableClient).middleware(['validateToken'])
  Route.put('/add-game/:uuid', clientController.addGameToClient).middleware(['validateToken'])
  Route.get('/all-games/:uuid', clientController.getAllGamesInClient).middleware(['validateToken'])
  Route.get('/available-games/:uuid', clientController.getAvailableGamesInClient).middleware([
    'validateToken',
  ])
  Route.get('/game/:gameUuid', clientController.getClientsByGame).middleware(['validateToken'])
  Route.put('/add-currency/:uuid', clientController.addCurrencyToClient).middleware([
    'validateToken',
  ])
}

export default ClientRoutes
