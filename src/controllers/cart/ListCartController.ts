import { Request, Response } from "express";
import { ListCartService } from "../../services/cart/ListCartService";

class ListCartController {

  async handle(req: Request, res: Response) {

    // 🧑 pega o ID do usuário autenticado
    // vindo do middleware de autenticação
    const userId = req.userId;

    // ⚙️ instancia o service responsável
    // por buscar o carrinho do usuário
    const service = new ListCartService();

    // 🛒 busca o carrinho no banco
    // junto com os produtos e itens
    const cart = await service.execute(userId);

    // 📦 retorna os dados do carrinho
    return res.json(cart);
  }
}

export { ListCartController };