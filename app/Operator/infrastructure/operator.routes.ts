import Route from '@ioc:Adonis/Core/Route'
import operatorController from './dependencies'

const OperatorRoutes = () => {
  Route.post('/create', operatorController.createOperator).middleware([
    'validateToken',
    'createOperator',
  ])
  Route.get('/all', operatorController.getAllOperators).middleware(['validateToken'])
  Route.put('/disable', operatorController.disableOperator).middleware(['validateToken'])
  Route.put('/enable', operatorController.enableOperator).middleware(['validateToken'])
  Route.get('/get-one/:uuid', operatorController.getOperatorByUuid).middleware(['validateToken'])
  Route.delete('/remove/:uuid', operatorController.deleteOperator).middleware(['validateToken'])
  Route.put('/update-urls/:uuid', operatorController.updateOperatorUrls).middleware([
    'validateToken',
  ])
  Route.put('/update/:uuid', operatorController.updateOperator).middleware(['validateToken'])
  Route.get('/client/:clientUuid', operatorController.getOperatorsByClient).middleware([
    'validateToken',
  ])
  Route.put('/assign-chip/:uuid', operatorController.assignChipsToOperator).middleware([
    'validateToken',
  ])
  Route.get('/chips/:uuid', operatorController.showOperatorChips).middleware(['validateToken'])
  Route.delete('/delete-chip/:uuid', operatorController.deleteChipInOperator).middleware([
    'validateToken',
  ])
}

export default OperatorRoutes
