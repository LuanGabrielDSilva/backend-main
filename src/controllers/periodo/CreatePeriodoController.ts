import { Request, Response } from "express";
import { CreatePeriodoService } from "../../services/periodo/CreatePeriodoServices";

class CreatePeriodoController {
  async handle(req: Request, res: Response) {
    const { name, description, image, eraId } = req.body;

    const service = new CreatePeriodoService();

    const periodo = await service.execute({
      name,
      description,
      image,
      eraId
    });

    return res.json(periodo);
  }
}

export { CreatePeriodoController };