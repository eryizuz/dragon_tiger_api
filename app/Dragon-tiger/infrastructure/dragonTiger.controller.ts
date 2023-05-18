import { HttpContext } from '@adonisjs/core/build/standalone'
import { CreateAuditoryParams } from '../../Shared/Interfaces/create-auditory.interface'
import CreateAuditory from 'App/Shared/Helpers/create-auditory'
import { operatorUseCases } from 'App/Operator/infrastructure/dependencies'
import { UpdateDragonTigerEntity } from '../domain/updateDragonTiger.entity'
import { DragonTigerLimits } from '../domain/limits.entity'
import { DragonTigerUseCases } from '../application/DragonTigerUseCases'
import { DragonTigerEntity } from '../domain/dragonTiger.entity'

export class DragonTigerController {
  constructor(private dragonTigerUseCases: DragonTigerUseCases) {}

  public createDragonTiger = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const {
      maxBet,
      minBet,
      name,
      providerId,
      operator,
      chanceSimple,
      goldenK,
      jackpot,
      nameOfDragon,
      nameOfTiger,
      perfectTie,
      roundDuration,
      tie,
      active,
      croupier,
      manualDisable,
      status,
      uuid,
    } = request.body()

    const dragonTiger: DragonTigerEntity = {
      maxBet,
      minBet,
      name,
      providerId,
      operator,
      chanceSimple,
      goldenK,
      jackpot,
      nameOfDragon,
      nameOfTiger,
      perfectTie,
      roundDuration,
      tie,
      active,
      croupier,
      manualDisable,
      status,
      uuid,
    }

    try {
      const operatorExist = await operatorUseCases.getOperatorByUuid(operator)
      if (!operatorExist)
        return response.status(404).json({ error: 'No se encuentra el operador!' })

      const dragonTigerCreated = await this.dragonTigerUseCases.createDragonTiger(dragonTiger)

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Crear dragon tiger!',
        ctx,
        resource: dragonTiger.name,
      }
      await CreateAuditory(auditoryParams)

