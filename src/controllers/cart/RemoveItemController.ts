import { Request, Response } from "express";
import { RemoveItemService } from "../../services/cart/RemoveItemService";

class RemoveItemController {

  async handle(req: Request, res: Response) {

    // 🗑️ pega o ID do item enviado pelo frontend
    // esse ID normalmente é do CartItem
    const { item_id } = req.body;

    // ⚙️ instancia o service responsável
    // por remover o item do carrinho
    const service = new RemoveItemService();

    // 🚀 executa remoção do item
    const result = await service.execute(item_id);

    // 📦 retorna resultado da operação
    return res.json(result);
  }
}

export { RemoveItemController };