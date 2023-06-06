import { HttpContext } from '@adonisjs/core/build/standalone'
import { BetUseCases } from '../application/betUseCases'
import { BetEntity } from '../domain/bet.entity'
import { roundUseCases } from '../../Round/infrastructure/dependencies'
import { dragonTigerUseCases } from '../../Dragon-tiger/infrastructure/dependencies'
import {
  getBetEarnings,
  useGoldenK,
  useWinnerFilter,
} from '../../Shared/Helpers/dragon-tiger-utils'
import { DragonTigerWinners } from '../../Round/domain/round.entity'
import { Card } from '../domain/Card'
import SocketServer from 'App/Shared/Services/SocketServer'

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

    const { winner, result } = round
    const winnerFilter = useWinnerFilter(winner as DragonTigerWinners)
    const betWinner = await this.betUseCases.getWinner({
      round: round.uuid,
      ...winnerFilter,
    })

    if (!betWinner) {
      return response.ok({ message: "you have not won :'(", winner, win: false })
    }
    const isGoldenK = useGoldenK(result?.card1 as Card, result?.card2 as Card)
    const earning = getBetEarnings(winner as DragonTigerWinners, dragonTiger, betWinner, isGoldenK)

    return response.status(200).json({ message: "you've won!", win: true, winner, earning })
  }

  public jackpotWinners = async (ctx: HttpContext) => {
    const { request, response } = ctx
    const { bets, jackpot } = request.body()

    for (let i = 0; i < bets.length; i++) {
      const bet: BetEntity = bets[i]

      const {
        player,
        dragonTiger,
        bet: {
          jackpot: { amount },
        },
      } = bet
      SocketServer.io.to(`${dragonTiger}-${player}`).emit('jackpot:winner', {
        msg: 'Congrats!, you have won a jackpot',
        originalAmount: amount,
        earning: amount * jackpot,
      })
    }

    response.ok({ msg: 'socket sent' })
  }
}
