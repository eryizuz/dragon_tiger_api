import Route from '@ioc:Adonis/Core/Route'
import userController from './dependencies'

const UserRoutes = () => {
  Route.post('/all', userController.getAllUsers)
  Route.get('/:uuid', userController.getUserById)
  Route.delete('/remove/:uuid', userController.deleteUser)
  Route.put('/update-password', userController.updatePassword).middleware('validateToken')
  Route.put('/update', userController.updateUser).middleware('validateToken')
  Route.post('/create', userController.createUser).middleware(['validateToken', 'createUser'])
  Route.get('/client/:clientUuid', userController.getUsersByClient).middleware(['validateToken'])
}

export default UserRoutes
