import { Request, Response } from "express";

import { GetAnimalFoodChainService }
from "../../services/food/GetAnimalFoodChainService";

class GetAnimalFoodChainController {

  async handle(req: Request, res: Response) {

    // 🆔 ID do animal vindo da URL (params)
    const { id } = req.params;

    // ⚙️ service responsável por buscar cadeia alimentar
    const service = new GetAnimalFoodChainService();

    // 🌿 retorna predadores e presas do animal
    const result = await service.execute(id);

    // 📤 envia resposta ao frontend
    return res.json(result);
  }
}

export { GetAnimalFoodChainController };