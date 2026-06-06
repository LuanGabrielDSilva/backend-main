import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import prismaClient from "../prisma";

const expeditionRoutes = Router();

/* =========================
   LISTAR EXPEDIÇÕES DO USUÁRIO
========================= */
expeditionRoutes.get("/", isAuthenticated, async (req, res) => {
  const userId = req.user?.id;

  const expeditions = await prismaClient.expedition.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return res.json(expeditions);
});

/* =========================
   CRIAR EXPEDIÇÃO
========================= */
expeditionRoutes.post("/", isAuthenticated, async (req, res) => {
  const userId = req.user?.id;

  const {
    title,
    description,
    status,
    location,
    rewardCoins,
    rewardXp
  } = req.body;

  const expedition = await prismaClient.expedition.create({
    data: {
      userId,
      title,
      description,
      status: status || "completed",
      location,
      rewardCoins: rewardCoins || 0,
      rewardXp: rewardXp || 0
    }
  });

  return res.json(expedition);
});

export default expeditionRoutes;