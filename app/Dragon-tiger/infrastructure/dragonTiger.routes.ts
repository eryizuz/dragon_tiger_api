import Route from '@ioc:Adonis/Core/Route'
import { dragonTigerController } from './dependencies'

const DragonTigerRoutes = () => {
  Route.post('/create', dragonTigerController.createDragonTiger).middleware([
    'validateToken',
    'createDragonTiger',
  ])
  Route.get('/get-one/:uuid', dragonTigerController.getDragonTigerByUuid).middleware([
    'validateToken',
  ])
  Route.get('/all', dragonTigerController.getAllDragonTigers).middleware(['validateToken'])
  Route.put('/update/:uuid', dragonTigerController.updateDragonTiger).middleware(['validateToken'])
  Route.delete('/remove', dragonTigerController.deleteDragonTiger).middleware(['validateToken'])
  Route.put('/add-operator/:uuid', dragonTigerController.addOperatorToDragonTiger).middleware([
    'validateToken',
  ])
  Route.get('/operator/:operatorUuid', dragonTigerController.getDragonTigerByOperator).middleware([
    'validateToken',
  ])
  Route.put('/update-operator/:uuid', dragonTigerController.updateOperatorInDragonTiger).middleware(
    ['validateToken'],
  )
  Route.put('/add-croupier/:uuid', dragonTigerController.addCroupierToDragonTiger).middleware([
    'validateToken',
  ])
  Route.put('/change-limits/:uuid', dragonTigerController.changeDragonTigerLimit).middleware([
    'validateToken',
  ])
}

export default DragonTigerRoutes
