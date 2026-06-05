import { Request, Response } from "express";
import { UpdateFoodChainService } from "../../services/food/UpdateFoodChainService";

class UpdateFoodChainController {

  async handle(req: Request, res: Response) {

    // 🦖 predador principal da cadeia alimentar
    const { predatorId, preyIds } = req.body;

    // ⚙️ service responsável por atualizar relações da cadeia
    const service = new UpdateFoodChainService();

    // 🔄 atualiza lista de presas do predador
    const result = await service.execute(
      predatorId,
      preyIds
    );

    // 📤 retorna cadeia atualizada
    return res.json(result);
  }
}

export { UpdateFoodChainController };