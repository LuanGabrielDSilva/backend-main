import { Router } from "express";
import { CreatePeriodoController } from "../controllers/periodo/CreatePeriodoController";
import { ListPeriodoController } from "../controllers/periodo/ListPeriodoController";
import { UpdatePeriodoController } from "../controllers/periodo/UpdatePeriodoController";
import { DeletePeriodoController } from "../controllers/periodo/DeletePeriodoController";

const router = Router();

router.post("/", new CreatePeriodoController().handle);
router.get("/", new ListPeriodoController().handle);
router.put("/:id", new UpdatePeriodoController().handle);
router.delete("/:id", new DeletePeriodoController().handle);


export default router;