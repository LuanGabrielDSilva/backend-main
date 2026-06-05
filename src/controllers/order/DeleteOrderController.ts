import { Request, Response } from "express";
import prismaClient from "../../prisma";

export class DeleteOrderController {

  async handle(req: Request, res: Response) {

    // 🆔 ID do pedido vindo da URL
    const { id } = req.params;

    // 🧹 primeiro remove todos os itens vinculados ao pedido
    // (evita erro de FK / integridade no banco)
    await prismaClient.orderItem.deleteMany({
      where: {
        orderId: id
      }
    });

    // 🗑️ depois remove o pedido principal
    await prismaClient.order.delete({
      where: {
        id
      }
    });

    // 📤 confirmação da exclusão
    return res.json({
      message: "Pedido deletado"
    });
  }
}