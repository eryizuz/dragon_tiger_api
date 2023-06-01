import { HttpContext } from '@adonisjs/core/build/standalone'
import { RoundUseCases } from '../application/RoundUseCases'
import { dragonTigerUseCases } from 'App/Dragon-tiger/infrastructure/dependencies'
import { DragonTigerWinners, RoundEntity } from '../domain/round.entity'
import { getWinner } from 'App/Shared/Helpers/dragon-tiger-utils'
import { Worker } from 'worker_threads'
const worker = new Worker('./app/Shared/Services/Worker')
import SocketServer from 'App/Shared/Services/SocketServer'

export class RoundController {
  constructor(private roundUseCases: RoundUseCases) {}

  public startRound = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { providerId, roundId } = request.body()

    try {
      const dragonTiger = await dragonTigerUseCases.getDragonTigerByProviderId(providerId)
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
      SocketServer.io.to(`${dragonTiger.uuid}`).emit('round:start', {
        msg: 'Round opened',
        round: {
          start_date: startDate,
          end_date: futureDate,
          ID_Ronda: startRound.uuid,
        },
      })
      console.log('Round start', startRound)
      return response.status(201).json({ message: 'Round created', round: startRound })
    } catch (error) {
      return response.status(400).json({ message: 'No se pudo crear el round', error })
    }
  }

  public closeRound = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { providerId, roundId, result } = request.body()
    const { card1, card2 } = result
    try {
      const dragonTiger = await dragonTigerUseCases.getDragonTigerByProviderId(providerId)
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
      const winner = getWinner(card1, card2)
      const closeRound = await this.roundUseCases.closeRound(lastRound.uuid as string, {
        open: false,
        end_date: new Date(),
        result: { card1, card2 },
        winner: winner as DragonTigerWinners,
      })
      console.log('closeRound', closeRound)

      if (!closeRound) {
        return response.status(404).json({ error: 'No se encuentra el Round' })
      }
      SocketServer.io.to(`${dragonTiger.uuid}`).emit('round:end', {
        msg: 'Round closed',
        result: {
          card1,
          card2,
        },
        winner,
      })

      worker.postMessage({
        cmd: 'jackpot-update',
        dragonTigerId: dragonTiger.uuid,
        roundId: lastRound.uuid,
      })
      return response.status(200).json({ message: 'Round closed', round: closeRound })
    } catch (err) {
      return response.status(400).json({ message: 'No se pudo cerrar el round', err })
    }
  }
}
