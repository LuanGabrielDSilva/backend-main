import { Request, Response } from "express";
import { FinalizeCartService } from "../../services/cart/FinalizeCartService";

class FinalizeCartController {

  async handle(req: Request, res: Response) {

    // 🧑 pega o ID do usuário autenticado
    // esse userId normalmente vem do middleware JWT/auth
    const userId = req.user.id;

    // ⚙️ instancia o service responsável
    // por finalizar o carrinho
    const service = new FinalizeCartService();

    // 🛒 executa a finalização da compra
    // geralmente:
    // - fecha o carrinho
    // - cria pedido
    // - move itens
    // - atualiza estoque
    // - limpa carrinho
    const result = await service.execute(userId);

    // 📦 retorna o resultado da finalização
    return res.json(result);
  }
}

export { FinalizeCartController };