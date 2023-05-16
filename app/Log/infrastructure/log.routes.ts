import Route from '@ioc:Adonis/Core/Route'
import { logController } from './dependencies'

const LogRoutes = () => {
  Route.post('/all', logController.getAllLogs).middleware('validateToken')
}

export default LogRoutes
