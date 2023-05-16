import { ClientUseCases } from '../application/ClientUseCases'
import { HttpContext } from '@adonisjs/core/build/standalone'
import { ClientEntity } from '../domain/client.entity'
import { CreateAuditoryParams } from '../../Shared/Interfaces/create-auditory.interface'
import CreateAuditory from 'App/Shared/Helpers/create-auditory'
import { gameUseCases } from '../../Game/infrastructure/dependencies'

export class ClientController {
  constructor(private clientUseCases: ClientUseCases) {}

  public createClient = async (ctx: HttpContext) => {
    const { request, response } = ctx

    const { endpointAuth, endpointBet, endpointRollback, endpointWin, name } = request.body()

    const client: ClientEntity = {
      endpointAuth,
      endpointBet,
      endpointRollback,
      endpointWin,
      name,
    }

    try {
      const clientCreated = await this.clientUseCases.createClient(client)

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Crear cliente!',
        ctx,
        resource: clientCreated.name,
      }
      await CreateAuditory(auditoryParams)

      return response.status(201).json({ message: 'Cliente creado!', client: clientCreated })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudo crear el cliente!' })
    }
  }

  public getClientByUuid = async ({ request, response }: HttpContext) => {
    const { uuid } = request.params()

    try {
      const client = await this.clientUseCases.getClientByUuid(uuid)
      if (!client) return response.status(404).json({ error: 'No se encuentra el cliente!' })

      return response.status(200).json({ message: 'Cliente listado!', client })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudo realizar la consulta!' })
    }
  }

  public disableClient = async ({ request, response }: HttpContext) => {
    const { uuid } = request.body()

    if (!uuid) return response.status(401).json({ error: 'Debe enviar el uuid del cliente!' })

    try {
      const client = await this.clientUseCases.disableClient(uuid)
      if (!client) return response.status(404).json({ error: 'No se encuentra el cliente!' })

      return response.status(200).json({ message: 'Cliente deshabilitado!', client })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudo realizar la consulta!' })
    }
  }

  public enableClient = async ({ request, response }: HttpContext) => {
    const { uuid } = request.body()

    if (!uuid) return response.status(401).json({ error: 'Debe enviar el uuid del cliente!' })

    try {
      const client = await this.clientUseCases.enableClient(uuid)
      if (!client) return response.status(404).json({ error: 'No se encuentra el cliente!' })

      return response.status(200).json({ message: 'Cliente habilitado!', client })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudo realizar la consulta!' })
    }
  }

  public addGameToClient = async (ctx: HttpContext) => {
    const { request, response } = ctx

    const { uuid } = request.params()
    const { gameUuid } = request.body()
    if (!gameUuid) return response.status(401).json({ error: 'Debe enviar el uuid del game!' })

    try {
      const game = await gameUseCases.getGameByUuid(gameUuid)
      if (!game) return response.status(404).json({ error: 'No se encuentra el juego!' })

      const clientExist = await this.clientUseCases.getClientByUuid(uuid)
      if (!clientExist) return response.status(404).json({ error: 'No se encuentra el cliente!' })

      if (clientExist.games?.includes(gameUuid))
        return response.status(400).json({ error: 'El juego ya fue agregado el cliente!' })

      const client = await this.clientUseCases.addGameToClient(uuid, gameUuid)

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Agregar juego al cliente!',
        ctx,
        resource: client?.name,
      }
      await CreateAuditory(auditoryParams)

      return response.status(200).json({ message: 'Juego agregado al cliente!', client })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudo agregar el juego al cliente!' })
    }
  }

  public getAllGamesInClient = async ({ request, response }: HttpContext) => {
    const { uuid } = request.params()

    try {
      const client = await this.clientUseCases.getAllGamesInClient(uuid)
      if (!client) return response.status(404).json({ error: 'No se encuentra el cliente!' })

      const { games } = client
      if (!games || games.length === 0)
        return response.status(404).json({ error: 'El cliente no tiene juegos agregados!' })

      const allGames = await gameUseCases.gamesInTheClient(games)
      if (!allGames)
        return response
          .status(404)
          .json({ error: 'No se encontraron los juegos asociados al cliente!' })

      return response.status(200).json({ message: 'Juegos listados!', games: allGames })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudo realizar la consulta!' })
    }
  }

  public getAvailableGamesInClient = async ({ request, response }: HttpContext) => {
    const { uuid } = request.params()

    try {
      const client = await this.clientUseCases.getAvailableGamesInClient(uuid)
      if (!client) return response.status(404).json({ error: 'No se encuentra el cliente!' })

      const { games } = client
      if (!games || games.length === 0)
        return response.status(404).json({ error: 'El cliente no tiene juegos agregados!' })

      const allGames = await gameUseCases.gamesAvailableOnTheClient(games)
      if (!allGames)
        return response
          .status(404)
          .json({ error: 'No se encontraron juegos disponibles en el cliente!' })

      return response.status(200).json({ message: 'Juegos listados!', games: allGames })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudo realizar la consulta!' })
    }
  }

  public getClientsByGame = async ({ request, response }) => {
    const { gameUuid } = request.params()

    try {
      const gameExist = await gameUseCases.getGameByUuid(gameUuid)
      if (!gameExist) return response.status(404).json({ error: 'No se encuentra el juego!' })

      const clients = await this.clientUseCases.getClientsByGame(gameUuid)
      if (clients.length === 0)
        return response.status(404).json({ error: 'No existen clientes asociados al juego!' })

      return response.status(200).json({ message: 'Clientes listados!', clients })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudo realizar la consulta!' })
    }
  }

  public addCurrencyToClient = async (ctx: HttpContext) => {
    const { request, response } = ctx

    const { uuid } = request.params()
    const { currency } = request.body()
    if (!currency) return response.status(401).json({ error: 'Debe enviar la moneda!' })

    try {
      const clientExist = await this.clientUseCases.getClientByUuid(uuid)
      if (!clientExist) return response.status(404).json({ error: 'No se encuentra el cliente!' })

      if (clientExist.currencies?.includes(currency))
        return response.status(400).json({ error: 'La moneda ya fue agregado el cliente!' })

      const client = await this.clientUseCases.addCurrencyToClient(uuid, currency)

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Agregar moneda al cliente!',
        ctx,
        resource: client?.name,
      }
      await CreateAuditory(auditoryParams)

      return response.status(200).json({ message: 'Nueva moneda agregada al cliente!', client })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudo agregar la moneda al cliente!' })
    }
  }
}