      return response
        .status(201)
        .json({ message: 'dragon tiger creado!', dragonTiger: dragonTigerCreated })
    } catch (error) {
      return response.status(400).json({ message: 'No se pudo crear el dragon tiger!', error })
    }
  }

  public getDragonTigerByUuid = async ({ request, response }: HttpContext) => {
    const { uuid } = request.params()

    try {
      const dragonTiger = await this.dragonTigerUseCases.getDragonTigerByUuid(uuid)
      if (!dragonTiger)
        return response.status(404).json({ error: 'No se encuentra el dragon tiger!' })

      return response.status(200).json({ message: 'dragon tiger listado!', dragonTiger })
    } catch (error) {
      return response.status(400).json({ message: 'No se pudo realizar la búsqueda!', error })
    }
  }

  public getAllDragonTigers = async ({ response }: HttpContext) => {
    try {
      const dragonTigers = await this.dragonTigerUseCases.getAllDragonTigers()
      if (dragonTigers.length === 0)
        return response.status(404).json({ error: 'No existen dragon Tigers listados!' })

      return response.status(200).json({ message: 'dragon Tigers listados!', dragonTigers })
    } catch (error) {
      return response.status(400).json({ message: 'No se pudo realizar la consulta!', error })
    }
  }

  public updateDragonTiger = async (ctx: HttpContext) => {
    const { request, response } = ctx

    const { uuid } = request.params()
    const { name, providerId } = request.body()

    if (!name && !providerId)
      return response.status(401).json({ error: 'Debe enviar los campos requeridos!' })

    const dataToUpdate: UpdateDragonTigerEntity = {
      name,
      providerId,
    }

    try {
      const dragonTiger = await this.dragonTigerUseCases.updateDragonTiger(uuid, dataToUpdate)
      if (!dragonTiger)
        return response.status(404).json({ error: 'No se encuentra el dragon tiger!' })

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Actualizar dragon tiger!',
        ctx,
        resource: dragonTiger.name,
      }
      await CreateAuditory(auditoryParams)

      return response.status(200).json({ message: 'dragon tiger actualizado!', dragonTiger })
    } catch (error) {
      return response.status(400).json({ message: 'No se pudo actualizar el dragon tiger!', error })
    }
  }

  public deleteDragonTiger = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { uuid } = request.body()

    if (!uuid) return response.status(401).json({ error: 'Debe enviar el uuid del dragon tiger!' })

    try {
      const dragonTiger = await this.dragonTigerUseCases.deleteDragonTiger(uuid)
      if (!dragonTiger)
        return response.status(404).json({ error: 'No se encuentra el dragon tiger!' })

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Eliminar dragon tiger!',
        ctx,
        resource: dragonTiger.name,
      }
      await CreateAuditory(auditoryParams)

      return response.status(200).json({ message: 'dragon tiger eliminado!', dragonTiger })
    } catch (error) {
      return response.status(400).json({ message: 'No se pudo eliminar el dragon tiger!', error })
    }
  }

  public addOperatorToDragonTiger = async (ctx: HttpContext) => {
    const { request, response } = ctx

    const { uuid } = request.params()
    const { operatorUuid } = request.body()

    if (!operatorUuid)
      return response.status(401).json({ error: 'Debe enviar el id del operador!' })

    try {
      const operator = await operatorUseCases.getOperatorByUuid(operatorUuid)
      if (!operator) return response.status(404).json({ error: 'No se encuentra el operador!' })

      const operatorExistsInAnotherDragonTiger =
        await this.dragonTigerUseCases.getDragonTigerByOperator(operatorUuid)
      if (operatorExistsInAnotherDragonTiger)
        return response
          .status(400)
          .json({ error: 'El operador ya fue asignado a un dragon tiger!' })

      const dragonTiger = await this.dragonTigerUseCases.addOperatorToDragonTiger(
        uuid,
        operatorUuid,
      )
      if (!dragonTiger)
        return response.status(404).json({ error: 'No se encuentra el dragon tiger!' })

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Agregar operador al dragon tiger!',
        ctx,
        resource: dragonTiger.name,
      }
      await CreateAuditory(auditoryParams)

      return response
        .status(200)
        .json({ message: 'Operador agregado el dragon tiger!', dragonTiger })
    } catch (error) {
      return response.status(400).json({
        message: 'Ha ocurrido un error. No se pudo agregar el operador al dragon tiger!',
        error,
      })
    }
  }

  public getDragonTigerByOperator = async ({ request, response }: HttpContext) => {
    const { operatorUuid } = request.params()

    try {
      const operator = await operatorUseCases.getOperatorByUuid(operatorUuid)
      if (!operator) return response.status(404).json({ error: 'No se encuentra el operador!' })

      const dragonTiger = await this.dragonTigerUseCases.getDragonTigerByOperator(operatorUuid)
      if (!dragonTiger)
        return response
          .status(404)
          .json({ error: 'Este operador no tiene dragon Tigers asociados!' })

      return response.status(200).json({ message: 'dragon tiger listado!', dragonTiger })
    } catch (error) {
      return response.status(400).json({ message: 'No se pudo realizar la consulta!', error })
    }
  }

  public updateOperatorInDragonTiger = async (ctx: HttpContext) => {
    const { request, response } = ctx

    const { uuid } = request.params()
    const { operatorUuid } = request.body()

    if (!operatorUuid)
      return response.status(401).json({ error: 'Debe enviar el id del operador!' })

    try {
      const operator = await operatorUseCases.getOperatorByUuid(operatorUuid)
      if (!operator) return response.status(404).json({ error: 'No se encuentra el operador!' })

      const dragonTiger = await this.dragonTigerUseCases.updateOperatorInDragonTiger(
        uuid,
        operatorUuid,
      )
      if (!dragonTiger)
        return response.status(404).json({ error: 'No se encuentra el dragon tiger!' })

      const operatorExistsInAnotherDragonTiger =
        await this.dragonTigerUseCases.getDragonTigerByOperator(operatorUuid)
      if (operatorExistsInAnotherDragonTiger && operatorExistsInAnotherDragonTiger.uuid !== uuid) {
        await this.dragonTigerUseCases.addOperatorToDragonTiger(
          <string>operatorExistsInAnotherDragonTiger.uuid,
          '',
        )
      }

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Cambiando operador de dragon tiger!',
        ctx,
        resource: dragonTiger.name,
      }
      await CreateAuditory(auditoryParams)

      return response
        .status(200)
        .json({ message: 'Operador actualizado en el dragon tiger!', dragonTiger })
    } catch (error) {
      return response.status(400).json({
        message: 'Ha ocurrido un error. No se pudo actualizar el operador en el dragon tiger!',
        error,
      })
    }
  }

  public addCroupierToDragonTiger = async (ctx: HttpContext) => {
    const { request, response } = ctx

    const { uuid } = request.params()
    const { croupierUuid } = request.body()

    if (!croupierUuid)
      return response.status(401).json({ error: 'Debe enviar el id del croupier!' })

    try {
      // !Nota: Validar que el croupier exista una vez se cree el módulo del croupier.

      const dragonTiger = await this.dragonTigerUseCases.addCroupierToDragonTiger(
        uuid,
        croupierUuid,
      )
      if (!dragonTiger)
        return response.status(404).json({ error: 'No se encuentra el dragon tiger!' })

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Agregar croupier al dragon tiger!',
        ctx,
        resource: dragonTiger.name,
      }
      await CreateAuditory(auditoryParams)

      return response
        .status(200)
        .json({ message: 'Croupier agregado el dragon tiger!', dragonTiger })
    } catch (error) {
      return response.status(400).json({
        message: 'Ha ocurrido un error. No se pudo agregar el croupier al dragon tiger!',
        error,
      })
    }
  }

  public changeDragonTigerLimit = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { uuid } = request.params()
    const { minBet, maxBet } = request.body()
    const { uuid: operator } = ctx['user']

    if (!minBet && !maxBet)
      return response.status(400).json({ error: 'Debe enviar los límites que desea actualizar!' })

    const limits: DragonTigerLimits = {
      maxBet,
      minBet,
    }

    try {
      const dragonTigerExist = await this.dragonTigerUseCases.getDragonTigerByUuid(uuid)
      if (!dragonTigerExist)
        return response.status(404).json({ error: 'No se encuentra el dragon tiger!' })

      if (dragonTigerExist.operator !== operator)
        return response
          .status(401)
          .json({ error: 'El dragon tiger seleccionado no es de su propiedad!' })

      const dragonTiger = await this.dragonTigerUseCases.changeDragonTigerLimits(uuid, limits)

      // ? CREANDO LA AUDITORIA
      const auditoryParams: CreateAuditoryParams = {
        action: 'Cambio de límites del dragon tiger!',
        ctx,
        resource: dragonTiger?.name,
      }
      await CreateAuditory(auditoryParams)

      return response
        .status(200)
        .json({ message: 'Límites del dragon tiger actualizados!', dragonTiger })
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'No se pudieron actualizar los límites del dragon tiger!', error })
    }
  }
}
