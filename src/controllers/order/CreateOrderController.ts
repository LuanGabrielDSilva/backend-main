import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

export class CreateOrderController {

  async handle(req: Request, res: Response) {

    console.log("🔥 CREATE ORDER CHAMADO");

    const userId = req.userId;

    console.log("USER ID:", userId);

    /* =========================
       DADOS DO ENDEREÇO
    ========================= */
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
    if (
      !cep ||
      !rua ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado
    ) {
      throw new Error("Preencha todos os campos do endereço");
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
  }
}