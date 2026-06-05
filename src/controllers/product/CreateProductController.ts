import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    try {
      const { name, price, description, image, variants } = req.body;

      if (!name || !price) {
        return res.status(400).json({
          error: "Name and price are required"
        });
      }

      const service = new CreateProductService();

      const result = await service.execute(
        name,
        Number(price),
        description,
        image,
        variants
      );

      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Internal server error"
      });
    }
  }
}

export { CreateProductController };