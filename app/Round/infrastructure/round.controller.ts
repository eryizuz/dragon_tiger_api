import { HttpContext } from '@adonisjs/core/build/standalone'
import { RoundUseCases } from '../application/RoundUseCases'
import { dragonTigerUseCases } from 'App/Dragon-tiger/infrastructure/dependencies'
import { RoundEntity } from '../domain/round.entity'

export class RoundController {
  constructor(private roundUseCases: RoundUseCases) {}

  public startRound = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { providerId, roundId } = request.body()

    try {
      const dragonTiger = await dragonTigerUseCases.getDragonTigerByUuid(providerId)
      if (!dragonTiger)
        return response.status(404).json({ error: 'No se encuentra el dragon tiger!' })
      const secondsToAdd = dragonTiger.roundDuration
      const startDate = new Date()
      const futureDate = new Date(startDate.getTime() + secondsToAdd * 1000)

      const round: RoundEntity = {
        crupier: 'marilyn monroe',
        dragonTiger: dragonTiger.uuid as string,
        open: true,
        providerId: roundId,
        start_date: startDate,
        end_date: futureDate,
        result: null,
        winner: null,
      }
      const startRound = await this.roundUseCases.startRound(round)
      console.log('Round start', startRound)
      return response.status(201).json({ message: 'Round created', round: startRound })
    } catch (error) {
      return response.status(400).json({ message: 'No se pudo crear el round', error })
    }
  }

  public closeRound = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { providerId, roundId } = request.body()

    try {
      const dragonTiger = await dragonTigerUseCases.getDragonTigerByUuid(providerId)
      if (!dragonTiger) {
        return response.status(404).json({ error: 'No se encuentra el dragon tiger!' })
      }

      const lastRound = await this.roundUseCases.getLastRoundByProviderId(
        dragonTiger.uuid as string,
        roundId,
      )
      if (!lastRound) {
        return response.status(404).json({ error: 'No se encuentra el ultimo round!' })
      }
    } catch (err) {}
  }
}
