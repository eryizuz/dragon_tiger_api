import Route from '@ioc:Adonis/Core/Route'
import { roleController } from './dependencies'

const RolRoutes = () => {
  Route.post('/create', roleController.createRole).middleware(['validateToken'])
  Route.get('/all', roleController.getAllRoles).middleware(['validateToken'])
  Route.delete('/delete/:uuid', roleController.deleteRole).middleware(['validateToken'])
}

export default RolRoutes
