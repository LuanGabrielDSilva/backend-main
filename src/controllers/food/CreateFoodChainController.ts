import { Request, Response } from "express";
import { CreateFoodChainService } from "../../services/food/CreateFoodChainService";

class CreateFoodChainController {

  async handle(req: Request, res: Response) {

    // 🦖 IDs enviados pelo frontend
    // predator = predador | prey = presa
    const { predatorId, preyId } = req.body;

    // ⚙️ service responsável por criar relação na cadeia alimentar
    const service = new CreateFoodChainService();

    // 🔗 cria relação predador -> presa
    const result = await service.execute({
      predatorId,
      preyId
    });

    // 📤 retorna relação criada
    return res.json(result);
  }
}

export { CreateFoodChainController };