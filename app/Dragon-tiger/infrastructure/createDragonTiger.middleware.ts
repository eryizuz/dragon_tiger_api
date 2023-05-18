import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class CreateDragonTigerMiddleware {
  public handle = async ({ request, response }: HttpContextContract, next: () => Promise<void>) => {
    const createDragonTigerSchema = schema.create({
      name: schema.string(),
      maxBet: schema.number(),
      minBet: schema.number(),
      providerId: schema.string(),
      operator: schema.string(),
      nameOfDragon: schema.string(),
      nameOfTiger: schema.string(),
    })

    try {
      await request.validate({
        schema: createDragonTigerSchema,
      })

      await next()
    } catch (error) {
      response.status(400).json({ message: 'Debe completar todos los campos requeridos!', error })
    }
  }
}
