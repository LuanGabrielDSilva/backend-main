import { Router } from "express";

import { CreateAnimalController } from "../controllers/animal/CreateAnimalController";
import { ListAnimalController } from "../controllers/animal/ListAnimalController";
import { DeleteAnimalController } from "../controllers/animal/DeleteAnimalController";
import { UpdateAnimalController } from "../controllers/animal/UpdateAnimalController";
import { ListAnimalsRandBySize } from "../controllers/animal/ListAnimalsRandBySize";
import { ListAnimalByEraIdController } from "../controllers/animal/ListAnimalByEraIdController";
import { DetailAnimalController } from "../controllers/animal/DetailAnimalController";
import { UpdateFoodChainController } from "../controllers/food/UpdateFoodChainController";

const router = Router();

/* ======================
   CREATE
====================== */
router.post("/", new CreateAnimalController().handle);

/* ======================
   SPECIAL ROUTES
====================== */
router.get("/era/:eraId", new ListAnimalByEraIdController().handle);

router.get(
  "/random/:size",
  new ListAnimalsRandBySize().handle
);

/* ======================
   LISTAR TODOS
====================== */
router.get("/", new ListAnimalController().handle);

/* ======================
   DETAIL
====================== */
router.get(
  "/:id",
  new DetailAnimalController().handle
);

/* ======================
   UPDATE / DELETE
====================== */
router.delete("/:id", new DeleteAnimalController().handle);

router.put("/:id", new UpdateAnimalController().handle);

router.put("/food-chain", new UpdateFoodChainController().handle);

export default router;