import Route from "@ioc:Adonis/Core/Route";
import questionController from "App/questions/infratructure/dependencies";



const questionRoutes = ()=>{

  Route.get('/all',questionController.getAllQuestion).middleware(['validateToken'])
  Route.get('/get-one/:userId',questionController.getOneQuestionByUser).middleware(['validateToken'])
  Route.post('/create', questionController.createQuestion).middleware(['validateToken','createQuestion'])
  Route.put('/update/:uuid', questionController.updateQuestion).middleware(['validateToken'])
  Route.delete('/remove/:uuid', questionController.deleteQuestion).middleware(['validateToken'])
}

export default questionRoutes;
