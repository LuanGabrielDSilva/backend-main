import { Router } from "express";

import { ListProductsController } from "../controllers/product/ListProductController";
import { CreateProductController } from "../controllers/product/CreateProductController";
import { DetailProductController } from "../controllers/product/DetailProductController";
import { UpdateProductController } from "../controllers/product/UpdateProductController";
import { DeleteProductController } from "../controllers/product/DeleteProductController";


const router = Router();

const updateProductController = new UpdateProductController();

router.get(
  "/",
  new ListProductsController().handle
);

router.get(
  "/:id",
  new DetailProductController().handle
);

router.post(
  "/",
  new CreateProductController().handle
);

router.put(
  "/:id",
  updateProductController.handle
);

router.delete(
  "/:id",
  new DeleteProductController().handle
);

export default router;