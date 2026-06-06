import { Response } from "express";
import prisma from "../../prisma";

class RewardCoinsController {

  async handle(req: any, res: Response) {

    const userId = req.user.id;

    const { amount } = req.body;

    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        coins: {
          increment: amount
        }
      }
    });

    return res.json({
      message: "Moedas adicionadas",
      coins: user.coins
    });
  }
}

export default new RewardCoinsController();