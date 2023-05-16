import Route from "@ioc:Adonis/Core/Route";
import croupierController from './dependencies';




const CroupierRoute = ()=>{

  Route.get('/all', croupierController.getAllCroupiers).middleware(['validateToken'])
  Route.post('/create', croupierController.createCroupier).middleware(['validateToken','createCroupier'])
  Route.put('/update/:uuid', croupierController.updateCroupier).middleware(['validateToken','createCroupier'])
  Route.delete('/remove/:uuid', croupierController.deleteCroupier).middleware(['validateToken'])
}

export default CroupierRoute;
