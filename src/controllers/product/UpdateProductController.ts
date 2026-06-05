import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";

class UpdateProductController {

  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const {
      name,
      price,
      description,
      image,
      variants
    } = req.body;

    const service = new UpdateProductService();

    const result = await service.execute(
      id,
      name,
      Number(price),
      description,
      image,
      variants || []
    );

    return res.json(result);
  }
}

export { UpdateProductController };