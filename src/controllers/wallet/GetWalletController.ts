import { Request, Response } from "express";
import prisma from "../../prisma";

class GetWalletController {
  async handle(req: any, res: Response) {

    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        balance: true,
        coins: true
      }
    });

    return res.json(user);
  }
}

export default new GetWalletController();