import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const service = new DeleteProductService();

    const result = await service.execute(id);

    return res.json(result);
  }
}

export { DeleteProductController };