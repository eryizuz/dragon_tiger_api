import { OperatorUseCases } from '../application/OperatorUseCases'
import { HttpContext } from '@adonisjs/core/build/standalone'
import { OperatorEntity } from '../domain/operator.entity'
import { CreateAuditoryParams } from '../../Shared/Interfaces/create-auditory.interface'
import CreateAuditory from 'App/Shared/Helpers/create-auditory'
import { OperatorUrlEntity } from '../domain/operatorUrl.entity'
import { UpdateOperatorEntity } from '../domain/updateOperator.entity'
import { clientUseCases } from '../../Client/infrastructure/dependencies'
import { chipUseCase } from 'App/Chip/infrastructure/dependencies'
import { ChipEntity } from 'App/Chip/domain/chip.entity'

export class OperatorController {
  constructor(private operatorUseCases: OperatorUseCases) {}

  public createOperator = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const {
      casinoToken,
      client,
      endpointAuth,
      endpointBet,
      endpointRollback,
      endpointWin,
      maxBet,
      minBet,
      name,
    } = request.body()

    const operators = await this.operatorUseCases.getAllOperators()
    const operatorId = operators[operators.length - 1]
      ? operators[operators.length - 1].operatorId + 1
      : 1000

    const operator: OperatorEntity = {
      casinoToken,
      client,
      endpointAuth,
      endpointBet,
      endpointRollback,
      endpointWin,
      maxBet,
      minBet,
      name,
      operatorId,
    }

    try {
      const clientExist = await clientUseCases.getClientByUuid(client)
      if (!clientExist) return response.status(404).json({ error: 'No se encuentra el cliente!' })

      const operatorCreated = await this.operatorUseCases.createOperator(operator)

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Crear operador!',
        ctx,
        resource: operatorCreated.name,
      }
      await CreateAuditory(auditoryParams)

