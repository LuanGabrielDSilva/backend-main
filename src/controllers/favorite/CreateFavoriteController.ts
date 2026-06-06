import { Request, Response } from "express";
import { CreateFavoriteService } from "../../services/favorite/CreateFavoriteService";

class CreateFavoriteController {

  async handle(req: Request, res: Response) {

    // 🦖 pega ID do animal enviado pelo frontend
    const { animalId } = req.body;

    // 👤 pega ID do usuário autenticado
    // vindo do middleware JWT/auth
    const userId = req.user.id;

    // ⚙️ instancia o service responsável
    // por criar favorito
    const service = new CreateFavoriteService();

    // ❤️ adiciona animal aos favoritos
    const favorite = await service.execute({

      // usuário dono do favorito
      userId,

      // animal favoritado
      animalId

    });

    // 📤 retorna favorito criado
    return res.json(favorite);
  }
}

export { CreateFavoriteController };