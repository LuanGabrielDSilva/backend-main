import { Router } from "express";

import GetWalletController from "../controllers/wallet/GetWalletController";
import RewardCoinsController from "../controllers/wallet/RewardCoinsController";
import ConvertCoinsController from "../controllers/wallet/ConvertCoinsController";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const walletRoutes = Router();

walletRoutes.get(
  "/me",
  isAuthenticated,
  GetWalletController.handle
);

walletRoutes.post(
  "/reward",
  isAuthenticated,
  RewardCoinsController.handle
);

walletRoutes.post(
  "/convert",
  isAuthenticated,
  ConvertCoinsController.handle
);

export default walletRoutes;