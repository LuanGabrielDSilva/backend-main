import { Request, Response } from "express";
import { DeleteFavoriteService } from "../../services/favorite/DeleteFavoriteService";

class DeleteFavoriteController {

  async handle(req: Request, res: Response) {

    // 🦖 ID do animal a remover dos favoritos
    const { animalId } = req.body;

    // 👤 usuário autenticado (via middleware)
    const userId = req.userId;

    // ⚙️ service responsável por remover favorito
    const service = new DeleteFavoriteService();

    // ❌ remove relacionamento usuário x animal
    const result = await service.execute({

      // dono do favorito
      userId,

      // animal a ser removido
      animalId

    });

    // 📤 retorna resultado da operação
    return res.json(result);
  }
}

export { DeleteFavoriteController };