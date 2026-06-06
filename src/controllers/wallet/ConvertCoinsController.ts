import { Response } from "express";
import prisma from "../../prisma";

class ConvertCoinsController {

  async handle(req: any, res: Response) {

    try {

      const userId = req.user.id;

      const { coins } = req.body;

      if (!coins || coins <= 0) {
        return res.status(400).json({
          error: "Quantidade inválida"
        });
      }

      // 🔥 busca usuário
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });

      if (!user) {
        return res.status(404).json({
          error: "Usuário não encontrado"
        });
      }

      // 🔥 verifica saldo
      if (user.coins < coins) {
        return res.status(400).json({
          error: "Moedas insuficientes"
        });
      }

      // 🔥 conversão
      const value = coins / 100;

      // 🔥 atualiza usuário
      const updatedUser = await prisma.user.update({
        where: {
          id: userId
        },

        data: {

          coins: {
            decrement: Number(coins)
          },

          balance: {
            increment: value
          }

        }
      });

      return res.json(updatedUser);

    } catch (err) {

      console.error(err);

      return res.status(500).json({
        error: "Erro interno"
      });

    }

  }

}

export default new ConvertCoinsController();