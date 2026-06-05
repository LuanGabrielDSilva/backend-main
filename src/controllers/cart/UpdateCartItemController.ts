import { Request, Response } from "express";
import { UpdateCartItemService } from "../../services/cart/UpdateCartItemService";

class UpdateCartItemController {

  async handle(req: Request, res: Response) {

    // 📦 pega os dados enviados pelo frontend
    // item_id = item do carrinho
    // quantity = nova quantidade
    const { item_id, quantity } = req.body;

    // ⚙️ instancia o service responsável
    // por atualizar o item do carrinho
    const service = new UpdateCartItemService();

    // 🚀 executa atualização
    // altera a quantidade do item
    const result = await service.execute(
      item_id,
      quantity
    );

    // 📤 retorna resultado atualizado
    return res.json(result);
  }
}

export { UpdateCartItemController };