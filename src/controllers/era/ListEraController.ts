import { Request, Response } from "express";
import { ListEraService } from "../../services/era/ListEraService";

class ListEraController {

  async handle(req: Request, res: Response) {

    // ⚙️ instancia o service responsável
    // por listar todas as eras
    const service = new ListEraService();

    // 🌍 busca eras no banco
    const eras = await service.execute();

    // 📤 retorna lista de eras
    return res.json(eras);
  }
}

export { ListEraController };