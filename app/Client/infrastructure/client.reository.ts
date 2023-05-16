import { ClientEntity } from '../domain/client.entity'
import { ClientRepository } from '../domain/client.repository'
import ClientModel from './client.model'

export class ClientMongoRepository implements ClientRepository {
  public createClient = async (client: ClientEntity): Promise<ClientEntity> => {
    const clientCreated = await ClientModel.create(client)
    return clientCreated
  }

  public getClientByUuid = async (uuid: string): Promise<ClientEntity | null> => {
    const client = await ClientModel.findOne({ uuid }).exec()
    if (!client) return null

    return client
  }

  public disableClient = async (uuid: string): Promise<ClientEntity | null> => {
    const client = await ClientModel.findOneAndUpdate(
      { uuid },
      { available: false },
      { new: true }
    ).exec()
    if (!client) return null

    return client
  }

  public enableClient = async (uuid: string): Promise<ClientEntity | null> => {
    const client = await ClientModel.findOneAndUpdate(
      { uuid },
      { available: true },
      { new: true }
    ).exec()
    if (!client) return null

    return client
  }

  public addGameToClient = async (uuid: string, gameUuid: string): Promise<ClientEntity | null> => {
    const client = await ClientModel.findOneAndUpdate(
      { uuid },
      { $push: { games: gameUuid } },
      { new: true }
    ).exec()
    if (!client) return null

    return client
  }

  public getAllGamesInClient = this.getClientByUuid

  public getAvailableGamesInClient = this.getClientByUuid

  public getClientsByGame = async (gameUuid: string): Promise<ClientEntity[] | []> => {
    const clients = await ClientModel.find({ games: gameUuid }).exec()
    return clients
  }

  public addCurrencyToClient = async (
    uuid: string,
    currency: string
  ): Promise<ClientEntity | null> => {
    const client = await ClientModel.findOneAndUpdate(
      { uuid },
      { $push: { currencies: currency } },
      { new: true }
    ).exec()
    if (!client) return null

    return client
  }
}
