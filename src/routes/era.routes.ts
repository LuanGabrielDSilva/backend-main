import { Router } from "express";
import { CreateEraController } from "../controllers/era/CreateEraController";
import { ListEraController } from "../controllers/era/ListEraController";
import { DeleteEraController } from "../controllers/era/DeleteEraController";
import { UpdateEraController } from "../controllers/era/UpdateEraController";

const router = Router();

router.post("/", new CreateEraController().handle);
router.get("/", new ListEraController().handle);
router.delete("/:id", new DeleteEraController().handle);
router.put("/:id", new UpdateEraController().handle);

export default router;