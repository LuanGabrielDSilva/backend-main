import { Router } from "express";
import prismaClient from "../prisma";

const router = Router();

/* ======================
   💰 REWARD PLAYER
====================== */
router.post("/", async (req, res) => {
  try {

    console.log("🔥 REWARD RECEBIDO");
    console.log(req.body);

    const { userId, coins } = req.body;

    if (!userId || !coins) {
      return res.status(400).json({
        error: "Dados inválidos"
      });
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id: userId
      },

      data: {
        coins: {
          increment: Number(coins)
        }
      }
    });

    console.log("✅ USUÁRIO ATUALIZADO:");
    console.log(updatedUser);

    return res.json(updatedUser);

  } catch (err) {

    console.error("ERRO REWARD:", err);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
});

export default router;