      return response.status(201).json({ message: 'Operador creado!', operator: operatorCreated })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudo crear el operador!' })
    }
  }

  public getAllOperators = async ({ response }: HttpContext) => {
    try {
      const operators = await this.operatorUseCases.getAllOperators()
      if (operators.length === 0)
        return response.status(404).json({ error: 'No existen operadores registrados' })

      return response.status(200).json({ message: 'Operadores listados!', operators })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudieron obtener los operadores!' })
    }
  }

  public disableOperator = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { uuid } = request.body()

    if (!uuid) return response.status(401).json({ error: 'Debe enviar el uuid del operador!' })

    try {
      const operator = await this.operatorUseCases.disableOperator(uuid)
      if (!operator) return response.status(404).json({ error: 'No se encuentra el operador!' })

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Deshabilitar operador!',
        ctx,
        resource: operator.name,
      }
      await CreateAuditory(auditoryParams)

      // !Nota: Una vez cree la sección de games, agregar aquí el método para deshabilitar los juegos correspondientes a este operador.

      return response.status(200).json({ message: 'Operador deshabilitado!', operator })
    } catch (error) {
      return response.status(400).json({ message: 'No se pudo deshabilitar el operador!', error })
    }
  }

  public enableOperator = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { uuid } = request.body()

    if (!uuid) return response.status(401).json({ error: 'Debe enviar el uuid del operador!' })

    try {
      const operator = await this.operatorUseCases.enableOperator(uuid)
      if (!operator) return response.status(404).json({ error: 'No se encuentra el operador!' })

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Habilitar operador!',
        ctx,
        resource: operator.name,
      }
      await CreateAuditory(auditoryParams)

      // !Nota: Una vez cree la sección de games, agregar aquí el método para habilitar los juegos correspondientes a este operador.

      return response.status(200).json({ message: 'Operador habilitado!', operator })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudo habilitar el operador!' })
    }
  }

  public getOperatorByUuid = async ({ request, response }: HttpContext) => {
    const { uuid } = request.params()

    try {
      const operator = await this.operatorUseCases.getOperatorByUuid(uuid)
      if (!operator) return response.status(404).json({ error: 'No se encuentra el operador!' })

      return response.status(200).json({ message: 'Operador listado!', operator })
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Ha ocurrido un error. No se pudo obtener el operador!' })
    }
  }

  public deleteOperator = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { uuid } = request.params()

    try {
      const operator = await this.operatorUseCases.deleteOperator(uuid)
      if (!operator) return response.status(404).json({ error: 'No se encuentra el operador!' })

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Eliminar operador!',
        ctx,
        resource: operator.name,
      }
      await CreateAuditory(auditoryParams)

      return response.status(200).json({ message: 'Operador eliminado!', operator })
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Ha ocurrido un error. No se pudo eliminar el operador!' })
    }
  }

  public updateOperatorUrls = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { uuid } = request.params()
    const { endpointAuth, endpointBet, endpointWin, endpointRollback } = request.body()

    if (!endpointAuth && !endpointBet && !endpointRollback && !endpointWin)
      return response.status(401).json({ error: 'Debe enviar las URLs de actualización!' })

    const operatorUrls: OperatorUrlEntity = {
      endpointAuth,
      endpointBet,
      endpointRollback,
      endpointWin,
    }

    try {
      const operator = await this.operatorUseCases.updateOperatorUrls(uuid, operatorUrls)
      if (!operator) return response.status(404).json({ error: 'No se encuentra el operador!' })

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Actualizar urls del operador!',
        ctx,
        resource: operator.name,
      }
      await CreateAuditory(auditoryParams)

      return response.status(200).json({ message: 'Urls del operador actualizadas!', operator })
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'No se pudieron actualizar las URLs del operador!', err: error })
    }
  }

  public updateOperator = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { uuid } = request.params()
    const { casinoToken, client, maxBet, minBet, name } = request.body()

    if (!casinoToken && !client && !maxBet && !minBet && !name)
      return response.status(401).json({ error: 'Debe enviar los datos de actualización!' })

    const dataToUpdate: UpdateOperatorEntity = {
      casinoToken,
      client,
      maxBet,
      minBet,
      name,
    }

    try {
      const operator = await this.operatorUseCases.updateOperator(uuid, dataToUpdate)
      if (!operator) return response.status(404).json({ error: 'No se encuentra el operador!' })

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Actualizar operador!',
        ctx,
        resource: operator.name,
      }
      await CreateAuditory(auditoryParams)

      return response.status(200).json({ message: 'Operador actualizado!', operator })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudo actualizar el operador!' })
    }
  }

  public getOperatorsByClient = async ({ request, response }: HttpContext) => {
    const { clientUuid } = request.params()

    try {
      const clientExist = await clientUseCases.getClientByUuid(clientUuid)
      if (!clientExist) return response.status(404).json({ error: 'No se encuentra el cliente!' })

      const operators = await this.operatorUseCases.getOperatorsByClient(clientUuid)
      if (operators.length === 0)
        return response.status(404).json({ error: 'No existen operadores asociados al cliente!' })

      return response.status(200).json({ message: 'Operadores listados!', operators })
    } catch (error) {
      return response.status(400).json({ error: 'No se pudieron obtener los operadores!' })
    }
  }

  public assignChipsToOperator = async ({ request, response }: HttpContext) => {
    const { uuid } = request.params()
    const { chipUuid } = request.body()

    if (!chipUuid) return response.status(400).json({ error: 'Debe enviar el UUID de la ficha!' })

    try {
      const operatorExist = await this.operatorUseCases.getOperatorByUuid(uuid)
      if (!operatorExist)
        return response.status(404).json({ error: 'No se encuentra el operador!' })

      const chipExist = await chipUseCase.getChipByUuid(chipUuid)
      if (!chipExist) return response.status(404).json({ error: 'No se encuentra la ficha!' })

      if (operatorExist.chips?.includes(chipUuid))
        return response.status(400).json({ error: 'Ya existe la ficha en el operador!' })

      const operator = await this.operatorUseCases.assignChipsToOperator(uuid, chipUuid)

      return response.status(200).json({ message: 'Ficha agregada al operador!', operator })
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'No se pudo agregar la ficha al operador!', error })
    }
  }

  public showOperatorChips = async ({ request, response }: HttpContext) => {
    const { uuid } = request.params()

    try {
      const operator = await this.operatorUseCases.showOperatorChips(uuid)
      if (!operator) return response.status(404).json({ error: 'No se encuentra el operador!' })

      const chipsUuidArray = operator.chips
      if (!chipsUuidArray || chipsUuidArray.length === 0)
        return response.status(404).json({ error: 'Este operador no tiene fichas asignadas!' })

      const chips: ChipEntity[] = await chipUseCase.getManyChips(chipsUuidArray)

      return response.status(200).json({ message: 'Fichas del operador listadas!', chips })
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'No se pudieron obtener las fichas del operador!', error })
    }
  }

  public deleteChipInOperator = async ({ request, response }: HttpContext) => {
    const { uuid } = request.params()
    const { chipUuid } = request.body()

    if (!chipUuid) return response.status(400).json({ error: 'Debe enviar el UUID de la ficha!' })

    try {
      const operatorExist = await this.operatorUseCases.getOperatorByUuid(uuid)
      if (!operatorExist)
        return response.status(404).json({ error: 'No se encuentra el operador!' })

      const chipExist = await chipUseCase.getChipByUuid(chipUuid)
      if (!chipExist) return response.status(404).json({ error: 'No se encuentra la ficha!' })

      if (!operatorExist.chips?.includes(chipUuid))
        return response
          .status(400)
          .json({ error: 'la ficha existe, pero no se encuentra asignada a este operador!' })

      const operator = await this.operatorUseCases.deleteChipInOperator(uuid, chipUuid)

      return response.status(200).json({ message: 'Ficha eliminada del operador!', operator })
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'No se pudo eliminar la ficha del operador!', error })
    }
  }
}
