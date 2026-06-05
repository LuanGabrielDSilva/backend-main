import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { ListOrdersController } from "../controllers/order/ListOrdersController";
import { UpdateOrderStatusController } from "../controllers/order/UpdateOrderStatusController";
import { CreateOrderController } from "../controllers/order/CreateOrderController";
import { DeleteOrderController } from "../controllers/order/DeleteOrderController";

const orderRoutes = Router();

/**
 * 📦 CRIAR PEDIDO (CHECKOUT)
 */
orderRoutes.post(
  "/",
  isAuthenticated,
  new CreateOrderController().handle
);

/**
 * 📦 LISTAR PEDIDOS (ADMIN)
 */
orderRoutes.get(
  "/",
  isAuthenticated,
  new ListOrdersController().handle
);

/**
 * ✏️ ATUALIZAR STATUS
 */
orderRoutes.put(
  "/:id/status",
  isAuthenticated,
  new UpdateOrderStatusController().handle
);

// DELETE

orderRoutes.delete(
  "/:id",
  isAuthenticated,
  new DeleteOrderController().handle
);
export default orderRoutes;