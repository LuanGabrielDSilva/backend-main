import { Request, Response } from "express";
import prismaClient from "../../prisma";

export class ListOrdersController {

  async handle(req: Request, res: Response) {

    try {

      // 📦 busca todos os pedidos no banco
      const orders = await prismaClient.order.findMany({

        // 🔗 inclui apenas campos essenciais do usuário
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },

          // 📦 inclui itens do pedido + produto relacionado
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  price: true
                }
              }
            }
          }
        },

        // 📅 ordena do mais recente para o mais antigo
        orderBy: {
          created_at: "desc"
        }
      });

      // 📤 retorna pedidos formatados
      return res.json(orders);

    } catch (error) {

      // ❌ log de erro no servidor
      console.error("Erro ao listar pedidos:", error);

      // 🚨 resposta de erro genérica para o frontend
      return res.status(500).json({
        error: "Erro ao buscar pedidos"
      });
    }
  }
}