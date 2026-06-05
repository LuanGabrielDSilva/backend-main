import { Request, Response } from "express";

// Service que contém toda lógica de adicionar ao carrinho
import { AddToCartService } from "../../services/cart/AddToCartService";

class AddToCartController {

  async handle(req: Request, res: Response) {

    // 🔐 pega o ID do usuário autenticado
    // normalmente vem do middleware JWT
    const userId = req.userId;

    // 📦 dados enviados pelo frontend
    const { product_id, quantity } = req.body;

    // 🧠 instancia o service
    const service = new AddToCartService();

    // 🚀 executa a lógica:
    // adiciona produto ao carrinho do usuário
    const result = await service.execute(
      userId,
      product_id,
      quantity
    );

    // 📤 retorna o resultado pro frontend
    return res.json(result);
  }
}

// exporta controller
export { AddToCartController };