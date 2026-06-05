import { Request, Response } from "express";
import { ListFavoritesService } from "../../services/favorite/ListFavoritesService";

class ListFavoritesController {

  async handle(req: Request, res: Response) {

    // 👤 pega ID do usuário autenticado (middleware JWT/auth)
    const userId = req.userId;

    // ⚙️ service responsável por listar favoritos
    const service = new ListFavoritesService();

    // ❤️ busca todos os favoritos do usuário
    const favorites = await service.execute(userId);

    // 📤 retorna lista de favoritos
    return res.json(favorites);
  }
}

export { ListFavoritesController };