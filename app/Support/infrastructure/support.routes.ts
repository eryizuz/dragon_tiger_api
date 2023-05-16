import Route from '@ioc:Adonis/Core/Route'
import { supportController } from './dependencies'

const SupportRoutes = () => {
  Route.post('/create', supportController.createSupportTicket).middleware(['createSupportTicket'])
  Route.get('/one-ticket/:ticketUuid', supportController.getSupportTicketByUuid).middleware([
    'validateToken',
  ])
  Route.delete('/remove/:ticketUuid', supportController.deleteSupportTicket).middleware([
    'validateToken',
  ])
  Route.put('/update/:ticketUuid', supportController.updateSupportTicket)
  Route.post('/search', supportController.searchSupportTickets).middleware(['validateToken'])
  Route.put('/answer/:ticketUuid', supportController.answerTicket).middleware(['validateToken'])
}

export default SupportRoutes
