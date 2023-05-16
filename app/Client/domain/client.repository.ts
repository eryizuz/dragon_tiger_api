import { ClientEntity } from './client.entity'

export interface ClientRepository {
  createClient(client: ClientEntity): Promise<ClientEntity>
  getClientByUuid(uuid: string): Promise<ClientEntity | null>
  disableClient(uuid: string): Promise<ClientEntity | null>
  enableClient(uuid: string): Promise<ClientEntity | null>
  addGameToClient(uuid: string, gameUuid: string): Promise<ClientEntity | null>
  getAllGamesInClient(uuid: string): Promise<ClientEntity | null>
  getAvailableGamesInClient(uuid: string): Promise<ClientEntity | null>
  getClientsByGame(gameUuid: string): Promise<ClientEntity[] | []>
  addCurrencyToClient(uuid: string, currency: string): Promise<ClientEntity | null>
}
