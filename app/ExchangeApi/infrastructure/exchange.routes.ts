import Route from '@ioc:Adonis/Core/Route'
import { exchangeController } from './dependencies'

const ExchangeRoutes = () => {
  Route.post('/create', exchangeController.createExchange).middleware(['validateToken'])
  Route.get('/all', exchangeController.getAllExchanges).middleware(['validateToken'])
  Route.get('/:uuid', exchangeController.getExchangeByUuid).middleware(['validateToken'])
  Route.put('/disable/:uuid', exchangeController.disableExchange).middleware(['validateToken'])
  Route.put('/enable/:uuid', exchangeController.enableExchange).middleware(['validateToken'])
  Route.put('/update/:uuid', exchangeController.updateExchange).middleware(['validateToken'])
}

export default ExchangeRoutes
