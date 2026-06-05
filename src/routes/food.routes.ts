import { Router } from "express";

import { CreateFoodChainController }
from "../controllers/food/CreateFoodChainController";

import { UpdateFoodChainController }
from "../controllers/food/UpdateFoodChainController";

import { GetAnimalFoodChainController }
from "../controllers/food/GetAnimalFoodChainController";

const router = Router();

/* ================================
   🍖 FOOD CHAIN
================================ */

router.post(
  "/",
  new CreateFoodChainController().handle
);

router.put(
  "/",
  new UpdateFoodChainController().handle
);

router.get(
  "/:id",
  new GetAnimalFoodChainController().handle
);

export default router;