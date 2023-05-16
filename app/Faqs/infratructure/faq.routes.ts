import Route from "@ioc:Adonis/Core/Route";
import faqController from "App/Faqs/infratructure/dependencies";



const faqRoutes = ()=>{

  Route.get('/all',faqController.getAllfaqs).middleware(['validateToken'])
  Route.get('/get-one/:uuid',faqController.getOneFaq).middleware(['validateToken'])
  Route.post('/create', faqController.createFaq).middleware(['validateToken','createFaq'])
  Route.put('/update/:uuid', faqController.updateFaq).middleware(['validateToken'])
  Route.delete('/remove/:uuid', faqController.deleteFaq).middleware(['validateToken'])
}

export default faqRoutes;
