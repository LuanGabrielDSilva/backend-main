import { Request, Response } from "express";
import prismaClient from "../../prisma";

export class UpdateOrderStatusController {

  async handle(req: Request, res: Response) {

    // 🆔 ID do pedido vindo da URL
    const { id } = req.params;

    // 📦 novo status vindo do body
    const { status } = req.body;

    // 🔄 atualiza status do pedido no banco
    const order = await prismaClient.order.update({

      where: {
        id
      },

      data: {
        status
      }

    });

    // 📤 retorna pedido atualizado
    return res.json(order);
  }
}