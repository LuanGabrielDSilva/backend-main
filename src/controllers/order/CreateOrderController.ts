import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

export class CreateOrderController {
  async handle(req: Request, res: Response) {
    try {
      console.log("🔥 CREATE ORDER CHAMADO");

      const userId = req.user.id;

      console.log("USER ID:", userId);

      const {
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        complemento
      } = req.body;

      /* =========================
         VALIDAÇÃO
      ========================= */
      if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
        return res.status(400).json({
          error: "Preencha todos os campos do endereço"
        });
      }

      const service = new CreateOrderService();

      const order = await service.execute({
        userId,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        complemento
      });

      return res.json(order);

    } catch (error: any) {
      console.error("❌ ERRO CREATE ORDER:", error.message);

      return res.status(500).json({
        error: error.message || "Erro ao criar pedido"
      });
    }
  }
}