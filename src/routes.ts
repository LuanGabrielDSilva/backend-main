import { Router } from "express";
import multer from "multer";

import prismaClient from "./prisma";
import uploadConfig from "./config/multer";

import { isAuthenticated } from "./middlewares/isAuthenticated";

/* =========================================================
   👤 USER CONTROLLERS
========================================================= */
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailuserController } from "./controllers/user/DetailUserController";
import { ListUserController } from "./controllers/user/ListUserController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";
import { EditUserController } from "./controllers/user/EditUserController";

/* =========================================================
   OUTROS IMPORTS (mantidos)
========================================================= */
import { CreateFavoriteController } from "./controllers/favorite/CreateFavoriteController";
import { ListFavoritesController } from "./controllers/favorite/ListFavoritesController";
import { DeleteFavoriteController } from "./controllers/favorite/DeleteFavoriteController";

/*===================================
   COMENTARIOS
=====================================*/
import { UploadController } from "./controllers/upload/UploadController";
import { ListCommentsController } from "./controllers/comment/ListCommentsController";
import { CreateCommentController } from "./controllers/comment/CreateCommentController";
import { ListAllCommentsController } from "./controllers/comment/ListAllCommentsController";
import { DeleteCommentController } from "./controllers/comment/DeleteCommentController";

import animalRoutes from "./routes/animal.routes";
import cartRoutes from "./routes/cart.routes";
import eraRoutes from "./routes/era.routes";
import periodoRoutes from "./routes/periodo.routes";
import walletRoutes from "./routes/wallet.routes";
import rewardRoutes from "./routes/reward.routes";
import quizRoutes from "./routes/quiz.routes";
import productRoutes from "./routes/product.routes";
import expeditionRoutes from "./routes/expedition.routes";
import orderRoutes from "./routes/order.routes";
import foodRoutes from "./routes/food.routes";
import authRoutes from "./routes/auth.routes";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

/* =========================================================
   👤 USERS
========================================================= */

router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated, new DetailuserController().handle);

router.get("/users", new ListUserController().handle);

// ✅ ROTA ATUALIZADA - EDITAR NOME E SENHA
router.put(
  "/users/:id",
  isAuthenticated,
  new EditUserController().handle
);

router.delete(
  "/users/:id",
  isAuthenticated,
  new DeleteUserController().handle
);

/* =========================================================
   RESTANTE DO ARQUIVO (mantido igual)
========================================================= */

router.use("/eras", eraRoutes);
router.use("/animals", animalRoutes);
router.use("/periodos", periodoRoutes);
router.use("/wallet", walletRoutes);
router.use("/reward", rewardRoutes);
router.use("/quiz", quizRoutes);
router.use("/cart", cartRoutes);
router.use("/auth", authRoutes);


router.get("/products/:id/comments", new ListCommentsController().handle);
router.post("/products/:id/comments", isAuthenticated, new CreateCommentController().handle);

router.post("/upload", upload.single("file"), new UploadController().handle);

router.post("/favorites", isAuthenticated, new CreateFavoriteController().handle);
router.get("/favorites", isAuthenticated, new ListFavoritesController().handle);
router.delete("/favorites", isAuthenticated, new DeleteFavoriteController().handle);
router.get("/admin/comments", isAuthenticated, new ListAllCommentsController().handle);
router.delete("/admin/comments/:id", isAuthenticated, new DeleteCommentController().handle);

router.use("/products", productRoutes);
router.use("/expeditions", expeditionRoutes);
router.use("/orders", orderRoutes);

/* =========================================================
   ADMIN STATS
========================================================= */
router.get("/admin/stats", async (req, res) => {
  const users = await prismaClient.user.count();
  const eras = await prismaClient.era.count();
  const animals = await prismaClient.animal.count();

  return res.json({ users, eras, animals });

  
});

export { router };