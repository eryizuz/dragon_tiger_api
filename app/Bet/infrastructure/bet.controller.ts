import { HttpContext } from '@adonisjs/core/build/standalone'
import { BetUseCases } from '../application/betUseCases'
import { BetEntity } from '../domain/bet.entity'
import { roundUseCases } from 'App/Round/infrastructure/dependencies'
import { dragonTigerUseCases } from 'App/Dragon-tiger/infrastructure/dependencies'
import { getBetEarnings, useWinnerFilter } from 'App/Shared/Helpers/dragon-tiger-utils'
import { DragonTigerWinners } from 'App/Round/domain/round.entity'

export class BetController {
  constructor(private betUseCases: BetUseCases) {}

  public createBet = async (ctx: HttpContext) => {
    const { request, response } = ctx

    const bet = { ...request.body() }
    try {
      const createBet = await this.betUseCases.createBet(bet as BetEntity)

      return response.status(201).json({ message: 'Bet creado!', createBet })
    } catch (error) {
      return response.status(400).json({ message: 'No se pudo crear el bet!', error })
    }
  }

  public getWinner = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { uuid, dragonTigerId } = request.qs()
    const round = await roundUseCases.getRoundByUuid(uuid)

    if (!round) {
      return response.status(404).json({ error: 'No se encuentra el round' })
    }

    const dragonTiger = await dragonTigerUseCases.getDragonTigerByUuid(dragonTigerId)
    if (!dragonTiger) {
      return response.status(404).json({ error: 'No se encuentra el dragonTiger' })
    }

    // comprobar player

    const { winner } = round
    const winnerFilter = useWinnerFilter(winner as DragonTigerWinners)
    const betWinner = await this.betUseCases.getWinner({
      result: { $ne: null },
      round: round.uuid,
      ...winnerFilter,
    })

    if (!betWinner) {
      return response.ok({ message: "you have not won :'(", winner, win: false })
    }
    const earning = getBetEarnings(winner as DragonTigerWinners, dragonTiger, betWinner)

    return response.status(200).json({ message: "you've won!", win: true, winner, earning })
  }
}
